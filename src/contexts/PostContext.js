import { createContext, useReducer, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import * as postService from '../services/postService';

export const PostContext = createContext();

const postReducer = (state, action) => {
    switch (action.type) { //action = {type: 'CREATE'; data:.....; postId:12337765}

        case 'CATALOG': 
            return action.data;

        case 'CREATE':
            return [...state, action.data];
            
         case 'DETAILS':
            return state.map(p => p._id === action.postId ? action.data : p);

        case 'EDIT'://edit
            return state.map(p => p._id === action.postId ? action.data : p);

        case 'REMOVE'://delete
            return state.filter(p => p._id !== action.postId);

        default: 
            return state;
    }

};

///
export const PostProvider = ({   
    children,    
}) => {
    const navigate = useNavigate();
    const [posts, dispatch] = useReducer(postReducer, []);

     //cataloga
    useEffect(() => {
        postService.getCatalog()
            .then(result => { 
                 const action = {   
                    type: 'CATALOG', 
                    data: result,  
                };
                dispatch(action); 
            });
    }, []);
 
    
     
    //for details
    const tekPost = (postId) => { 
        return posts.find(p => p._id === postId) || {};
    }

   // details 
    const postDetails = (data, postId) => {
      if (data) {
        const action = { 
            type: 'DETAILS', 
            data,
            postId,   
        };
        //console.log(action)
         dispatch(action)
       }
    };
   
   //create
    const postCreate = (postData) => {
        dispatch({
            type: 'CREATE',
            data: postData, 
        })
        //console.log(posts)
        navigate('/catalog');
    };
    


    //edit
    const postEdit = (postId, postData) => {
        dispatch({
            type: 'EDIT',
            data: postData,
            postId,
        });
        
    };

    //delite
    const  postRemove = (postId) => {
        dispatch({
            type: 'REMOVE',
            postId,
        })
        //console.log(postId)
    }


    
    return (
        <PostContext.Provider value={{
            posts, 
            postCreate,
            postEdit,
            postRemove,
            postDetails,
            tekPost,
         }}>
            {children}
        </PostContext.Provider>
    );
}
