import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ user, onSignOut }) => {
  return (
    <nav className="navbar">
      {user && (
        <>
          <Link to="/">
            <strong>Tasks - MarketPlace</strong>
          </Link>
          {user.role === 'taskowner' && (
            <Link to="/task/create">Create a Task</Link>
          )}
          {/* 
          {user.role === 'individual' && (
            <Link to="/task/list">Tasks applied by you</Link>
          )} */}
        </>
      )}
      <div>
        {(user && (
          <>
            {user.profilePicture && (
              <img src={user.profilePicture} alt={user.name} />
            )}
            <Link to={`/${user.role}/${user._id}`}>{user.name}'s Profile</Link>
            {/* {user.role === 'individual' && (
              <Link to="/individual/qualities">Qualities</Link>
            )} */}
            <button onClick={onSignOut}>Sign Out</button>
          </>
        )) || (
          <>
            <Link to="/">
              <strong>Home</strong>
            </Link>

            <Link to="/sign-in">Sign In</Link>
            <Link to="/sign-up">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
