var Playlist = function(info){
  this.title = info.title;
  this.userId = info.userId;
  this.artist = info.artist;
  this.songCount = info.songCount
}

Playlist.fetch = function(){
  var request = $.ajax({
          url: "https://theplaylistr.herokuapp.com/playlists",
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

Playlist.prototype = {
    update: function(artistData) {
      var self = this;

      var url = "https://theplaylistr.herokuapp.com/playlists/" + this.id;
      var request = $.ajax({
        url: url,
        method: "patch",
        data: JSON.stringify(playlistData),
        contentType : 'application/json'
      }).then(
        function(updatedPlaylistInfo) {self.reload(updatedPlaylistInfo);}
      );
      return request;
    },
    destroy: function() {
      var url = "https://theplaylistr.herokuapp.com/artists/" + this.id;
      var request = $.ajax( {url: url, method: "delete"} );
      return request;
    },
    reload: function(newData){
      for(var attrname in newData) {
        this[attrname] = newData[attrname];
      }
    }

}
