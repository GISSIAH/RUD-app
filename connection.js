var {Pool,Client} = require('pg');

var pool = new Pool({
user:'postgres',
host:'localhost',
database:'postgres',
password:'DizzyAttic',
port:5432

});

module.exports = pool;
