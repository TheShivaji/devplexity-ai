import React from 'react'
import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { router } from './app.routes';
import { useAuth } from '../feature/auth/hook/useAuth.js';
import { useEffect } from 'react';

const App = () => {
  const {handleGetMe} = useAuth();
  useEffect(() => {
    handleGetMe().catch(() => {});
  }, []);
  return (
    <div>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#111111",
            color: "#f5f5f5",
            border: "1px solid rgba(255,255,255,0.1)",
            fontSize: "13px",
          },
          success: { iconTheme: { primary: "#3b82f6", secondary: "#111111" } },
          error: { iconTheme: { primary: "#f87171", secondary: "#111111" } },
        }}
      />
      <RouterProvider router={router} />
    </div>
  )
}

export default App
