
var express = require("express");
var router = express.Router();
var Playlist = require("../db/connection").models.Playlist;
var User = require("../db/connection").models.User;

function error(res, req){
  response.status(500);
  response.json({error: message})
}

//GET a user's playlists
router.get("/playlists", function(req, res){
  User.findOne({ where: {spotifyId: req.session.profile.id}})
  .then(function(user){
    Playlist.findAll({where: {userId: user.id}})
    .then(function(playlists, err){
        //console.log("I worked", playlists);
        res.json(playlists);
        console.log(err);
    })

  });
});

//POST to playlists
router.post("/playlists", function(req, res){
    User.findOne({ where: {spotifyId: req.session.profile.id }}).then(function(user){
        var playlist = {
            title: req.body.title,
            artist: req.body.artist,
            songCount: req.body.songCount,
            userId: user.id
        };
      Playlist.create(playlist).then(function(playlist, err){
        res.json(playlist);
        console.log(err);
        });
    })

  });

//patch specific playlist
router.patch("/playlists/:id", function(req, res){
  Playlist.findById(req.params.id).then(function(playlist){
    if(!playlist) return error(res, "not found");
    playlist.updateAttributes(req.body).then(function(updatedPlaylist){
      res.json(updatedPlaylist);
    });
  });
});

//DELETE specific playlist
router.delete("/playlists/:id", function(req, res){
  Playlist.findById(req.params.id).then(function(playlist){
    if(!playlist) return error(res, "not found");
    playlist.destroy().then(function(){
      res.json({success: true});
    });
  });
});

module.exports = router;
