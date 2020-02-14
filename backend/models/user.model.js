const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    zipcode: { type: Number, required: true },
    userimage: {type: String }
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);
module.exports = User; 