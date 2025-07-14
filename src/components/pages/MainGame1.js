import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { scriptURL } from "./constant";

function MainGame1() {
  const groups = ["Group 1", "Group 2", "Group 3", "Group 4", "Group 5", "Group 6"];

  const handleAdd = (group) => {
    fetch(`${scriptURL}?mode=add&group=${encodeURIComponent(group)}&amount=100`)
      .then((res) => res.text())
      .then((msg) => alert(msg))
      .catch(console.error);
  };

  const handleSteal = (group) => {
    fetch(`${scriptURL}?mode=steal&group=${encodeURIComponent(group)}`)
      .then((res) => res.text())
      .then((msg) => alert(msg))
      .catch(console.error);
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">🎯 Score Control Panel</h1>

      <div className="row">
        {groups.map((group, index) => (
          <div className="col-md-4 col-sm-6 mb-4" key={index}>
            <div className="card text-center shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title">{group}</h5>
                <button
                  className="btn btn-success m-2 w-100"
                  onClick={() => handleAdd(group)}
                >
                  ➕ Add +100
                </button>
                <button
                  className="btn btn-danger m-2 w-100"
                  onClick={() => handleSteal(group)}
                >
                  🧨 Steal Main Score
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MainGame1;
