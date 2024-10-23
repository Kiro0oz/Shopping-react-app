import './App.css';
import Layout from './components/layout';
import Home from './pages/home';
import Detail from './pages/detail';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { createSession } from './API/Endpoints/AppEndpoints';

function App() {
  const [session, setSession] = useState(() => {
    const storedSession = localStorage.getItem('session');
    return storedSession ? JSON.parse(storedSession) : null;
  });
  const [loading, setLoading] = useState(false);

  
  const handleOpenSession = async () => {
    setLoading(true);
    try {
      const sessionData = await createSession();
      const sessionId = sessionData.id;
      setSession(sessionId);
      localStorage.setItem('session', JSON.stringify(sessionId));
    } catch (error) {
      console.error('Error opening session:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {session ? (
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route index element={<Home />} />
              <Route path='/:slug' element={<Detail />} />
            </Route>
          </Routes>
        </BrowserRouter>
      ) : (
        <div className='session'>
          <button 
            className='session_btn' 
            onClick={handleOpenSession} 
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Open Session'}
          </button>
        </div>
      )}
    </>
  );
}

export default App;
