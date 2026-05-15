import React from 'react'
import { RouterProvider } from 'react-router-dom';
import { router } from './app.routes';
import { useAuth } from '../feature/auth/hook/useAuth.js';
import { useEffect } from 'react';

const App = () => {
  const {handleGetMe} = useAuth();
  useEffect(() => {
    handleGetMe().catch((err) => console.log("User not logged in or session expired."));
  }, []);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
