import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [notes, setNotes] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const generateSummary = async () => {
    setLoading(true);
    try {
      // Direct connection to your server on port 5000
      const response = await axios.post('http://localhost:5000/api/summarize', { notes });
      setSummary(response.data.summary);
    } catch (error) {
      console.error("Connection Error:", error);
      alert("Could not connect to server. Check the terminal for errors.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif' }}>
      <h1>StudyGenius AI</h1>
      <textarea 
        rows="10" 
        cols="60" 
        placeholder="Paste your study notes here..." 
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        style={{ fontSize: '16px', padding: '10px' }}
      />
      <br />
      <button 
        onClick={generateSummary} 
        disabled={loading}
        style={{ marginTop: '10px', padding: '10px 20px', cursor: 'pointer' }}
      >
        {loading ? 'Generating...' : 'Generate Summary'}
      </button>
      
      <div style={{ marginTop: '30px', maxWidth: '600px' }}>
        <h3>AI Summary:</h3>
        <p style={{ whiteSpace: 'pre-line', lineHeight: '1.6' }}>{summary}</p>
      </div>
    </div>
  );
}

export default App;