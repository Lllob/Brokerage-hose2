import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';

import * as postService from '../../services/postService';
import { PostContext } from "../../contexts/PostContext";
//import { AuthContext } from '../../contexts/AuthContext'

const Edit = () => {
    const [post, postState] = useState({});
    const { postEdit } = useContext(PostContext);
   // const [btnDisable, setButonD] = useState(false)
 
    const postId = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        postService.getDetails(postId.id)//details
            .then(result => {
                postState(result);
            })
    }, [postId.id])
   
    const onSubmit = (e) => {
        e.preventDefault();

        const editData = Object.fromEntries(new FormData(e.target));

        if (editData.title === '' || editData.description === '' || editData.imageUrl === '' ||editData.price === '' || editData.type === '') {
          //setButonD(false)
          return alert('Pleas, fill all fields!')
        //  } else {
        //   setButonD(true)
          }

          if (isNaN(Number(editData.price))) {
            return alert('Price must be a number')
         }

         
         const formData = new FormData(e.target)
         const title = formData.get('title')
         const imageUrl = formData.get('imageUrl')
         const description = formData.get('description')
         const price = Number(formData.get('price'))
         const type = formData.get('type')

      const data = { 
        title,  
        imageUrl,
        description,
        price,
        type,
        //owner: user._id,
      } 
    
        postService.editPost(postId.id, data)
            .then(result => { 
              if (result.error) {
                alert(result.error['message'])
                return
              }
                postEdit(postId.id, result);
                navigate(`/details/${postId.id}`)
            });
    };


return(
  <div className="edit">
  <form onSubmit={onSubmit}>
    <div className="formDiv">
      <div className="inputD">
        <label htmlFor="title">Title</label>
        <input name="title" type="text" defaultValue={post.title} />
      </div>
      <div className="inputD">
        <label htmlFor="imageUrl">Image url</label>
        <input name="imageUrl" type="text" defaultValue={post.imageUrl} />
      </div>
      <div className="inputD">
        <label htmlFor="description">Description</label>
        <textarea className='desc' name="description" type="text" defaultValue={post.description} />
      </div>
      <div className="inputD">
        <label htmlFor="price"> Price</label>
        <input name="price" type="text" defaultValue={post.price} />
      </div>
      <div className="inputD">
        <label htmlFor="type">Select Room:</label>
        <select name="type">
          <option value="Apartment">Apartment</option>
          <option value="Doubleroom">Double room</option>
          <option value="Singleroom">Single room</option>
          <option value="Other">Other</option>
        </select>
      </div>
      {/* {!btnDisable && */}
      <button className="btn">Edit</button> 
      
    </div>
      
  </form>
</div>
)
  }

export default Edit;

//style={{disabled: btnDisable}}
