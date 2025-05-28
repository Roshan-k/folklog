import React, { useState, useEffect } from "react";
import { getDatabase, ref, push, onValue, set } from "firebase/database";
import { getAuth } from "firebase/auth";
import { app } from "../Firebase";

const database = getDatabase(app);
const auth = getAuth(app);

const StopwatchTimer = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [addClass, addClassClicked] = useState(false);
  const [removeClass, removeClassClicked] = useState(false);

  const totalSeconds = 8 * 60 * 60;
  const circleCircumference = 2 * Math.PI * 61;

  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [storedTime, setStoredTime] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;

    const path = `users/${user.uid}/stopwatchData`;
    const dataRef = ref(database, path);

    onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const today = new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }).replace(/\//g, "-");

        const todayData = data[today];
        if (todayData) {
          const entries = Object.values(todayData);
          const lastEntry = entries[entries.length - 1];
          if (lastEntry?.date === getFormattedDate()) {
            setStoredTime(lastEntry);
          } else {
            setStoredTime(null);
          }
        } else {
          setStoredTime(null);
        }
      } else {
        setStoredTime(null);
      }
      setIsLoading(false);
    });
  }, [user]);

  useEffect(() => {
    let interval;
    if (isActive && !isPaused) {
      interval = setInterval(() => {
        setTimeElapsed((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, isPaused]);

  const getFormattedDate = () => {
    return new Date().toLocaleDateString("en-US", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
    setTimeElapsed(0);

    const startTime = new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    if (user) {
      const pathDate = new Date()
        .toLocaleDateString("en-US", { year: "numeric", month: "2-digit", day: "2-digit" })
        .replace(/\//g, "-");

      const sessionRef = push(ref(database, `users/${user.uid}/stopwatchData/${pathDate}`));
      set(sessionRef, { startTime });
    }
  };

  const handleStop = () => {
    setIsActive(false);
    setIsPaused(true);
    saveDataToFirebase();
  };

  const saveDataToFirebase = () => {
    if (!user) return;

    const today = getFormattedDate();
    const pathDate = new Date()
      .toLocaleDateString("en-US", { year: "numeric", month: "2-digit", day: "2-digit" })
      .replace(/\//g, "-");

    const sessionRef = push(ref(database, `users/${user.uid}/stopwatchData/${pathDate}`));
    const stoptTime = new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    set(sessionRef, {
      date: today,
      stop: stoptTime,
      hours: Math.floor(timeElapsed / 3600).toString().padStart(2, "0"),
      minutes: Math.floor((timeElapsed % 3600) / 60).toString().padStart(2, "0"),
      seconds: (timeElapsed % 60).toString().padStart(2, "0"),
      strokeDasharray: `${(timeElapsed / totalSeconds) * circleCircumference}, ${circleCircumference}`,
    });
  };

  const handlePause = () => setIsPaused(true);
  const handleResume = () => setIsPaused(false);

  const formatTime = (h, m, s) =>
    `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;

  const handleAddClass = () => {
    addClassClicked(true);
    removeClassClicked(false);
  };

  const handleRemoveClass = () => {
    removeClassClicked(true);
    addClassClicked(false);
  };

  const timeToDisplay = storedTime && storedTime.date === getFormattedDate()
    ? formatTime(storedTime.hours, storedTime.minutes, storedTime.seconds)
    : formatTime(
        Math.floor(timeElapsed / 3600),
        Math.floor((timeElapsed % 3600) / 60),
        timeElapsed % 60
      );

  const dashArray =
    storedTime && storedTime.date === getFormattedDate()
      ? storedTime.strokeDasharray
      : `${(timeElapsed / totalSeconds) * circleCircumference}, ${circleCircumference}`;

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
            style={{ strokeDasharray: dashArray }}
          />
        </svg>
        <div className="time-display">
          {timeToDisplay}
          <span className="time-format-name">HH MM SS</span>
        </div>
      </div>

      <div className="button-group">
        <div className="timing-hours">
          <h5>Working hours</h5>
          <ul>
            <li><span className="head">From</span>9:30 AM</li>
            <li><span className="head">To</span>6:30 PM</li>
          </ul>
        </div>

        {!isLoading && !storedTime && !isActive && !isPaused && (
          <button onClick={handleStart} className="btn dark">Start Timer</button>
        )}
        {!isLoading && !storedTime && isActive && !isPaused && (
          <button onClick={handlePause} className="btn dark">Pause Timer</button>
        )}
        {!isLoading && !storedTime && isActive && isPaused && (
          <button onClick={handleResume} className="btn dark">Resume Timer</button>
        )}
        {!isLoading && !storedTime && isActive && (
          <button onClick={handleAddClass} className="btn danger">Logout</button>
        )}
      </div>

      <div className={`overlay ${addClass ? "highlight" : ""} ${removeClass ? "" : ""}`}>
        <div className="popup-alert">
          <h3>Are you Sure to Logout?</h3>
          <p>After logging out you will not be able to login again for today and no more time logging.</p>
          {!isLoading && isActive && (
            <button onClick={handleStop} className="btn danger">Logout</button>
          )}
          <button onClick={handleRemoveClass} className="btn grey">Close</button>
        </div>
      </div>
    </div>
  );
};

export default StopwatchTimer;
