import React, { useState, useEffect } from "react";
import { app } from "../Firebase";
import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";
import { useLocation } from 'react-router-dom';

// Firebase Database
const database = getDatabase(app);
const auth = getAuth(app);

const Attendance = () => {
  const location = useLocation();

  // Example condition: match exact path
  const isAttendace = location.pathname === '/attendance';

  const [storedTimeData, setStoredTimeData] = useState(null);
  const [user, setUser] = useState(null); // State to store the user object

  // Function to get authentication state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user); // Set the user object in state
    });

    return () => unsubscribe(); // Unsubscribe from the listener when component unmounts
  }, []);

  useEffect(() => {
    if (user) {
      const dataRef = ref(database, `users/${user.uid}/stopwatchData`);
      onValue(dataRef, (snapshot) => {
        const data = snapshot.val();
        console.log("Retrieved data from Firebase:", data);
        setStoredTimeData(data); // Update the state with fetched data
      });
    }
  }, [user]);

  return (
    <div className={isAttendace ? 'attendance-list box-grid' : ''}>
      
    <ul>
      {/* Check if storedTimeData is not null before mapping */}
      {storedTimeData &&
        Object.keys(storedTimeData).map((date) =>
          // Iterate over each date
          Object.keys(storedTimeData[date]).map((id) => {
            // Iterate over each item under the date
            const entry = storedTimeData[date][id];
            // Check if entry exists and if stop data is available
            if (entry && entry.stop) {
              return (
                <li key={id}>
                  <p>{entry.date}</p>
                  <p>
                    {entry.hours}:{entry.minutes} Hours
                  </p>
                </li>
              );
            } else {
              return null; // If stop data is not available, return null (don't render)
            }
          })
        )}
    </ul></div>
  );
};

export default Attendance;
