module.exports = {
    addr: process.env.NODE_ENV === 'production' ? 'db' : 'localhost',
    port: '27017'
};