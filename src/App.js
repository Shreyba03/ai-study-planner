import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [subject, setSubject] = useState("");
  const [deadline, setDeadline] = useState("");
  const [timePerDay, setTimePerDay] = useState("");

  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!subject || subject.trim().length < 3) {
      newErrors.subject = "Enter at least 3 characters";
    }

    if (!deadline || Number(deadline) <= 0) {
      newErrors.deadline = "Deadline must be greater than 0";
    }

    if (!timePerDay || Number(timePerDay) <= 0) {
      newErrors.timePerDay = "Time per day must be greater than 0";
    }

    setErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0);
  };

  useEffect(() => {
    validateForm(); // Validate whenever inputs change
  }, [subject, deadline, timePerDay]);

  const handleSubmit = (e) => {
    e.preventDefault();
    validateForm();

    if (!isFormValid) return;

    console.log("Subject:", subject);
    console.log("Deadline (weeks):", deadline);
    console.log("Daily Study Time (hrs):", timePerDay);
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
          {errors.subject && <p className="error">{errors.subject}</p>}
        </div>

        <div>
          <label>Deadline (weeks):</label>
          <input
            type="number"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            placeholder="e.g., 4"
          />
          {errors.deadline && <p className="error">{errors.deadline}</p>}
        </div>

        <div>
          <label>Daily Study Time (hours):</label>
          <input
            type="number"
            value={timePerDay}
            onChange={(e) => setTimePerDay(e.target.value)}
            placeholder="e.g., 2"
          />
          {errors.timePerDay && <p className="error">{errors.timePerDay}</p>}
        </div>

        <button type="submit" disabled={!isFormValid}>
          Generate Plan
        </button>
      </form>
    </div>
  );
}

export default App;