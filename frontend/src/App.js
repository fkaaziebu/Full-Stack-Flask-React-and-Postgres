import { useEffect, useState } from 'react';
import axios from "axios";
import { format, set } from "date-fns";

import './App.css';

const baseUrl = "http://localhost:5000";

function App() {
  const [description, setDescription] = useState("");

  const handleChange = (e) => {
    setDescription(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault();
    console.log(description)
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label htmlFor="description">Description</label>
        <input
          onChange={handleChange}
          type="text"
          name="description"
          id="description"
          value={description}
        />
        <button type="submit">Submit</button>
      </form>    
    </div>
  );
}

export default App;
