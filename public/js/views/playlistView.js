var PlaylistView = function(playlist){
  this.playlist = playlist;
  this.$el = $("<div class='column column-6 playlist'><div class='playlist module'</div></div>");
};


var counter=0;
PlaylistView.prototype = {
  render: function(){
    var self = this;
    self.$el.html(self.playlistTemplate(self.playlist));
    $(".currentArtist").append(self.$el);
  },
  playlistTemplate: function(artist){
    var html = $("<h3 class='"+counter+" title'>" + this.playlist.title + "</h3>");
    counter++
    var playlistName = this.playlist.title
    var artist = this.playlist.artist.split(", ");
    var artistCode = "";
    for (j = 0; j < artist.length; j++) {
        artistCode += "&artist="+artist[j].split(' ').join('+')
    };
    //console.log(this.playlist.songCount);
    // ^^ that log currently returns undefined
    // need to make song count not hard coded
    var songCount = 15;
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
        html.append('<iframe id="musicframe" src="https://embed.spotify.com/?uri=spotify:trackset:'+playlistName+':'+ids+'" frameborder="0" height="500" width="400" allowtransparency="true"></iframe>')
        return(html);
    })
    return(html)
  }
}
