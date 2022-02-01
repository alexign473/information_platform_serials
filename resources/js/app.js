import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routing } from './routing/Routing';
import Navigation from './components/Navigation';

export default function App() {
  return (
    <>
      <Router>
        <Navigation />
        <Routing />
      </Router>
    </>
  );
}
