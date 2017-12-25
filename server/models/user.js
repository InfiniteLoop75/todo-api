const _ = require('lodash');
const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
var UserSchema = new mongoose.Schema({
        email: {
            type: String,
            required: true,
            trim: true,
            minglength: 1,
            unique: true,
            validate: {
                validator:  validator.isEmail,
                message: '{VALUE} is not a valid email'
            }
        },
        password: {
            type: String,
            require: true,
            minlength: 7
        },
        tokens: [{
            access: {
                type: String,
                required: true
            },
            token: {
                type: String,
                required: true
            }
        }]
    });

    UserSchema.methods.toJSON = function () {
        var user = this;
        var userObj = user.toObject();
        return _.pick(userObj, ['_id', 'email'])
    };
    UserSchema.methods.generateAuthToken = function () {
        var user = this;
        var access = 'auth';
        var token = jwt.sign({_id: user._id.toHexString(), access}, 'ibrokhimjon').toString();
        user.tokens.push({access, token});
        return user.save().then(()=>{
            return token;
        });
    };

var User = mongoose.model('User', UserSchema);
module.exports = {User}