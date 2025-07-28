import { useState, useEffect } from "react"
import { scriptURL } from "./constant"
import { db, ref, set, onValue, remove } from "../../firebase"
import DiamondImage from "../assets/test.png"
import EmeraldImage from "../assets/Emerald.png"
import SwordImage from "../assets/Sword.png"
import ChickenImage from "../assets/Chicken.png"
import EnchantedBookImage from "../assets/EnchantedBook.png"
import GoldenAppleImage from "../assets/GoldenApple.png"
import MuttonImage from "../assets/Mutton.png"
import RedPotionImage from "../assets/RedPotion.png"
import SheepImage from "../assets/Sheep.png"
import WaterMelonImage from "../assets/WaterMelon.png"
import WoodLogImage from "../assets/WoodLog.png"

// Define initial items - keep this constant outside component
const INITIAL_ITEMS = [
  { id: 1, name: "Diamond", score: 100, image: DiamondImage },
  { id: 2, name: "Diamond", score: 100, image: DiamondImage },
  { id: 3, name: "Sword", score: 100, image: SwordImage },
  { id: 4, name: "Sword", score: 100, image: SwordImage },
  { id: 5, name: "Emerald", score: 150, image: EmeraldImage },
  { id: 6, name: "Emerald", score: 150, image: EmeraldImage },
  { id: 7, name: "Golden Apple", score: 150, image: GoldenAppleImage },
  { id: 8, name: "Golden Apple", score: 150, image: GoldenAppleImage },
  { id: 9, name: "Watermelon", score: 100, image: WaterMelonImage },
  { id: 10, name: "Watermelon", score: 100, image: WaterMelonImage },
  { id: 11, name: "Mutton", score: 100, image: MuttonImage },
  { id: 12, name: "Mutton", score: 100, image: MuttonImage },
  { id: 13, name: "Chicken", score: 50, image: ChickenImage },
  { id: 14, name: "Chicken", score: 50, image: ChickenImage },
  { id: 15, name: "Chicken", score: 50, image: ChickenImage },
  { id: 16, name: "Chicken", score: 50, image: ChickenImage },
  { id: 17, name: "Enchanted Book", score: 50, image: EnchantedBookImage },
  { id: 18, name: "Enchanted Book", score: 50, image: EnchantedBookImage },
  { id: 19, name: "Enchanted Book", score: 50, image: EnchantedBookImage },
  { id: 20, name: "Enchanted Book", score: 50, image: EnchantedBookImage },
  { id: 21, name: "RedPotion", score: 50, image: RedPotionImage },
  { id: 22, name: "RedPotion", score: 50, image: RedPotionImage },
  { id: 23, name: "RedPotion", score: 50, image: RedPotionImage },
  { id: 24, name: "RedPotion", score: 50, image: RedPotionImage },
  { id: 25, name: "Sheep", score: 50, image: SheepImage },
  { id: 26, name: "Sheep", score: 50, image: SheepImage },
  { id: 27, name: "Sheep", score: 50, image: SheepImage },
  { id: 28, name: "Sheep", score: 50, image: SheepImage },
  { id: 29, name: "Wood Log", score: 50, image: WoodLogImage },
  { id: 30, name: "Wood Log", score: 50, image: WoodLogImage },
  { id: 31, name: "Wood Log", score: 50, image: WoodLogImage },
  { id: 32, name: "Wood Log", score: 50, image: WoodLogImage },
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
