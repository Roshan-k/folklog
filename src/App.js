import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import GlobalStyle from "./globalStyle";
import { ThemeProvider } from "styled-components";
import React, { useState, useEffect } from "react";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "./Firebase";

const auth = getAuth(app);

function App() {
  const theme = {
    colors: {
      primary: "#151437",
      secondary: "#0052CC",
      green: "#36B37E",
      pink: "#FF75B7",
      red: "#EA1B0E",
      purple: "#C275FF",
      lightBlue: "#75ADFF",
      textDark: "#000000",
    },
  };

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Routes>
          <Route
            path="/login"
            element={
              isAuthenticated ? (
                <Navigate to="/" />
              ) : (
                <Login handleLoginSuccess={() => setIsAuthenticated(true)} />
              )
            }
          />
          <Route
            path="/signup"
            element={isAuthenticated ? <Navigate to="/" /> : <Signup />}
          />
          <Route
            path="/dashboard/*" // Change the path to handle nested routes
            element={
              isAuthenticated ? <Layout /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/*"
            element={
              isAuthenticated ? <Layout /> : <Navigate to="/login" replace />
            }
          />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
