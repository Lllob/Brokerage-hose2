import { useContext, useState, useEffect, } from "react";
import { AuthContext } from '../../contexts/AuthContext'
import * as postService from '../../services/postService'

import MyPostsItem from "./MypostsItem/MyPostsItem";

const MyPosts = () => {
    const [posts, postState] = useState({});
    const [loading, setLoading] = useState(true);

    const { user } = useContext(AuthContext);
    
    const userId = user._id;
    //console.log(`Mypost user ${user._id}`)
    useEffect(() => { 
        setLoading(true) 
        postService.getMyPosts(userId) 
            .then(result => {
              if (result.error) {
                alert(result.error['message'])
                return;
               }
                postState(result)
                setLoading(false)
            });
    }, [userId]);

    
    return (
    <div className="myposts">
        <h1>My posts</h1>
        {loading &&
          <div>
            <p id="loading">Loading...</p>
          </div>
        }

        <ul className="posts">
            {posts.length > 0
                ? posts.map(post => <MyPostsItem key={`${post._id}${7*9}`} post={post} />)
                : <span>
                {!loading &&
                  <p className="nopost">You dont/t have any post yet!</p>
                }
                 </span>
            }
        </ul>
         
        
    </div>
    );
};

export default MyPosts;
