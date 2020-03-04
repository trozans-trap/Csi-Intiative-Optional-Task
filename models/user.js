const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    teamname:{
        type:String,
        unique: true
        
    },
    email:{
        type:String,
        unique: true
       
    },
    arr2:{
        type: [String],
    }
})

const Item = mongoose.model('teams', ItemSchema);
module.exports = Item;
