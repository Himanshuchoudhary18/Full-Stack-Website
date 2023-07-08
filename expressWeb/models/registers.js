let mongoose = require('mongoose');
let jwt = require('jsonwebtoken');

let UserSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    password:{
        required: true,
        type: String,
    },
    Age: {
        required: true,
        type: Number
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

// This will create a token for the login  and registering user whenever they try to login/register they will get a token with their data which will everytime store in DataBase
UserSchema.methods.generateAuthToken = async function () {
    try {
        console.log(this._id);
        let token = jwt.sign({ _id: this._id.toString() }, "mygreatparentsarealwaysgreatandiamtheirproudchildandwillbeaproudchildforthem");
        this.tokens = this.tokens.concat({ token: token })
        await this.save();
        return token;
    } catch (error) {
        // res.send(error);
        console.log(error);
    }
}


let Registration = new mongoose.model('Registration', UserSchema);
module.exports = Registration;