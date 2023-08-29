import {  useContext, useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom'; // ID, link, navigate(/catalog)

import { PostContext } from '../../contexts/PostContext';
import { useAuthContext } from '../../contexts/AuthContext';//vzimame dannite za usera
import * as postService from '../../services/postService';

const Details = () => {
    //const [detail, setDetail] = useState();
    let [isOwner, setIsOwner] = useState(false);

    let [totalLikes, setTotalLikes] = useState('');  
    let [like, setLiks] = useState(false);

    let [totalBuy, setTotalBuy] = useState('')
    let [buy, setBuy] = useState(false)//buys
    
    const postId = useParams();// {id:223533}
    const { postDetails, tekPost, postRemove } = useContext(PostContext);
    const { user } = useAuthContext()
    const navigate = useNavigate();
    
   useEffect(() => {
      postService.getDetails(postId.id) 
        .then(data => {
           if (data.error) {
             alert(data.error['message'])
            return;
           }

            if (data) {
              postDetails(data, data._id)
            // setDetail(result)
              if (data.owner === user._id) {
                setIsOwner(true)
              } else {
                setIsOwner(false)
              }

              //we take the number of users who bought/like the post
             setTotalBuy(data.boughtBy.length) 
             setTotalLikes(data.likes.length)
           
             //has usera already bought/likes the post
             setBuy(data.boughtBy.includes(user._id))
             setLiks(data.likes.includes(user._id))
            }
           
         })
        //eslint-disable-next-line 
  }, [postId.id])
 
        
    
  const currentPost = tekPost(postId.id);
 // const isOwner = currentPost.owner === user._id; 
     
 //////////////////////////////////////
       
    /////Delete
    const postDeleteHandler = () => {
      
      const confirmation = window.confirm('Are you sure you want to delete this post?');
      if (confirmation) {
          postService.remove(postId.id)
              .then(() => { 
                  postRemove(postId.id);
                  navigate('/catalog');
              })
      }
    }


  /////////buy
  const buyHandler = () => {

    postService.buy(postId.id) 
           .then(data => { 
               if (data.error) {
                   alert(data.error['message'])
                 return;
               }
               setTotalBuy(data)
               return alert('You have buy it')
           })   
           setBuy(true)   
  }

      
     //likes
     const likeHandler = () => { 
      postService.likePost(postId.id) 
      .then(data => {
        if (data.error) {
             alert(data.error['message'])
           return;
         }
          setTotalLikes(data)
          return alert('You have like it')
      })
        setLiks(true);
     }

  

  return(
  <div className="details">
  <img src={currentPost.imageUrl} alt="img" />
  <article className="art">
    <div>
    <h2 className="title2"><span>Tytle: </span>{currentPost.title}</h2>
    <p className="type"><span>Type of room: </span>{currentPost.type}</p>
    <p className="desc"><span>Description: </span>{currentPost.description}</p>
    <p className="price"><span>Price: </span>{currentPost.price}</p>
    </div>
    <div>
    {/* Edit/Delete buttons ( Only for creator of this post ) */}
        {isOwner && 
        <div>
          <Link className="btn" to={`/edit/${currentPost._id}`}>
            Edit  
          </Link>
          <button className="btn" onClick={postDeleteHandler}>
            Delete
          </button>
        </div>
        } 
    </div>

       <div className='buyL'>
        <div>
        {!isOwner &&
           <div>
            {!buy &&
             <button className="btn" onClick={buyHandler}>Buy</button>
            }
            </div>
        }
         <p>Total buy: {totalBuy}</p>
         </div>
         
         <div>
        {!isOwner &&
           <div>
            {!like &&
               <button className="btn" onClick={likeHandler}>Like</button>
            }
             </div>
        }
        <p>Total like: {totalLikes}</p>
        </div>
      </div>

  </article>
</div>
  )
};

export default Details;

// style={{ background: "red"}}
