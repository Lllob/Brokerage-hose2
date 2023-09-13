const { Schema, model, Types: { ObjectId } } = require('mongoose');

const createSchema = new Schema({
   //_id: { type: ObjectId, required: true, ref: 'Create' }, 
   title: { type: String, minlength: [2, 'Title must be at least 2 character long'] },
   imageUrl: { type: String,  required: [true, 'Image url is required'], validate: [/^https?:\/\//i, 'Image must be a valid URL'] },
   description: { type: String, minlength: [4, 'Description must be at least 4 character long'] },
   price: { type: Number, required: true, min: [2, 'Price must be at least 2'], validate: [/\d+/, 'Price must be a number'] },
   type: { type: String, required: true, enum: ["Apartment", "Doubleroom", "Singleroom", "Other"] },
   owner: { type: ObjectId, ref: 'User' },
   boughtBy: { type: [ObjectId], ref: 'User', default: [] },  //a collection of users bought, with reference to the User.js model
   likes: { type: [ObjectId], ref: 'User', default: [] } 
});


const Create = model('CreateRealEA', createSchema)
Create.createIndexes();
               
module.exports = Create; 
