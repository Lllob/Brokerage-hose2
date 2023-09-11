import { Link } from 'react-router-dom';

const Home = () => {
  return (
  <div className="home">

    <div className="div">
      <div className="divImg">
        <img src="images/hotel-aerial.jpg" alt="img" className="img" />
        <p className="name">BLUE PARADAIS</p>
      </div>

      <div className="parag">
        <h2 className="title2">Brokerage agency Blue Paradais</h2>
        <p className="desc">
          <span>
             If your decision is to trust a brokerage agency, it is good to choose only one to move the transaction. Working with just one brokerage will save you a bunch of endless viewings.
           </span>
           <span>
              Brokerage agencies like Blue Paradais, for example, will take care of everything necessary, starting from the preparation of all the necessary documents, the search for clients and inspections to the very realization of the transaction.
          </span>
        </p>

        <p className="desc2">For more information you can contact as</p>
        <ul className="lists">
          <li className="list">
            <Link to="">
              <i className="fa-solid fa-location-dot" />
              Adress: Spayn, Tenerife
              </Link>
          </li>
          <li className="list">
            <Link to="">
              <i className="fa-solid fa-phone-volume" />
              Telepfone: 00436/33455
            </Link>
          </li>
          <li className="list">
            <Link to="">
              <i className="fa-brands fa-facebook" />
              Facebook
            </Link>
          </li>
          <li className="list">
            <Link to="">
              <i className="fa-sharp fa-regular fa-envelope" />
              Email
            </Link>
          </li>
        </ul>
      </div>
    </div>
  </div>
  );
}

export default Home;