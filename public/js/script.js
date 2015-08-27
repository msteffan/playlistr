$("#makePlaylist").on("click", function(){

    var artist = $("#artistInput").val();
    var artist = artist.split(", ");
    var artistCode = "";
    for (i = 0; i < artist.length; i++) {
      artistCode += "&artist="+artist[i].split(' ').join('+')};
    var songCount = $("#songCount").val();
    var playlistName = $("#listName").val();
    makePlaylist(artistCode, songCount, playlistName);
})

function makePlaylist(artistCode, songCount, playlistName){
    $("iframe").remove()
    $.getJSON("https://developer.echonest.com/api/v4/playlist/basic?api_key=6N51VGIQONFDX0AGP"+artistCode+"&format=json&results="+songCount+"&bucket=tracks&bucket=id:spotify", function(response){
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
        $(".currentArtist").append('<iframe id="musicframe" src="https://embed.spotify.com/?uri=spotify:trackset:'+playlistName+':'+ids+'" frameborder="0" height="500" width="400" allowtransparency="true"></iframe>')
    })
}

function getArtistBio(artist) {
  $.getJSON("https://developer.echonest.com/api/v4/artist/biographies?api_key=6N51VGIQONFDX0AGP&name="+artist+"&format=json&results=1&start=0&license=cc-by-sa", function(response){
  var artistBio = response.response.biographies[0]["text"];
  appendArtistBio(artistBio);
  })
}

function appendArtistBio(artistBio){
  $(".biography").html("");
  $(".biographyTitle").html("<h1>Bio -</h1>");
  $(".biography").html('<div class="artistbio"><p>'+artistBio.substr(0,250)+' ...</p></div>');
  $(".biography").css("display", "block");
}

function getTwitterHandle(artist){
  $.getJSON("https://developer.echonest.com/api/v4/artist/twitter?api_key=6N51VGIQONFDX0AGP&name=" + artist + "&format=json", function(response){
    currentArtistTwitter = response.response.artist.twitter;
    if (currentArtistTwitter !== undefined){
    appendTwitterLink(currentArtistTwitter);
  }
  });
}

function appendTwitterLink(artist){
  $(".tweets").html('<a href="http://www.twitter.com/'+artist+'"><img src="../img/twitterLogo.jpg" alt="Twitter Link" height="42" width="42"></a>')
}

function getInstagramHandle(artist){
  $.getJSON("https://api.instagram.com/v1/users/search?q="+artist+"&client_id=e69bb07dfd304f7887ce690a6290ab62&callback=?", function(response){
    currentArtistInstagram = response["data"][0]["username"];
    console.log(currentArtistInstagram);
    appendInstagramLink(currentArtistInstagram);
  });
}

function appendInstagramLink(artist){
  $(".instagram").html('<a href="http://www.instagram.com/'+artist+'"><img src="../img/instagramLogo.gif" alt="Twitter Link" height="42" width="42"></a>')
}

function getArtistNews(artist){
  $.getJSON("https://developer.echonest.com/api/v4/artist/news?api_key=6N51VGIQONFDX0AGP&name=" + artist + "&format=json&results=5&start=0", function(response){
    var news = [];
    for (i = 0; i < response.response.news.length; i ++){
      news.push(response.response.news[i])
      }
    appendArtistNews(news);
  })
}

function convertDate(date){
  var months = ["test", "January", "February", "March", "April", "May", "June",
               "July", "August", "September", "October", "November", "December" ];
  var monthNumber = parseInt(date.substr(5,2));
  var month = months[monthNumber];
  var day = parseInt(date.substr(8,2));
  var year = date.substr(0,4);
  return month + " " + day + ", " + year;
}

function convertTime(date){
  var newHour = date.substr(11,2);
  console.log(newHour);
  var amPm = "A.M";
  if (parseInt(newHour) > 12)
  {
    var newHour = newHour - 12;
    var amPm = "P.M.";
  }
  return newHour + date.substr(13,3) + " " + amPm;
}

function appendArtistNews(news){
  $(".news").children().remove();
  $(".newsTitle").html("<h1>News +</h1>");
  for (i = 0; i < news.length; i ++){
    $(".newsTitle").html("<h1>News +</h1>");
    var html = $(".news");
      html.append()
      $(".news").append('<div class="newsitem"><a target="_blank" href="'+news[i].url+'">'+news[i]["name"]+'</a><p>'+convertDate(news[i]["date_found"])+'</p></div>')
    }
    $(".news").css("display", "none");

}

function getConcertInfo(artist) {
  $.getJSON("https://api.bandsintown.com/events/search?artists[]="+artist+"&location=use_geoip&radius=20&format=json&callback=?&app_id=YOUR_APP_ID", function(response){
  var events = [];
  for (i = 0; i < response.length; i ++){
    events.push(response[i])
  }
  appendConcertInfo(events);
  })
}

function appendConcertInfo(events){
  $(".concerts").children().remove();
  $(".concertsTitle").html("<h1>Concerts +</h1>");
  for (i = 0; i < events.length; i ++){
        $(".concerts").append('<div class="concert"><a target="_blank" href="'+events[i].url+'">'+events[i].artists[0]["name"]+'</a><p>'+convertDate(events[i].datetime)+' '+convertTime(events[i].datetime)+'</p><a target="_blank" href="'+events[i].venue["url"]+'">'+events[i].venue["name"]+'</a><p><a target="_blank" href="'+events[i].ticket_url+'">Tickets</a></p></div>')
    }
    $(".concerts").css("display", "none");
}

function convertDate(date){
  var months = ["test", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
  var monthNumber = parseInt(date.substr(5,2));
  var month = months[monthNumber];
  var day = parseInt(date.substr(8,2));
  var year = date.substr(0,4);
  return month + " " + day + ", " + year;
}

function convertTime(date){
  var newHour = date.substr(11,2);
  console.log(newHour);
  var amPm = "A.M";
  if (parseInt(newHour) > 12)
  {
    var newHour = newHour - 12;
    var amPm = "P.M.";
  }
  return newHour + date.substr(13,3) + " " + amPm;
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
            title: $("#listName").val(),
            songCount: $("#songCount").val()
        }
    }).done(function(response){
        console.log("I worked", response);
    })
})

$("#showLists").on("click",function(){
    Playlist.fetch()
    .then(function(playlists){
      playlists.forEach(function(playlist){
        var view = new PlaylistView(playlist)
        view.render();

     })
   })
});

//==================================accordian function
$('.biographyTitle').on('click', function (){
  $('.biography').toggle(1000);
  if ($(".biographyTitle h1").html() == "Bio -") {
    $(".biographyTitle h1").html("Bio +")
    }
  else {
    $(".biographyTitle h1").html("Bio -")
  }
});

$('.newsTitle').on('click', function (){
  $('.news').toggle(1000);
  if ($(".newsTitle h1").html() == "News -") {
    $(".newsTitle h1").html("News +")
    }
  else {
    $(".newsTitle h1").html("News -")
  }
});

$('.concertsTitle').on('click', function (){
  $('.concerts').toggle(1000);
  if ($(".concertsTitle h1").html() == "Concerts -") {
    $(".concertsTitle h1").html("Concerts +")
    }
  else {
    $(".concertsTitle h1").html("Concerts -")
  }
});

//=================================Enter submits
$('.getArtistInfo').keypress(function(e) {
        if(e.which == 13) {
            jQuery(this).blur();
            jQuery('#makeArtistInfo').focus().click();
        }
    });

    $('#artistInput').keypress(function(e) {
        if(e.which == 13) {
            jQuery(this).blur();
            jQuery('#makePlaylist').focus().click();
        }
    });

    $('#listName').keypress(function(e) {
        if(e.which == 13) {
            jQuery(this).blur();
            jQuery('#makePlaylist').focus().click();
        }
    });

    $('#songCount').keypress(function(e) {
        if(e.which == 13) {
            jQuery(this).blur();
            jQuery('#makePlaylist').focus().click();
        }
    });
