const User = require('../models/User');  
const BlackList = require ('../models/BlackList'); 
const { hash, compare } = require('bcrypt');

async function register(username, email, password) { 
    const existing = await getUserByEdentifaier(email) 

    if (existing) {
        throw new Error('Email allready exist')
    }

    const hashedPassword = await hash(password, 10)
     
    const user = new User({//popalvme modela
        username,
        email,
        hashedPassword
    });
    
   await user.save(); 
   return user;
}
//////////

async function login(email, password) {
    const user = await getUserByEdentifaier(email);

    if (!user) {
        throw new Error('Incorrect email or password');
    }

    const hasMatch = await compare(password, user.hashedPassword) 

    if (!hasMatch) {
        throw new Error('Incorrect password')
    }

    return user;
}


//TOO identify user
async function getUserByEdentifaier(email) { 
    const user = await User.findOne({ email: new RegExp(`^${email}$`, 'i') })
    return user; 
}

//Logout
 async function logout(accessToken) {
     const result = new BlackList({ accessToken: accessToken} ) 
     return await result.save()
 }
//////////////////////////////

 async function validateToken(accessToken) { 
    
     const tryBlackList = await BlackList.findOne({ accessToken: accessToken })
    if (tryBlackList) {
       return false;
    }

    return true 
}

module.exports = {
    login,
    register,
    logout,
    validateToken
}
