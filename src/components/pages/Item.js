import { useState, useEffect } from "react"
import { scriptURL } from "./constant"
import { db, ref, set, onValue, remove } from "../../firebase"

// Define initial items - keep this constant outside component
const INITIAL_ITEMS = [
  { id: 1, name: "Potion", score: 1000, image: "/images/potion.png" },
  { id: 2, name: "Sword", score: 200, image: "/images/sword.png" },
  // Add your other items here
];

const groups = [
  "Group 1",
  "Group 2",
  "Group 3",
  "Group 4",
  "Group 5",
  "Group 6",
];

export default function Item() {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Fetch items from Firebase on mount
  useEffect(() => {
    const itemsRef = ref(db, 'items');
    onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setItems(Object.values(data));
      } else {
        // Initialize with default items if not present
        INITIAL_ITEMS.forEach(item => {
          set(ref(db, `items/${item.id}`), item);
        });
        setItems(INITIAL_ITEMS);
      }
    });
  }, []);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleSubmit = async () => {
    if (!selectedItem || !selectedGroup) {
      alert("Please select both an item and a group!");
      return;
    }

    setIsSubmitted(true);

    try {
      const response = await fetch(
        `${scriptURL}?mode=item&group=${encodeURIComponent(selectedGroup)}&score=${selectedItem.score}`
      );
      const result = await response.text();

      if (response.ok) {
        await remove(ref(db, `items/${selectedItem.id}`));
        setSelectedItem(null);
        setSelectedGroup("");
        alert(`Item ${selectedItem.name} added to ${selectedGroup}!`);
      } else {
        alert("Failed to add item: " + result);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to process item");
    } finally {
      setIsSubmitted(false);
    }
  };

  const handleCancel = () => {
    setSelectedItem(null);
    setSelectedGroup("");
  };

  const handleReset = async () => {
    await remove(ref(db, 'items'));
    INITIAL_ITEMS.forEach(item => {
      set(ref(db, `items/${item.id}`), item);
    });
    setSelectedItem(null);
    setSelectedGroup("");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Item Collection</h1>
        <button 
          onClick={handleReset}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
        >
          🔄 Reset Items
        </button>
      </div>

      {/* Item Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {items.map((item) => (
          <div
            key={item.id}
            className={`p-4 border rounded-lg cursor-pointer transition-all
              ${selectedItem?.id === item.id ? 'border-blue-500 bg-blue-50' : 'hover:border-gray-400'}
            `}
            onClick={() => handleItemClick(item)}
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-24 h-24 mx-auto mb-2 object-contain"
            />
            <p className="text-center font-semibold">{item.name}</p>
            <p className="text-center text-gray-600">Score: {item.score}</p>
          </div>
        ))}
      </div>

      {/* Selection Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">
              Select Group for {selectedItem.name}
            </h2>

            <select
              className="w-full p-2 border rounded mb-4"
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
            >
              <option value="">Select a group...</option>
              {groups.map((group) => (
                <option key={group} value={group}>
                  {group}
                </option>
              ))}
            </select>

            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-gray-200 rounded"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
            {isSubmitted && (
              <p className="mt-4 text-green-600">Submitting...</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
