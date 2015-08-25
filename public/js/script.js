
$("#makePlaylist").on("click", function(){
    $(".currentArtist").children().remove()
    var artist = $("#artistInput").val()
    $.getJSON("http://developer.echonest.com/api/v4/playlist/basic?api_key=6N51VGIQONFDX0AGP&artist="+artist+"&format=json&results=20&bucket=tracks&bucket=id:spotify", function(response){
        tracks = [];
        for(i=0;i < response.response.songs.length; i++){
            var track = response.response.songs[i]["tracks"][0]["foreign_id"]
            var newString = track.substr(14);
            tracks.push(newString);
        }
        var ids = tracks.join()

        $(".currentArtist").append('<iframe id="iframe" src="https://embed.spotify.com/?uri=spotify:trackset:PREFEREDTITLE:'+ids+'" frameborder="0" height="800" width="400" allowtransparency="true"></iframe>')
        //getArtist();

    })



})

// $(“#iframe").contents().find(“.artist-name-ellipsis")
function getArtist(){
    $(".artist-name").change(function(){
        var artist = $(".artist-name").html()
        $.getJSON("http://api.bandsintown.com/events/recommended?artists[]="+artist+"&location=use_geoip&format=json&app_id=YOUR_APP_ID", function(response){
            console.log(response);
        })
        $.getJSON("http://developer.echonest.com/api/v4/artist/news?api_key=6N51VGIQONFDX0AGP&name="+artist+"&format=json", function(response){
            console.log(response);
        })

    })
}


//   http://developer.echonest.com/api/v4/playlist/basic?api_key=6N51VGIQONFDX0AGP&artist="+artist+"&format=json&results=20&type=artist-radio&bucket=tracks&bucket=id:spotify"
//6N51VGIQONFDX0AGP
