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
    pagaddress : {
        type: String,
    },
    phone : {
        type: Number,
    },
    date : {
        type: String,
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
