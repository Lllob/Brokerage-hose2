const jwt = require("jsonwebtoken"); //npm i jsonwebtoken

const { validateToken } = require('../services/user')

const JWT_SECRET = 'jhuy76540kmzczx91j6y95gk66t' 

function generateToken(id) { 
  const accessToken = jwt.sign({ id }, JWT_SECRET, {
    expiresIn: "20days",
  });
  return accessToken
};

 async function getDataFromToken(accessToken) {
  const validate = await validateToken(accessToken) 
  if (validate) {
   const data = jwt.verify(accessToken, JWT_SECRET) 
  return data;
  } else {
    throw new Error('Token is in blacklisted');
  }
}


module.exports = {
   generateToken,
   getDataFromToken,
  }
