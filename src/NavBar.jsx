import { Link } from 'react-router-dom';
import './NavBar.css';

//Navbar component
const NavBar = ({ loggedInUser, setLoggedInUser }) => {

  //function to handle when user is logout
  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    setLoggedInUser(null);
  };
 
  return (
    <nav className="navbar">
      <div className="login-register">
        {loggedInUser ? (
          <button className="login-button" onClick={handleLogout}>
            {loggedInUser} (Logout)
          </button>
        ) : (
          <Link to="/LoginForm">
            <button className="login-button">Login/Register</button>
          </Link>
        )}
      </div>
      
    </nav>
  );
};

export default NavBar;