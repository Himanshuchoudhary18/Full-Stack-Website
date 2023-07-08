let jwt = require('jsonwebtoken');
let Register = require('../models/registers');

let auth = async function (req, res, next) {
    try {
        let tokenss = req.cookies.jwt;
        let verifyuser = jwt.verify(tokenss, "mygreatparentsarealwaysgreatandiamtheirproudchildandwillbeaproudchildforthem");
        console.log(verifyuser);

        let validuser = await Register.findOne({_id:verifyuser._id})
        console.log(validuser);

        // req.token = token;
        // req.user = user;

        next();
    }
    catch (err) {
        res.send(err);
    }
}

module.exports = auth;