import { useContext, useState, useEffect } from "react";
import { PostContext } from "../../contexts/PostContext";

import CatalogItem from "./CatalogItem/CatalogItem";

const Catalog = () => {
    const [loading, setLoading] = useState(true); 
    const { posts } = useContext(PostContext);
    
    useEffect(() => {
    if (!posts) {
        setLoading(true)  
    } else {
        setLoading(false)
    }
   }, [posts])
   
    
    return (
        <section className="catalog">
        <h1>Welcome in ower catalog</h1>
        {loading &&
          <div>
            <p id="loading">Loading...</p>
          </div>
        }
        <ul className="posts">
            {posts.length > 0 
                ? posts.map(post => <CatalogItem key={`${post._id}${5*5}`} post={post} />)
                : <span>
                  {!loading &&
                    <p className="nopost">We don/t have avelable rooms!</p>
                  }
                  </span>
            }
        </ul>
        </section>
    );
};

export default Catalog;
