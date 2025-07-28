import React, { useState, useEffect } from "react";
import { scriptURL } from "./constant";

const groups = [
  "Group 1",
  "Group 2",
  "Group 3",
  "Group 4",
  "Group 5",
  "Group 6",
];

function Game({ game }) {
  const [selectedGroup, setSelectedGroup] = useState(groups[0]);
  const [iron, setIron] = useState(0);
  const [gold, setGold] = useState(0);
  const [diamond, setDiamond] = useState(0);
  const [manualMode, setManualMode] = useState(true);
  const [manualScore, setManualScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (!manualMode) {
      const ironVal = parseInt(iron) || 0;
      const goldVal = parseInt(gold) || 0;
      const diamondVal = parseInt(diamond) || 0;
      setTotalScore(ironVal * 100 + goldVal * 500 + diamondVal * 1000);
    } else {
      setTotalScore(parseInt(manualScore) || 0);
    }
  }, [iron, gold, diamond, manualMode, manualScore]);

  const handleSubmit = async () => {
    const isManual = iron === 0 && gold === 0 && diamond === 0 && totalScore > 0;

    const url = `${scriptURL}?mode=calculate&group=${encodeURIComponent(
      selectedGroup
    )}&game=${encodeURIComponent(game)}${
      isManual
        ? `&total=${totalScore}&iron=0&gold=0&diamond=0`
        : `&iron=${iron}&gold=${gold}&diamond=${diamond}`
    }`;

    setIsSubmitted(true);

    try {
      const response = await fetch(url);
      const data = await response.text();
      alert(data);
        setIron(0);
        setGold(0);
        setDiamond(0);
        setManualScore(0);
        setTotalScore(0);
        setIsSubmitted(false);
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while submitting the data.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
      <div>
        <h1 className="text-4xl font-bold mb-6 text-center">{game}</h1>
      </div>

      <div className="mb-4">
        <label className="block text-md font-medium mb-2">Select Group:</label>
        <select
          value={selectedGroup}
          onChange={(e) => setSelectedGroup(e.target.value)}
          className="form-select block w-full p-2 border border-gray-300 rounded-md"
        >
          {groups.map((group) => (
            <option key={group} value={group}>
              {group}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-md font-medium mb-8">Score Input Mode:</label>
        <div className="flex flex-col items-center gap-2">
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="form-radio"
              checked={!manualMode}
              onChange={() => setManualMode(false)}
            />
            <span className="ml-2">Auto (Iron/Gold/Diamond)</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="form-radio"
              checked={manualMode}
              onChange={() => setManualMode(true)}
            />
            <span className="ml-2">Manual Total</span>
          </label>
        </div>
      </div>

      {!manualMode ? (
        <div className="mb-4 p-4 flex flex-col md:flex-row justify-center md:justify-between items-center rounded-lg">
          <div className="flex flex-col w-full mx-2">
            <label className="block text-md font-medium m-2">Iron:</label>
            <input
              type="number"
              value={iron}
              min={0}
              max={30}
              onChange={(e) => setIron(e.target.value)}
              className="form-input block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex flex-col w-full mx-2">
            <label className="block text-md font-medium m-2">Gold:</label>
            <input
              type="number"
              value={gold}
              min={0}
              max={6}
              onChange={(e) => setGold(e.target.value)}
              className="form-input block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex flex-col w-full mx-2">
            <label className="block text-md font-medium m-2">Diamond:</label>
            <input
              type="number"
              value={diamond}
              min={0}
              max={3}
              onChange={(e) => setDiamond(e.target.value)}
              className="form-input block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
      ) : (
        <div className="mb-4 p-4">
          <label className="block text-md font-medium mb-2">Manual Total Score:</label>
          <input
            type="number"
            value={manualScore}
            min={0}
            onChange={(e) => setManualScore(e.target.value)}
            className="form-input block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
      )}

      <div className="my-4 text-lg font-bold text-center">
        Total Score: <span className="text-blue-600">{totalScore}</span>
      </div>

      <button
        onClick={handleSubmit}
        className="btn btn-primary w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-100"
      >
        Submit
      </button>
      {isSubmitted && (
        <div className="mt-3 text-center">
          <p className="text-success">Submitting...</p>
        </div>
      )}
    </div>
  );
}

export default Game;
