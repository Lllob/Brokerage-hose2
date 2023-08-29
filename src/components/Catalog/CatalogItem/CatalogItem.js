import { Link } from 'react-router-dom';
import { useContext } from 'react';

import { AuthContext } from '../../../contexts/AuthContext';

const CatalogItem = ({ post }) => { //props
  const { isAuthenticated } = useContext(AuthContext)
  let user = isAuthenticated

  return(
      <li className="list">
        <img src={post.imageUrl} alt="images" />
        <article className="art">
        <h2 className='title2'>{post.title}</h2>
        <p className='type'>Type: {post.type}</p>
        
        {user &&
        <Link className="btn" to={`/details/${post._id}`}>
          Details
        </Link>
       }
        </article>
      </li>
    )
  }

  export default CatalogItem
