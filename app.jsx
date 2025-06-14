import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', summary: '', experience: '', education: '', skills: ''
  });
  const [suggestions, setSuggestions] = useState('');

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const resumeText = Object.values(formData).join("\n");
    const res = await axios.post("https://your-backend-url.onrender.com/api/suggest", { resumeText });
    setSuggestions(res.data.suggestions);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Smart Resume Builder</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {['name', 'email', 'phone', 'summary', 'experience', 'education', 'skills'].map(field => (
          <textarea
            key={field}
            name={field}
            value={formData[field]}
            onChange={handleChange}
            placeholder={`Enter your ${field}`}
            className="w-full border rounded p-2"
            rows={field === 'summary' ? 3 : 2}
          />
        ))}
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Get Suggestions</button>
      </form>
      {suggestions && (
        <div className="mt-6 p-4 border bg-gray-50">
          <h2 className="text-xl font-semibold mb-2">AI Suggestions:</h2>
          <p>{suggestions}</p>
        </div>
      )}
    </div>
  );
}

export default App;
