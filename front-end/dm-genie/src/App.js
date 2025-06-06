import { useState } from "react";

function App() {
  const [jobText, setJobText] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/ai-agent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: jobText }),
      });

      const data = await res.json();
      setResult(data.response);
    } catch (err) {
      console.error("Error calling backend:", err);
      setResult("Something went wrong.");
    }

    setLoading(false);
  };

  return (
    <div className="App">
      <h1>DM Genie</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          rows="6"
          cols="50"
          value={jobText}
          onChange={(e) => setJobText(e.target.value)}
          placeholder="Paste a job description here..."
        />
        <br />
        <button type="submit">Generate</button>
      </form>
      {loading && <p>Loading...</p>}
      {result && (
        <div>
          <h3>AI Response:</h3>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}

export default App;
