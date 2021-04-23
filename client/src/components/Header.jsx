import React from 'react';
import Navbar from './Navbar';
import './Header.scss';
const Header = ({ user, onSignOut }) => {
  return (
    <header className="task_header">
      <Navbar user={user} onSignOut={onSignOut} />
    </header>
  );
};
export default Header;
