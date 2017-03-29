import React from 'react';
import NavContainer from './nav/nav_container';

const App = ({ children, router }) => (
  <div>
    <NavContainer router={router} />
    { children }
  </div>
);

export default App;
