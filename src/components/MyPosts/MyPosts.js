import { useContext, useState, useEffect, } from "react";
import { AuthContext } from '../../contexts/AuthContext'
import * as postService from '../../services/postService'

import MyPostsItem from "./MypostsItem/MyPostsItem";

const MyPosts = () => {
    const [posts, postState] = useState({});
    const { user } = useContext(AuthContext);
    
    const userId = user._id;
  
    useEffect(() => {
        postService.getMyPosts(userId) 
            .then(result => {
              if (result.error) {
                alert(result.error['message'])
                return;
               }
                postState(result)
            });
    }, [userId]);

    
    return (
    <div className="myposts">
        <h1>My posts</h1>

        <ul className="posts">
            {posts.length > 0
                ? posts.map(post => <MyPostsItem key={`${post._id}${7*9}`} post={post} />)
                : <p className="nopost">You dont/t have any post yet!</p>
            }
        </ul>
         
        
    </div>
    );
};

export default MyPosts;
