var mysql = require('mysql')

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', //i know i shouldn't use root
  password: 'Password1!',
  database: 'IMDBDB'
})

connection.connect(function(err) {
  if (err) throw err
})