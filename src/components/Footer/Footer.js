import { Link } from 'react-router-dom';

const Footer = () => {
    return(
        <div className="footer">
        <div className="footer">
          <h1>Blue Paradais</h1>
          <ul className="listsF">
            <li className="list">
              <Link to="#">
                <i className="fa-solid fa-location-dot" />
              </Link>
            </li>
            <li className="list">
              <Link to="#">
                <i className="fa-solid fa-phone-volume" />
              </Link>
            </li>
            <li className="list">
              <Link to="#">
                <i className="fa-brands fa-facebook" />
              </Link>
            </li>
            <li className="list">
              <Link to="#">
                <i className="fa-sharp fa-regular fa-envelope" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    )
  }
  
  export default Footer;