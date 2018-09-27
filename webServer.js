const express = require('express');
const app = express();
const path = require('path');
//const xmlparser = require("express-xml-bodyparser");
const sqlite3 = require("sqlite3").verbose();
const bodyparser = require("body-parser");
const cors = require("cors");

const db = new sqlite3.Database("./test.db");

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use( express.static(__dirname + '/public'));
app.use( express.static(__dirname + '/views'));


app.post('/api', function(req, res) {
  console.log("JA");
  user.add(db, req, res);
  
}); // app.post

app.get('/api', function(req, res) {
  console.log("NEI");
  user.get(db, req, res);

});

app
  .get( '/index.html', function( req, res ) {
    res.sendFile( path.join( __dirname, 'views', 'index.html' ));
  
  });

  app
  .get( '/admin.html', function( req, res ) {
    res.sendFile( path.join( __dirname, 'views', 'admin.html' ));
  
  });
  
  

app.listen(8888, () => console.log("Example app listening on port 8888!"));

var user = {};
user.add = function(db, req, res) {
  db.serialize(function() {
    try {
      db.all(
        "Select username FROM users where username = '" +
          req.body.username +
          "';",

        function(err, row) {
         

          if (row[0] == undefined) {
            var stmt = db.prepare("INSERT INTO users values(?,?,?)");
           

            stmt.run(req.body.username, req.body.email, req.body.password);

            stmt.finalize();
            res.status(200);
            res.send("User " + req.body.username + " is added");
          } else if (row[0] != undefined) {
            res.status(400);
            res.send("User " + req.body.username + " exists");
          } else {
            res.status(401);
            res.send("Something went wrong");
          }
        }
      );
    } catch (e) {
      console.log(e.toString());
      res.status(400);
      res.send(e.toString());
    }
  }); // serialize end
}; // user.add

user.get = function(db, req, res) {
  //Henter ut ID og Passordhash basert på brukerID parameter

  db.serialize(function() {
    db.all("SELECT * FROM users;", function(err, row) {
      if (row == undefined) {
        res.status(201);
        res.send("No users found");
      } else {
        row.forEach(row => {
          res.write(
            '{"username": "' +
              row.username +
              '", "email": "' +
              row.email +
              '", "password": "' +
              row.password +
              '"}' +
              "\n"
          );
        });

        res.status(200);
        res.end();
      }
    });
  });
}; // user.get

/**
 * statusRespons benyttes for å genererer en XML status melding
 * @param  {String} element    Navn på elementet statusmeldingen gjelder for (eks bruker, dikt)
 * @param  {Integer} statuskode Statuskode: 0: OK, 1: Finnes allerede, 2: innkommende XML er tom
 * @param  {String} statusmsg  Beskrivelse av hendelsen
 * @return {String} XML formatert status melding.
 */