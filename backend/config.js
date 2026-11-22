const config = {
    db: 'mongodb://localhost:27017/tpratico',
    secret: 'supersecret',
    expiresPassword: 86400, // expires in 24hours
    saltRounds: 10
 }
 
 module.exports = config;