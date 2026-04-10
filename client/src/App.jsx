import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import ParticleBackground from './components/ParticleBackground';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50">Loading...</div>;
  }

  return (
    <>
      {/* 1. Add the background component here! */}
      <ParticleBackground />

      <Router>
        <Navbar /> 
        <div className="min-h-screen text-gray-900 font-sans transparent">
          <Routes>
            <Route path="/" element={<Home user={user} />} />
            <Route 
              path="/login" 
              element={user ? <Navigate to="/dashboard" /> : <Login />} 
            />
            <Route 
              path="/dashboard" 
              element={user ? <Dashboard userId={user.uid} /> : <Navigate to="/login" />} 
            />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;