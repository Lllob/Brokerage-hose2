const { Schema, model, Types: { ObjectId } } = require('mongoose');


const NAME_PATTAERN = /^[a-zA-Z-]+$/;
const EMAIL_PATTERN = /^([a-zA-Z]+)@([a-zA-Z]+)\.([a-zA-Z-]+)$/

const userSchema = new Schema({  
    username: { type: String, required: [true, 'Username is required'], minlength: [2, 'Userme must be at least 2 character long'], validate: {     
        validator(value) {
          return NAME_PATTAERN.test(value) 
        },
        message: 'Username may contain only english letters'
     } },
    //
    email: { type: String, required: [true, 'Email is required'], minlength: [2, 'Email must be at least 2 character long'], validate: {     
        validator(value) {
          return EMAIL_PATTERN.test(value)
        },
        message: 'Email may contain only english letters'
     } },
     //
    hashedPassword: { type: String, required: [true, 'Password is required'],  minlength: [2, 'Password must be at least 2 character long'] },
    basket: { type: [ObjectId], ref: 'Create', default: [] } //the purchased posts from the user
});


const User = model('User', userSchema);
User.createIndexes(); 

module.exports = User; 

/////////////////////
