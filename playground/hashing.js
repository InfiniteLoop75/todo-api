
const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
var password = '123abc!';

bcrypt.genSalt(10, (err, salt)=>{
    bcrypt.hash(password, salt, (err, hash)=>{
        console.log(hash);
    });
});
var hashedPassword = '$2a$10$0jYbSDchrYuZsq8OPDSbSeTxFKjlhlJAggru2gBppUpJYEphs2GBK';
bcrypt.compare(password, hashedPassword, (err, res)=>{
    console.log(res);
});
// var data = {
//     id: 10
// };
// var token = jwt.sign(data, '123abc');
// console.log(token);

// var decoded = jwt.verify(token, '123abc');
// console.log('decoded ', decoded);
