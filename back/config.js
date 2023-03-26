const dotenv = require('dotenv')
const path = require('path')

dotenv.config({
  path: path.resolve(__dirname, `${process.env.NODE_ENV}.env`),
});

console.log('Mode active: ', process.env.NODE_ENV);

module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'dev',
  DATABASE: process.env.DATABASE || 'mongodb://127.0.0.1:27017/MyPersonalBot',
}  