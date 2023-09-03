const router = require('express').Router()
const  { generateToken }  = require('../util/generateToken');
const { register, login, logout } = require('../services/user.js');
const errorMapper = require('../util/errorMapper');

/////////////////////////////////
//register, login, logout

router.post('/register', async (req, res) => { 
 
  try {

    // let em = req.body.email
    // let emRegex = /([a-zA-Z]+)@([a-zA-Z]+)\.([a-zA-Z-]+)$/
    // let hasMatch = em.match(emRegex)
    // //console.log(hasMatch)
    // if (!!hasMatch === false) {
    //   throw new Error ('email is not valid')
    // } 

    if (req.body.password.length < 2) { //.trim()
      throw new Error('Password must be at least 2 character long')
    } 
     //console.log('registeremail ' + req.body.username)
  
   //TO chec
    let user = await register(req.body.username, req.body.email, req.body.password) 
          const userData = { 
            _id: user._id,
            email: user.email
          }
          
          const  accessToken = generateToken(userData)
        if (user) { 
          const data = {
            _id: user._id,
            username: user.username,
            email: user.email,
            basket: user.basket,
            accessToken
          } 
          res.status(201).json(data) 
        }
       
		 
  }  catch (err) {
    console.error(err);
    const message = errorMapper(err);
    res.status(400).json({ message }); 
  }

})
////////////////////////////////////////////////

                 

//TOO check
router.post('/login', async (req, res) => { 
  try {   
    const user = await login(req.body.email, req.body.password);
 
    const userData = { 
      _id: user._id,
      email: user.email
    }
    const  accessToken = generateToken(userData)
    const data = {
      _id: user._id,
      username: user.username,
      email: user.email,
      basket: user.basket,
      accessToken
    }
   
        if (user) { 
          res.status(200).json(data)
        }
    
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }                  
});
///

router.get('/logout', async (req, res) => { // isUser()
  const accessToken = req.header('x-authorization')
  try {
     await logout(accessToken); 
      res.status(204).end();
    
  }  catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
})

module.exports = router;

