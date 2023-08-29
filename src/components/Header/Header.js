import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { useContext } from 'react';

const Header = () => {
  const { isAuthenticated } = useContext(AuthContext)
  let user = isAuthenticated


  return (
<div className="nav1">
  <img src="./images/logo-img.png" alt="img" className="imgHed" />
  <Link to="/">
    <i className="fa-solid fa-house" /> 
  </Link>

  <h1 className="title">Welcome!</h1>
  <Link className="sear" to="/search">Search</Link>

  <i className="fa-solid fa-bars">
    <ul className="bars">
     <li className="list">
         <Link to="/catalog">Catalog</Link>
      </li>

    {user &&
       <div>
      <li className="list">
        <Link to="/mylist/:id">My list</Link>
      </li>
      <li className="list">
        <Link to="/create">Create</Link>
      </li>
      </div>
     }
      
    </ul>
  </i>

  <i className="fa-regular fa-user">
    <ul className="auth">
      {!user
      ? <span>
        <li className="list">
          <Link to="/login">Login</Link>
        </li>
        <li className="list">
          <Link to="/register">Register</Link>
        </li>
        </span>
      : <li className="list">
          <Link to="/logout">Logout</Link>
        </li>
     }
    </ul>
  </i>
   
   {user &&
    <Link to="/shopping/:id"><i className="fa-solid fa-cart-shopping"></i></Link>
   }
</div>
);
}

export default Header;
