'use strict';

const generateRandomString = ((length) => {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for( let char = 0; char < length; char++ ) {
        result += chars[Math.floor(Math.random()*chars.length)];
    }
    return result;
})

const isValidUrl = ((url) => {
    try{
        new URL(url);
        return true;
    } catch( err ){
        console.log(err.stack);
        return false;
    }
});

module.exports = {generateRandomString,isValidUrl};