var express = require("express");
var app = express();
var path = require("path");
var bodyParser = require("body-parser");
var methodOverride = require('method-override');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use("/", express.static(path.join(__dirname + "/public")));
app.set("view engine", "hbs");

var usersController = require("./controllers/users");
var playlistsController = require("./controllers/playlists");

app.get("/", function(req, res){
  res.render("layout");
});

app.use("/", usersController);
app.use("/", playlistsController);
















app.listen(3000, function(){
  console.log("Listening on port 3000");
});
