module.exports = {
    addr: process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test' ? 'db' : 'localhost',
    port: '27017'
};