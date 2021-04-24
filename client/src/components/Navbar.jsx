import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.scss';
import logoimage from './../pictures/getstuffdone.png';

const Navbar = ({ user, onSignOut }) => {
  return (
    <nav className="navbar">
      <Link to="/">
            <img className="logoimage" src={logoimage} alt="logo" />
          </Link>
      {user && (
        <>
          {user.role === 'taskowner' && (
            <Link to="/task/create" className="link">Create a Task</Link>
          )}
          {user.role === 'taskowner' && (
            <Link to={`/taskowner/${user._id}/list`} className="link">Your Tasks</Link>
          )}

          {user.role === 'individual' && (
            <Link to={`/individual/${user._id}/myapplications`}>
              Your applications
            </Link>
          )}
        </>
      )}
      <div>
        {(user && (
          <>
            {(user.profilePicture && (
              <Link className="img__wrap" to={`/${user.role}/${user._id}`}>
                <img
                  className="img__img"
                  src={user.profilePicture}
                  alt={user.name}
                />
                <p className="img__description">
                  <span>Your profile</span>{' '}
                </p>
              </Link>
            )) || (
              <Link to={`/${user.role}/${user._id}`}>
                {user.name}'s Profile
              </Link>
            )}
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
