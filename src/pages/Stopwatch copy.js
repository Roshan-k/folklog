import React, { useState, useEffect } from "react";
import { getDatabase, ref, push, onValue, set } from "firebase/database";
import { getAuth } from "firebase/auth";
import { app } from "../Firebase";

// Firebase Database
const database = getDatabase(app);
const auth = getAuth(app);

const StopwatchTimer = () => {
  const [user, setUser] = useState(null); // State to store the user object
  const [isLoading, setIsLoading] = useState(true); // State to track if data is being loaded
  //const [startTime, setStartTime] = useState(null); // State to store the start time

  // State to track whether each button is clicked
  const [addClass, addClassClicked] = useState(false);
  const [removeClass, removeClassClicked] = useState(false);

  // Function to handle button 1 click
  const handleAddClass = () => {
    addClassClicked(true);
    removeClassClicked(false); // Reset other button's state
  };

  // Function to handle button 2 click
  const handleRemoveClass = () => {
    removeClassClicked(true);
    addClassClicked(false); // Reset other button's state
  };

  // Function to check if the date matches the current date
  const isCurrentDate = (dateString) => {
    return (
      dateString ===
      new Date().toLocaleDateString("en-US", {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    );
  };

  const stoptTime = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const totalSeconds = 8 * 60 * 60; // 8 hours in seconds
  const circleCircumference = 2 * Math.PI * 61; // circumference of the circle with radius 61
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [storedTime, setStoredTime] = useState(null); // State to store fetched time from Firebase

  // Function to get authentication state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user); // Set the user object in state
      setIsLoading(false); // Set loading to false once user state is fetched
    });

    return () => unsubscribe(); // Unsubscribe from the listener when component unmounts
  }, []);

  // Start or pause the timer based on isActive and isPaused states
  useEffect(() => {
    let interval;
    if (isActive && !isPaused) {
      interval = setInterval(() => {
        setTimeElapsed((prevTimeElapsed) => prevTimeElapsed + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, isPaused]);

  // Function to handle start button click
  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
    const startTime = new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    // Save startTime to Firebase
    if (user) {
      const pathDate = new Date()
        .toLocaleDateString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
        .replace(/\//g, "-"); // Format the date as YYYY-MM-DD

      const sessionRef = push(
        ref(database, `users/${user.uid}/stopwatchData/${pathDate}`)
      );

      set(sessionRef, {
        startTime: startTime,
      });
    }
  };

  // Function to handle pause button click
  const handlePause = () => {
    setIsPaused(true);
  };

  // Function to handle resume button click
  const handleResume = () => {
    setIsPaused(false);
  };

  // Function to handle stop button click
  const handleStop = () => {
    setIsActive(false);
    setIsPaused(true);
    saveDataToFirebase();
  };

  // Function to save data to Firebase
  const saveDataToFirebase = () => {
    if (!user) {
      console.log("User not logged in.");
      return;
    }

    // Get today's date in a human-readable format
    const today = new Date().toLocaleDateString("en-US", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    // Get today's date in a human-readable format
    const pathDate = new Date()
      .toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .replace(/\//g, "-"); // Format the date as YYYY-MM-DD

    const sessionRef = push(
      ref(database, `users/${user.uid}/stopwatchData/${pathDate}`)
    );

    // Push data to the stopwatchData node with date included
    set(sessionRef, {
      date: today,
      stop: stoptTime,
      hours: Math.floor(timeElapsed / 3600)
        .toString()
        .padStart(2, "0"),
      minutes: Math.floor((timeElapsed % 3600) / 60)
        .toString()
        .padStart(2, "0"),
      seconds: (timeElapsed % 60).toString().padStart(2, "0"),
      strokeDasharray: `${
        (timeElapsed / totalSeconds) * circleCircumference
      }, ${circleCircumference}`,
    });
  };

  useEffect(() => {
    if (user) {
      const dataRef = ref(database, `users/${user.uid}/stopwatchData`);
      onValue(dataRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const keys = Object.keys(data);
          const latestKey = keys.length > 0 ? keys[keys.length - 1] : null;
          const latestData = data[latestKey];

          // Check if the latest data is for the current date
          if (latestData && isCurrentDate(latestData.date)) {
            setStoredTime(latestData);
          } else {
            // If the latest data is not for the current date, reset storedTime
            setStoredTime(null);
          }
        } else {
          // If there is no data, set storedTime to null
          setStoredTime(null);
        }
        setIsLoading(false);
      });
    }
  }, [user]);

  // Function to format time in HH:MM:SS format
  const formatTime = (hours, minutes, seconds) => {
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}`;
  };

  return (
    <div className="stopwatch-timer">
      <div className="circle-wrapper">
        <svg>
          <circle cx="50%" cy="50%" r="45%" />
          <circle
            className="red"
            cx="50%"
            cy="50%"
            r="45%"
            strokeDasharray={
              storedTime && storedTime && isCurrentDate(storedTime.date)
                ? storedTime.strokeDasharray
                : `${
                    (timeElapsed / totalSeconds) * circleCircumference
                  }, ${circleCircumference}`
            }
          />
        </svg>
        <div className="time-display">
          {storedTime && isCurrentDate(storedTime.date)
            ? // Render the formatted time if the stored date matches the current date
              formatTime(
                storedTime.hours,
                storedTime.minutes,
                storedTime.seconds
              )
            : // Render the formatted time based on elapsed time if the stored date doesn't match the current date
              formatTime(
                Math.floor(timeElapsed / 3600),
                Math.floor((timeElapsed % 3600) / 60),
                timeElapsed % 60
              )}
          <span className="time-format-name">HH MM SS</span>
        </div>
      </div>
      <div className="button-group">
        <div className="timing-hours">
          <h5>Working hours</h5>
          <ul>
            <li>
              <span className="head">From</span>9:30 AM
            </li>
            <li>
              <span className="head">To</span>6:30 PM
            </li>
          </ul>
        </div>
        {!isLoading &&
          (!storedTime || !isCurrentDate(storedTime.date)) &&
          !isActive &&
          !isPaused && (
            <button onClick={handleStart} className="btn dark">
              Start Timer
            </button>
          )}
        {!isLoading &&
          (!storedTime || !isCurrentDate(storedTime.date)) &&
          isActive &&
          !isPaused && (
            <button onClick={handlePause} className="btn dark">
              Pause Timer
            </button>
          )}
        {!isLoading &&
          (!storedTime || !isCurrentDate(storedTime.date)) &&
          isActive &&
          isPaused && (
            <button onClick={handleResume} className="btn dark">
              Resume Timer
            </button>
          )}
        {!isLoading &&
          (!storedTime || !isCurrentDate(storedTime.date)) &&
          isActive && (
            <button onClick={handleAddClass} className="btn danger">
              Logout
            </button>
          )}
      </div>

      <div
        className={`overlay ${addClass ? "highlight" : ""} ${
          removeClass ? "" : ""
        }`}
      >
        <div className="popup-alert">
          <h3>Are you Sure to Logout?</h3>
          <p>
            After logging out you will be not able to login again for today and
            no more time logging.{" "}
          </p>
          {!isLoading &&
            (!storedTime || !isCurrentDate(storedTime.date)) &&
            isActive && (
              <button onClick={handleStop} className="btn danger">
                Logout
              </button>
            )}
          <button onClick={handleRemoveClass} className="btn grey">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default StopwatchTimer;
