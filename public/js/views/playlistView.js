var PlaylistView = function(playlist){
  this.playlist = playlist;
  this.$el = $("<div class='playlist'></div>");
};



PlaylistView.prototype = {
    embedPlaylist: function(artistCode, songCount, playlistName){
        // $("iframe").remove()
        //debugger;
        $.getJSON("http://developer.echonest.com/api/v4/playlist/basic?api_key=6N51VGIQONFDX0AGP"+artistCode+"&format=json&results="+songCount+"&bucket=tracks&bucket=id:spotify", function(response){
            var tracks = [];
            for(i = 0;i < response.response.songs.length; i++){
                if (response.response.songs[i]["tracks"][0] === undefined) {
                  continue;
                }
                else {
                  var track = response.response.songs[i]["tracks"][0]["foreign_id"]
                  var newString = track.substr(14);
                  tracks.push(newString);
                }
              }
            var ids = tracks.join();
            console.log(playlistName);
            console.log($(".title").html());
            if($(".title").html() == playlistName){
                $(".playlist").append( '<iframe id="musicframe" src="https://embed.spotify.com/?uri=spotify:trackset:'+playlistName+':'+ids+'" frameborder="0" height="500" width="400" allowtransparency="true"></iframe>')
            }
            //$(".playlist").removeClass(playlistName)
        })
    },
    render: function(){
        var self = this;
        self.$el.html(self.playlistTemplate(self.playlist));
        $(".currentArtist").append(self.$el);
        var playlistName = this.playlist.title
        var thisPlaylist = $(".playlist").closest()
        $(thisPlaylist).addClass(playlistName)
        //
        // console.log(playlistNameString);
        var artist = this.playlist.artist.split(", ");
        var artistCode = "";
        for (j = 0; j < artist.length; j++) {
            artistCode += "&artist="+artist[j].split(' ').join('+')
        };
        var songCount = 15;
        this.embedPlaylist(artistCode, songCount, playlistName);
        console.log("rendered a playlist");

  },
  playlistTemplate: function(artist){
    var html = $("<h3 class='title'>" + this.playlist.title + "</h3>");
    // html.append("<img class='artist-photo' src='" + artist.photoUrl + "'>");
    // html.append("<button class='showSongs'>Show Songs</button>");
    //html.append("<div class='playlists'></div>");
    return(html);
  }
}
