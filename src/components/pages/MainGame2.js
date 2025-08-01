import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { scriptURL } from "./constant";

const groups = [
  "Group 1",
  "Group 2",
  "Group 3",
  "Group 4",
  "Group 5",
  "Group 6",
];

const multipliers = {
  regeneration: 3,
  speed: 2,
};

const potions = {
  "fire resistance": 2000,
  "instant health": 1000,
  "night vision": 500,
  "invisibility": 300,
  "water bottle": 100,
  "water bottle 2": 100,
};

export default function MainGame2() {
  const [phase, setPhase] = useState("select-groups");
  const [group1, setGroup1] = useState("");
  const [group2, setGroup2] = useState("");
  const [selectedPotion, setSelectedPotion] = useState(null);
  const [targetGroup, setTargetGroup] = useState(null);
  const [usedPotions, setUsedPotions] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [pendingGroup, setPendingGroup] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handlePotionApply = async (group) => {
    if (!selectedPotion || usedPotions.includes(selectedPotion)) return;

    const isMultiplier = multipliers[selectedPotion] !== undefined;
    const paramKey = isMultiplier ? "multiplier" : "amount";
    const paramValue = isMultiplier
      ? multipliers[selectedPotion]
      : potions[selectedPotion];

    const mode = isMultiplier ? "multiplier" : "potion";

    const url = `${scriptURL}?mode=${mode}&group=${encodeURIComponent(
      group
    )}&game=Game%202&${paramKey}=${paramValue}`;

    setIsSubmitted(true);

    try {
      const res = await fetch(url);
      const msg = await res.text();
      alert(`${group}: ${msg}`);
      setUsedPotions((prev) => [...prev, selectedPotion]);
      setTargetGroup(group);
      setIsSubmitted(false);
    } catch (err) {
      alert("Something went wrong.");
      console.error(err);
    }
  };

  const resetGame = () => {
    setPhase("select-groups");
    setGroup1("");
    setGroup2("");
    setSelectedPotion(null);
    setTargetGroup(null);
    setUsedPotions([]);
  };

  const handleGroupSelect = (group) => {
    setPendingGroup(group);
    setShowConfirmation(true);
  };

  const handleConfirm = async () => {
    await handlePotionApply(pendingGroup);
    setShowConfirmation(false);
    setPendingGroup(null);
  };

  const handleCancel = () => {
    setShowConfirmation(false);
    setPendingGroup(null);
  };

  if (phase === "select-groups") {
    return (
      <div className="container mt-5 p-4">
        <h3 className="mb-4 text-center">🎮 Select Competing Groups</h3>

        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Team A</label>
            <select
              className="form-select"
              value={group1}
              onChange={(e) => setGroup1(e.target.value)}
            >
              <option value="">-- Select --</option>
              {groups.map((g) => (
                <option key={g} value={g} disabled={g === group2}>
                  {g}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label">Team B</label>
            <select
              className="form-select"
              value={group2}
              onChange={(e) => setGroup2(e.target.value)}
            >
              <option value="">-- Select --</option>
              {groups.map((g) => (
                <option key={g} value={g} disabled={g === group1}>
                  {g}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          className="btn btn-primary w-100"
          onClick={() => setPhase("select-potion")}
          disabled={!group1 || !group2}
        >
          🚀 Start Family Feud
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h3 className="mb-4 text-center">
        🧪 Family Feud — {group1} vs {group2}
      </h3>

      <div className="row g-3">
        {[
          ...Object.entries(multipliers),
          ...Object.entries(potions).sort((a, b) => b[1] - a[1]),
        ].map(([name, val], idx) => (
          <div className="col-6 col-md-6" key={name}>
            <button
              className={`btn ${
                multipliers[name] ? "btn-danger" : "btn-warning"
              } w-100 fs-5 py-3`}
              disabled={usedPotions.includes(name)}
              onClick={() => setSelectedPotion(name)}
            >
              {name.toUpperCase()}{" "}
              {multipliers[name] ? `(x${val})` : `(+${val})`}
            </button>
          </div>
        ))}
      </div>

      {selectedPotion && !usedPotions.includes(selectedPotion) && (
        <div className="mt-4 text-center">
          <h5>
            Apply <strong>{selectedPotion.toUpperCase()}</strong> to which team?
          </h5>
          <div className="d-flex justify-content-center gap-3 mt-3">
            <button
              className="btn btn-outline-success px-4"
              onClick={() => handleGroupSelect(group1)}
            >
              {group1}
            </button>
            <button
              className="btn btn-outline-success px-4"
              onClick={() => handleGroupSelect(group2)}
            >
              {group2}
            </button>
          </div>

          {/* Add Confirmation Modal */}
          {showConfirmation && (
            <div
              className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
              style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1000 }}
            >
              <div className="bg-white p-4 rounded shadow">
                <h5>Confirm Action</h5>
                <p>
                  Apply <strong>{selectedPotion.toUpperCase()}</strong> to{" "}
                  <strong>{pendingGroup}</strong>?
                </p>
                <div className="d-flex justify-content-end gap-2">
                  <button className="btn btn-secondary" onClick={handleCancel}>
                    Cancel
                  </button>
                  <button className="btn btn-primary" onClick={handleConfirm}>
                    Confirm
                  </button>
                </div>
                {isSubmitted && (
                  <div className="mt-3 text-center">
                    <p className="text-success">Submitting...</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {targetGroup && (
        <div className="alert alert-info mt-4 text-center">
          ✅ {selectedPotion.toUpperCase()} applied to{" "}
          <strong>{targetGroup}</strong>
        </div>
      )}

      <button
        className="btn btn-secondary mt-5 w-100 mb-20"
        onClick={resetGame}
      >
        🔁 Start Over
      </button>
    </div>
  );
}
