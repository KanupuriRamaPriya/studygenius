import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [notes, setNotes] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const generateSummary = async () => {
    setLoading(true);
    try {
     const response = await axios.post('https://studygenius-lta2.onrender.com/api/summarize', {
    notes: notes
    });
      
      setSummary(response.data.summary);
    } // Change your catch block to this:
    catch (error) {
  console.error("Full error details:", error);
  alert("Error: " + (error.response?.data?.error || error.message));
                  }
     finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>StudyGenius AI</h1>
      <textarea 
        value={notes} 
        onChange={(e) => setNotes(e.target.value)} 
        rows="10" style={{ width: '100%' }}
      />
      <button onClick={generateSummary} disabled={loading}>
        {loading ? 'Generating...' : 'Generate Summary'}
      </button>
      <div><h3>Summary:</h3><p>{summary}</p></div>
    </div>
  );
}

export default App;