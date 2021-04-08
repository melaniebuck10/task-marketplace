import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ user, onSignOut }) => {
  return (
    <nav className="navbar">
      <Link to="/">
        <strong>Tasks - MarketPlace</strong>
      </Link>
      {user && (
        <>
          {user.role === 'taskowner'}
          {user.role === 'individual'}
        </>
      )}
      <div>
        {(user && (
          <>
            {user.profilePicture && (
              <img src={user.profilePicture} alt={user.name} />
            )}
            <Link to={`/${user.role}/${user._id}`}>{user.name}</Link>
            {user.role === 'individual'}
            <button onClick={onSignOut}>Sign Out</button>
          </>
        )) || (
          <>
            <Link to="/sign-in">Sign In</Link>
            <Link to="/sign-up">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;