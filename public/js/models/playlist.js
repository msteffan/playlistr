var Playlist = function(info){
  this.title = info.title;
  this.userId = info.userId;
  this.artist = info.artist;
  this.songCount = info.songCount
}

Playlist.fetch = function(){
  var request = $.ajax({
          url: "http://127.0.0.1:3000/playlists",
          method: "get"
      })
  .then(function(response) {
    var playlists = []
    for(var i = 0; i < response.length; i++){
      playlists.push(new Playlist(response[i]))
    }
    console.log(playlists);
    return playlists
    })
  .fail(function(response){
      console.log("js failed to load")
    })
  return request
}
