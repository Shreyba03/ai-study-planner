import React, { useState } from "react";
import "./App.css";

function App() {
  const [subject, setSubject] = useState("");
  const [deadline, setDeadline] = useState("");
  const [timePerDay, setTimePerDay] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Subject:", subject);
    console.log("Deadline (weeks):", deadline);
    console.log("Daily Study Time (hrs):", timePerDay);
    // Later we'll send this to backend
  };

  return (
    <div className="App">
      <h1>📘 AI Study Plan Generator</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Subject:</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="e.g., LeetCode"
          />
        </div>
        <div>
          <label>Deadline (weeks):</label>
          <input
            type="number"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            placeholder="e.g., 4"
          />
        </div>
        <div>
          <label>Daily Study Time (hours):</label>
          <input
            type="number"
            value={timePerDay}
            onChange={(e) => setTimePerDay(e.target.value)}
            placeholder="e.g., 2"
          />
        </div>
        <button type="submit">Generate Plan</button>
      </form>
    </div>
  );
}

export default App;