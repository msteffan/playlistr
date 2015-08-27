var PlaylistView = function(playlist){
  this.playlist = playlist;
  this.$el = $("<div class='column column-6 playlist'><div class='playlist module'</div></div>");
};


var counter=0;
PlaylistView.prototype = {
    // embedPlaylist: function(artistCode, songCount, playlistName){
    //     // $("iframe").remove()
    //     //debugger;
    //     $.getJSON("http://developer.echonest.com/api/v4/playlist/basic?api_key=6N51VGIQONFDX0AGP"+artistCode+"&format=json&results="+songCount+"&bucket=tracks&bucket=id:spotify", function(response){
    //         var tracks = [];
    //         for(i = 0;i < response.response.songs.length; i++){
    //             if (response.response.songs[i]["tracks"][0] === undefined) {
    //               continue;
    //             }
    //             else {
    //               var track = response.response.songs[i]["tracks"][0]["foreign_id"]
    //               var newString = track.substr(14);
    //               tracks.push(newString);
    //             }
    //           }
    //         var ids = tracks.join();
    //         // console.log(playlistName);
    //         // console.log($(".title").html());
    //         //if($(".title").hasClass(i)) {
    //         return ids
    //
    //         //}
    //     })
    //     return ids
    // },
    render: function(){
        var self = this;
        self.$el.html(self.playlistTemplate(self.playlist));
        $(".currentArtist").append(self.$el);

        //console.log("rendered a playlist");

  },
  playlistTemplate: function(artist){
    var html = $("<h3 class='"+counter+" title'>" + this.playlist.title + "</h3>");
    counter++
    var playlistName = this.playlist.title

    // console.log(playlistNameString);
    var artist = this.playlist.artist.split(", ");
    var artistCode = "";
    for (j = 0; j < artist.length; j++) {
        artistCode += "&artist="+artist[j].split(' ').join('+')
    };
    var songCount = 15;
    //this.embedPlaylist(artistCode, songCount, playlistName);
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
    console.log(counter);
    // html.append("<img class='artist-photo' src='" + artist.photoUrl + "'>");
    // html.append("<button class='showSongs'>Show Songs</button>");
    //html.append("<div class='playlists'></div>");
    return(html);
    })
    return(html)
    }
}
