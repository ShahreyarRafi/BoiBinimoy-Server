const { Schema, model} = require('mongoose');

const UsersSchema = new Schema({
    name : {
        type: String,
        required: true,
    },
    email : {
        type: String,
        required: true,
    },
    image : {
        type: String,
    },
    address : {
        type: Array,
    },
    phone : {
        type: Number,
    },
    date : {
        type: String,
    },
    isAdmin : {
        type: Boolean,
    },
    isModarator : {
        type: Boolean,
    },
    isBan : {
        type: Boolean,
    },
    role : {
        type: Array
    },
    interest : {
        type: Array
    },

});

const Users = model('Users', UsersSchema);
module.exports = Users;
