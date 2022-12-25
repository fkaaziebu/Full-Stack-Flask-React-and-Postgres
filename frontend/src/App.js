import { useEffect, useState } from 'react';
import axios from "axios";
import { format, set } from "date-fns";

import './App.css';

const baseUrl = "http://localhost:5000";

function App() {
  const [description, setDescription] = useState("");
  const [eventsList, setEventsList] = useState([]);
  const [eventId, setEventId] = useState(null);
  const [editDescription, setEditDescription] = useState("");



  const handleChange = (e, field) => {
    if (field === "edit") {
      setEditDescription(e.target.value)
    } else {
      setDescription(e.target.value)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editDescription) {
        const data = await axios.put(`${baseUrl}/events/${eventId}`, {description: editDescription})
        const updatedEvent = data.data.event;
        const updatedList = eventsList.map(event => {
          if (event.id === eventId) {
            return event = updatedEvent;
          }
          return event;
        })
        setEventsList(updatedList);
      } else {
        const data = await axios.post(`${baseUrl}/events`, {description})
        setEventsList([...eventsList, data.data])
      }
      setDescription("");
      setEditDescription("");
      setEventId(null)
    } catch {
      // console.error(e.message);
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${baseUrl}/events/${id}`);
      const updatedList = eventsList.filter(event => event.id !== id)
      setEventsList(updatedList)
    } catch {
      // console.error(err.message)
    }
  }

  // Toggle edit function
  const toggleEdit = (event) => {
    setEventId(event.id);
    setEditDescription(event.description)
  }

  // Fetching data from the API
  const fetchEvents = async () => {
    const data = await axios.get(`${baseUrl}/events`)
    setEventsList(data.data.events)
  }
  // useEffect to call fetchEvents function
  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="App">
      <section>
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
      </section>
      <section>
        <ul>
          { eventsList.map(event => {
            if (eventId === event.id) {
              return (
                <li key={eventId}>
                  <form onSubmit={handleSubmit}>
                    <input
                      onChange={(e) => handleChange(e, 'edit')}
                      type="text"
                      name="editDescription"
                      id="editDescription"
                      value={editDescription}
                    />
                    <button type="submit">Submit</button>
                  </form>
                </li>
              )
            } else {
              return (
                <li key={event.id}>
                  {event.description}
                  <button onClick={() => toggleEdit(event)}>Edit</button>
                  <button onClick={handleDelete}>X</button>
                </li>
              )
            }
          })}
        </ul>
      </section>
    </div>
  );
}

export default App;
