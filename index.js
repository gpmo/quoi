var cool = require('cool-ascii-faces');
var express = require('express');
var app = express();
const { Client } = require('pg')

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index')
});

app.get('/cool', function(request, response) {
  response.send(cool());
});

app.get('/db', function (request, response) {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  client.connect();
  client.query('SELECT NOW()', (err, res) => {
    console.log(err, res)
    client.end()
  });
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
