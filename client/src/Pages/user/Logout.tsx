import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear all auth related data
    localStorage.clear();
    // Redirect to main page
    navigate('/');
  }, [navigate]);

  return null; // No need to render anything
};

export default Logout;