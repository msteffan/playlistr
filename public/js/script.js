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
})

function getArtistBio(artist) {
  $.getJSON("http://developer.echonest.com/api/v4/artist/biographies?api_key=6N51VGIQONFDX0AGP&name="+artist+"&format=json&results=1&start=0&license=cc-by-sa", function(response){
  var artistBio = response.response.biographies[0]["text"];
  appendArtistBio(artistBio);
  })
}

function appendArtistBio(artistBio){
  $(".biography").html("");
  $(".biography").html('<div class="artistbio"><h1>Biography</h1><p>'+artistBio.substr(0, 200)+'...</p></div>')
}

function getTwitterHandle(artist){
  $.getJSON("http://developer.echonest.com/api/v4/artist/twitter?api_key=6N51VGIQONFDX0AGP&name=" + artist + "&format=json", function(response){
    currentArtistTwitter = response.response.artist.twitter;
    appendTwitterLink(currentArtistTwitter);
  });
}

function appendTwitterLink(artist){
  $(".tweets").html('<a href="http://www.twitter.com/'+artist+'">@'+artist+'</a>')
}

function getInstagramHandle(artist){
  $.getJSON("https://api.instagram.com/v1/users/search?q="+artist+"&client_id=e69bb07dfd304f7887ce690a6290ab62&callback=?", function(response){
    currentArtistInstagram = response["data"][0]["username"];
    appendInstagramLink(currentArtistInstagram);
  });
}

function appendInstagramLink(artist){
  $(".instagram").html('<a href="http://www.instagram.com/'+artist+'">IG</a>')
}

function getArtistNews(artist){
  $.getJSON("http://developer.echonest.com/api/v4/artist/news?api_key=6N51VGIQONFDX0AGP&name=" + artist + "&format=json&results=5&start=0", function(response){
    var news = [];
    for (i = 0; i < response.response.news.length; i ++){
      news.push(response.response.news[i])
      }
    appendArtistNews(news);
  })
}

function appendArtistNews(news){
  $(".news").children().remove();
  for (i = 0; i < news.length; i ++){
      $(".news").append('<div class="newsitem"><h1>News</h1><a href="'+news[i].url+'">'+news[i]["name"]+'</a><p>'+news[i]["summary"]+'</p><p>'+news[i]["date_found"]+'</p></div>')
    }
}

function getConcertInfo(artist) {
  $.getJSON("http://api.bandsintown.com/events/search?artists[]="+artist+"&location=use_geoip&radius=20&format=json&callback=?&app_id=YOUR_APP_ID", function(response){
  var events = [];
  for (i = 0; i < response.length; i ++){
    events.push(response[i])
  }
  appendConcertInfo(events);
  })
}

function appendConcertInfo(events){
  $(".concerts").children().remove();
  for (i = 0; i < events.length; i ++){
      $(".concerts").append('<div class="concert"><h1>Concerts</h1><a href="'+events[i].url+'">'+events[i].artists[0]["name"]+'</a><p>'+events[i].datetime+'</p><a href="'+events[i].venue["url"]+'">'+events[i].venue["name"]+'</a><p><a href="'+events[i].ticket_url+'">Tickets</a></p></div>')
    }
}

//event handler for right side button click; should display API information based on artist name input
$("#makeArtistInfo").on("click", function(){
  var artist = $(".getArtistInfo").val();
  var artistCode = artist.split(' ').join('+');
  getConcertInfo(artistCode);
  getArtistBio(artistCode);
  getTwitterHandle(artistCode);
  getInstagramHandle(artistCode);
  getArtistNews(artistCode);
});

$("#save").on("click", function(){
    var form = $(this).closest("form");
    // form.find("#artistInput").val();

    $.ajax({
        url: form.attr("action"),
        method: form.attr("method"),
        data: {
            artist: $("#artistInput").val(),
            title: $("#listName").val()
        }
    }).done(function(response){
        console.log("I worked", response);
    })
})
//
// $("#profile").on("click", function(){
//     User.fetch().then(function(users){
//    users.forEach(function(user){
//      var view = new UserView(user)
//      view.render();
//    })
//  })
// })
