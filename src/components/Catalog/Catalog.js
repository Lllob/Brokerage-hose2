import { useContext } from "react";
import { PostContext } from "../../contexts/PostContext";

import CatalogItem from "./CatalogItem/CatalogItem";

const Catalog = () => {
   const { posts } = useContext(PostContext)
    
    return (
        <section className="catalog">
        <h1>Welcome in ower catalog</h1>
        <ul className="posts">
            {posts.length > 0 
                ? posts.map(post => <CatalogItem key={`${post._id}${5*5}`} post={post} />)
                : <p className="nopost">We don/t have avelable rooms!</p>
            }
        </ul>
        </section>
    );
};

export default Catalog;
