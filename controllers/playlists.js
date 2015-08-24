
var express = require("express");
var router = express.Router();
var Playlist = require("../db/connection").models.Playlist;

function error(res, req){
  response.status(500);
  response.json({error: message})
}

//GET a user's playlists
router.get("/:userId/playlists", function(req, res){
  User.findById(req.params.userId).then(function(user){
    res.json(user.getPlaylists());
  });
});

//POST to playlists
router.post("/playlists", function(req, res){
  Playlist.create(req.body).then(function(playlist){
    res.json(playlist);
    });
  });

//GET specific playlist
router.get("/playlists/:id", function(req, res){
  Playlist.findById(req.params.id).then(function(playlist){
    if(!playlist) return error(res, "not found");
    res.json(playlist);
  });
});

//DELETE specific playlist
router.delete("/playlists/:id", function(req, res){
  Playlist.findById(req.params.id).then(function(playlist){
    if(!playlist) return error(res, "not found");
    Playlist.destroy().then(function(){
      res.json({success: true});
    });
  });
});

module.exports = router;
