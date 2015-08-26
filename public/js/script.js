$("#makePlaylist").on("click", function(){
    $(".currentArtist").children().remove()
    var artist = $("#artistInput").val();
    var artist = artist.split(", ");
    var artistCode = "";
    for (i = 0; i < artist.length; i++) {
      artistCode += "&artist="+artist[i].split(' ').join('+')};
    var songCount = $("#songCount").val();
    $.getJSON("http://developer.echonest.com/api/v4/playlist/basic?api_key=6N51VGIQONFDX0AGP"+artistCode+"&format=json&results="+songCount+"&bucket=tracks&bucket=id:spotify", function(response){
        var tracks = [];
        for(i = 0;i < response.response.songs.length; i++){
            if (response.response.songs[i]["tracks"][0] === undefined) {
              continue;
            }
            else {
              console.log(response.response.songs[i]["tracks"][0]["foreign_id"])
              console.log(i)
              var track = response.response.songs[i]["tracks"][0]["foreign_id"]
              var newString = track.substr(14);
              tracks.push(newString);
            }
          }
        var ids = tracks.join();
        var playlistName = $("#listName").val();
        $(".currentArtist").append('<iframe id="musicframe" src="https://embed.spotify.com/?uri=spotify:trackset:'+playlistName+':'+ids+'" frameborder="0" height="500" width="400" allowtransparency="true"></iframe>')
    })
    var bandCode = "";
    for (i = 0; i < artist.length; i++) {
      bandCode += "&artists[]="+artist[i].split(' ').join('+')};
    bandCode = bandCode.substr(1);
    console.log(bandCode);
    $.getJSON("http://api.bandsintown.com/events/search?"+bandCode+"&location=use_geoip&radius=20&format=json&callback=?&app_id=YOUR_APP_ID", function(response){
      console.log(response);
      console.log(response[0]);
      var events = [];
      for (i = 0; i < response.length; i ++)
        {events.push(response[i])}
        console.log(events[0].artists[0]["name"])
    for (i = 0; i <events.length; i ++)
      {
        $(".currentArtist").append('<div class="concert"><h1>Concerts</h1><a href="'+events[i].url+'">'+events[i].artists[0]["name"]+'</a><p>'+events[i].datetime+'</p><a href="'+events[i].venue["url"]+'">'+events[i].venue["name"]+'</a><p><a href="'+events[i].ticket_url+'">Tickets</a></p></div>')
      }
    })

    //get request to echonest api for artist twitter handle; need to make dynamic for actual current artist, right now refs hardcoded "Chromeo"
    var currentArtist = "Chromeo";
    $.getJSON("http://developer.echonest.com/api/v4/artist/twitter?api_key=6N51VGIQONFDX0AGP&name=" + currentArtist + "&format=json", function(response){
      console.log(response);
      currentArtistTwitter = response.response.artist.twitter;
      console.log(currentArtistTwitter);
    })

})
