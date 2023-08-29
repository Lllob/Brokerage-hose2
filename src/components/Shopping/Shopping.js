import { useContext, useState, useEffect, } from "react";
import { AuthContext } from '../../contexts/AuthContext'
import * as postService from '../../services/postService'

import ShoppingList from "./ShoppingList/ShoppingList";

const Shopping = () => {
    const [posts, postState] = useState({});
    const [loading, setLoading] = useState(true);

    const { user } = useContext(AuthContext);

    const userId = user._id;
    //console.log(`Shopping user ${user._id}`)

    useEffect(() => {  
        setLoading(true)
        postService.getShopping(userId) 
            .then(result => { 
                postState(result)
                setLoading(false)
            });
    }, [userId]);
    
    return (
        <section className="myShopping">
        <h1>Your Bascket</h1>
        <ul className="posts">
            {posts.length > 0
                ? posts.map(post => <ShoppingList key={`${post._id}${4*5}`} post={post} />)
                : <span>
                  {!loading &&
                    <p className="nopost">Your bascket is emty!</p>
                   }
                 </span>
            }
        </ul>
        </section>
    );
};

export default Shopping;
