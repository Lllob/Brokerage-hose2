const Post = require('../models/Create') 
const User = require('../models/User.js') 
const dataD = require('../data/data.js')

//Catalog
async function getPost() {  
    let posts = await Post.find({})
    //console.log(posts)
     if (posts.length > 0) {
       return posts;
     } else {
         let result
         for (let el of dataD) {
           //console.log(el)
            result = new Post(el) 
           await result.save()
         }
          return await Post.find({})  
       }
}
//////////


//Create
async function createPost(post) {
  const result = new Post(post);
  return await result.save()
}
///////


//Details
async function getPostById(id) {
  return await Post.findById(id)  
}


//Edit
async function editPost(id, post) { 
  const existing = await Post.findById(id); 
   
    //we change the data in the template
   existing.title = post.title;
   existing.imageUrl = post.imageUrl;
   existing.description = post.description;
   existing.price = post.price,
   existing.type = post.type;
   //existing.owner = post.owner; 
   
   return await existing.save()
}
///////

//Delete
async function deletePost(id) {
  return await Post.findByIdAndDelete(id)
}  

/////////////////////////////////

//Buyer 
async function buyer(postId, userId) {
  const post = await Post.findById(postId) 
   
   if (post.boughtBy.includes(userId)) { 
       throw new Error('User has already buy it')
   }
  
  post.boughtBy.push(userId) 
  await post.save()
  //console.log(post)

  //the offers that the user bought, we put them in .basket[]
  const user = await User.findById(userId)//(_id) //usera = na ownera na publikaciqta
  user.basket.push(postId) 
  await user.save()
  
  return post.boughtBy.length; //return the number of people who bought the post
}
////////////////////////

//Likes
async function likesPost(postId, userId) {
  const post = await Post.findById(postId) 
   
  if (post.likes.includes(userId)) {  
    throw new Error('User has already like it')
  }
  
  post.likes.push(userId) //vkarvame usera v bouthBy(lista na haresalite posta)
  await post.save()
  
  return post.likes.length; 
} 
////////////////////////

//My Profil
  async function getProfil(userId) {
     return await Post.find({ owner: userId })
   }
////////

//My shopping 
async function getShopping(userId) {
  const user = await User.findById(userId) 

  const basketBuyId = user.basket; 
  const allBuyPosts = await Post.find({ _id: basketBuyId });
  return allBuyPosts;
}
 

module.exports = {
  createPost,
  getPost,
  getPostById,
  editPost,
  deletePost,
  buyer,
  likesPost,
  getProfil,
  getShopping
}

