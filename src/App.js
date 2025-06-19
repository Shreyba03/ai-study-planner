import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [subject, setSubject] = useState("");
  const [deadline, setDeadline] = useState("");
  const [timePerDay, setTimePerDay] = useState("");

  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [planResponse, setPlanResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    validateForm();
    if (!isFormValid) return;

    setIsLoading(true);
    setPlanResponse(null);

    try {
      // Use absolute URL since proxy isn't working
      const response = await fetch("http://localhost:5001/generate-plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ subject, deadline, timePerDay }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Backend response:", data);
      
      setPlanResponse(data);
      
    } catch (err) {
      console.error("Error contacting backend:", err);
      setPlanResponse({ 
        error: `Failed to generate plan: ${err.message}` 
      });
    } finally {
      setIsLoading(false);
    }
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

        <button type="submit" disabled={!isFormValid || isLoading}>
          {isLoading ? "Generating..." : "Generate Plan"}
        </button>
      </form>

      {/* Display the plan response */}
      {planResponse && (
        <div style={{ marginTop: "20px", padding: "20px", border: "1px solid #ccc", borderRadius: "5px" }}>
          {planResponse.error ? (
            <div style={{ color: "red" }}>
              <h3>❌ Error</h3>
              <p>{planResponse.error}</p>
            </div>
          ) : (
            <div style={{ color: "green" }}>
              <h3>✅ {planResponse.message}</h3>
              {planResponse.data && (
                <div>
                  <p><strong>Subject:</strong> {planResponse.data.subject}</p>
                  <p><strong>Timeline:</strong> {planResponse.data.deadline}</p>
                  <p><strong>Daily Time:</strong> {planResponse.data.dailyTime}</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;