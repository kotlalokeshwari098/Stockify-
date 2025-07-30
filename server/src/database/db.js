
const {Pool}= require('pg')
require('dotenv').config();

const pool=new Pool({
    host:process.env.HOSTNAME,
   user:process.env.USERNAME_DB,
   port:process.env.PORT_NUMBER,
   password:process.env.PASSWORD,
   database:process.env.DATABASE_NAME

})

module.exports=pool;