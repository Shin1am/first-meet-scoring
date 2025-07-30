import React, {useState, useEffect} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { scriptURL } from "./constant";
import { db, ref, set, onValue } from "../../firebase";

function MainGame1() {
  const groups = ["Group 1", "Group 2", "Group 3", "Group 4", "Group 5", "Group 6"];
  const [scores, setScores] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isStole, setIsStole] = useState(false);
  const [stolenBy, setStolenBy] = useState("");

  useEffect(() => {
    const scoreRef = ref(db, 'mainScore');
    const unsubscribe = onValue(scoreRef, (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        setScores(data)
      }
    });

    return () => unsubscribe();
  }, []);

  const updateScoreInDB = async (newScore) => {
    try {
      await set(ref(db, 'mainScore'), newScore);
    } catch (err) {
      console.error('Error updating score:', err)
    }
  }

  const handleAdd = async (group) => {
    setIsSubmitted(true);
    const newScore = scores + 100;

    try {
      await updateScoreInDB(newScore);

      const response = await fetch(`${scriptURL}?mode=add&group=${encodeURIComponent(group)}&amount=100`)
      const msg = await response.text()
      alert(msg);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to update score');
    } finally {
      setIsSubmitted(false);
    }
  };

   const handleSteal = async (group) => {
    setIsSubmitted(true);
    setIsStole(true);
    setStolenBy(group);
    
    try {
      // Update Firebase first
      await updateScoreInDB(0);
      
      // Then update Google Sheet
      const response = await fetch(`${scriptURL}?mode=steal&group=${encodeURIComponent(group)}`);
      const msg = await response.text();
      alert(msg);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to steal score');
    } finally {
      setIsSubmitted(false);
      
    }
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
        {isSubmitted && (
          <div className="card-footer text-muted">Processing...</div>
        )}
      </div>

      <div className="flex justify-center h-[100vh] p-8">
        <div className="flex flex-col justify-center items-center text-center mt-5">
          <h1 className="text-[160px]">
            Main Score: <br />
            {scores}
          </h1>
          {isStole && 
            <div className="mt-10">
              <h1>{stolenBy} stole the main score!</h1>
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default MainGame1;
