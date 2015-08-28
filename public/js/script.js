// left side of the app functionality

// the user inputs values and clicks make a playlist
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

// this generates a spotify iframe using the echonest basic playlist api and spotify song ids
function makePlaylist(artistCode, songCount, playlistName){
    $("iframe").remove();
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

//this allows a user to save a created playlist in his/her account in our database
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

// under user profile, a user can view all of his/her playlists after clicking show button
$("#showLists").on("click",function(){
    Playlist.fetch()
    .then(function(playlists){
      playlists.forEach(function(playlist){
        var view = new PlaylistView(playlist)
        view.render();
     })
   })
});

// right side of the app functionality

// event handler for right side button click; should display API information based on artist name input
$("#makeArtistInfo").on("click", function(){
  var artist = $(".getArtistInfo").val();
  var artistCode = artist.split(' ').join('+');
  getTwitterHandle(artistCode);
  getInstagramHandle(artistCode);
  getArtistBio(artistCode);
  getConcertInfo(artistCode);
  getArtistNews(artistCode);
});

// retrieving the artist's official twitter handle from the echonest api
function getTwitterHandle(artist){
  $.getJSON("https://developer.echonest.com/api/v4/artist/twitter?api_key=6N51VGIQONFDX0AGP&name=" + artist + "&format=json", function(response){
    currentArtistTwitter = response.response.artist.twitter;
    // only display the twitter icon if echonest lists a twitter handle
    if (currentArtistTwitter !== undefined){
    appendTwitterLink(currentArtistTwitter);
    }
  });
}

// display the twitter logo link to the artist's twitter
function appendTwitterLink(artist){
  $(".tweets").html('<a href="http://www.twitter.com/'+artist+'"><img src="../img/twitterLogo.jpg" alt="Twitter Link" height="42" width="42"></a>')
}

// get the artist's instagram handle from the instagram api
function getInstagramHandle(artist){
  $.getJSON("https://api.instagram.com/v1/users/search?q="+artist+"&client_id=e69bb07dfd304f7887ce690a6290ab62&callback=?", function(response){
    // the first result from the json request is most likely
    currentArtistInstagram = response["data"][0]["username"];
    console.log(currentArtistInstagram);
    appendInstagramLink(currentArtistInstagram);
  });
}

// display the instagram logo link to the artist's instagram
function appendInstagramLink(artist){
  $(".instagram").html('<a href="http://www.instagram.com/'+artist+'"><img src="../img/instagramLogo.gif" alt="Twitter Link" height="42" width="42"></a>')
}

// get the artist's bio from the echonest api
function getArtistBio(artist) {
  $.getJSON("https://developer.echonest.com/api/v4/artist/biographies?api_key=6N51VGIQONFDX0AGP&name="+artist+"&format=json&results=1&start=0&license=cc-by-sa", function(response){
  var artistBio = response.response.biographies[0]["text"];
  appendArtistBio(artistBio);
  })
}

// display the artist bio in the .biography div
function appendArtistBio(artistBio){
  $(".biography").html("");
  $(".biographyTitle").html("<h1>Bio -</h1>");
  $(".biography").html('<div class="artistbio"><p>'+artistBio.substr(0,250)+' ...</p></div>');
  // the bio displays a 250-character preview in the default view
  $(".biography").css("display", "block");
}

// get recent artist news from the echonest api
function getArtistNews(artist){
  $.getJSON("https://developer.echonest.com/api/v4/artist/news?api_key=6N51VGIQONFDX0AGP&name=" + artist + "&format=json&results=5&start=0", function(response){
    var news = [];
    for (i = 0; i < response.response.news.length; i ++){
      news.push(response.response.news[i])
      }
    appendArtistNews(news);
  })
}

// convertDate and convertTime give us legible date & time info from the datetime echonest value
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

// for each of the 5 artist news pieces, we append the title, link and date posted
function appendArtistNews(news){
  $(".news").children().remove();
  $(".newsTitle").html("<h1>News +</h1>");
  for (i = 0; i < news.length; i ++){
    var html = $(".news");
      html.append()
      $(".news").append('<div class="newsitem"><a target="_blank" href="'+news[i].url+'">'+news[i]["name"]+'</a><p>'+convertDate(news[i]["date_found"])+'</p></div>')
    }
    // default view only shows the News header - readers can expand by clicking
    $(".news").css("display", "none");
}

// get local concert info for the artist from bandsintown api
function getConcertInfo(artist) {
  $.getJSON("https://api.bandsintown.com/events/search?artists[]="+artist+"&location=use_geoip&radius=20&format=json&callback=?&app_id=YOUR_APP_ID", function(response){
  var events = [];
  for (i = 0; i < response.length; i ++){
    events.push(response[i])
  }
  appendConcertInfo(events);
  })
}

// display concert info, including link to event, venue and ticket purchase link
function appendConcertInfo(events){
  $(".concerts").children().remove();
  $(".concertsTitle").html("<h1>Concerts +</h1>");
  for (i = 0; i < events.length; i ++){
        $(".concerts").append('<div class="concert"><a target="_blank" href="'+events[i].url+'">'+events[i].artists[0]["name"]+'</a><p>'+convertDate(events[i].datetime)+' '+convertTime(events[i].datetime)+'</p><a target="_blank" href="'+events[i].venue["url"]+'">'+events[i].venue["name"]+'</a><p><a target="_blank" href="'+events[i].ticket_url+'">Tickets</a></p></div>')
    }
  $(".concerts").css("display", "none");
  otherConcertSearch();
}

// function called above - append field for user to search for concerts in other city/state than local
function otherConcertSearch(){
  $(".concerts").append("<input type='text' name='name' placeholder='City, State' class='otherLocation'>");
  $(".concerts").append("<input type='button' name='name' value='Search' id='findOtherConcerts'>");
  $("#findOtherConcerts").on("click", function(){
  var location = $(".otherLocation").val();
  getOtherConcerts(location);
  })
}

// convert city/state user input into usable string for bandsintown api request
function getLocationCode(place){
  place = place.replace(" ", "+");
  place = place.replace(",+", ",");
  return place;
}

// run bandsintown api request based on location for concerts in other areas
function getOtherConcerts(location) {
  var artist = $(".getArtistInfo").val();
  var locationCode = getLocationCode(location);
  $.getJSON("https://api.bandsintown.com/events/search?artists[]="+artist+"&location="+locationCode+"&radius=20&format=json&callback=?&app_id=YOUR_APP_ID", function(response){
  var events = [];
  for (i = 0; i < response.length; i ++){
    events.push(response[i])
  }
  appendOtherConcerts(events);
  })
}

// remove local concerts or other concerts listed - display concerts for new location search
function appendOtherConcerts(events){
  $(".concerts").children().remove();
  $(".concertsTitle").html("<h1>Concerts -</h1>");
  for (i = 0; i < events.length; i ++){
        $(".concerts").append('<div class="concert"><a target="_blank" href="'+events[i].url+'">'+events[i].artists[0]["name"]+'</a><p>'+convertDate(events[i].datetime)+' '+convertTime(events[i].datetime)+'</p><a target="_blank" href="'+events[i].venue["url"]+'">'+events[i].venue["name"]+'</a><p><a target="_blank" href="'+events[i].ticket_url+'">Tickets</a></p></div>')
    }
  $(".concerts").css("display", "block");
  // user still has option to search another location
  otherConcertSearch();
}

// accordion display functions for bio, concerts and news
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

// enter submit functionality for right side search
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

$('.otherLocation').keypress(function(e) {
    if(e.which == 13) {
        jQuery(this).blur();
        jQuery('#findOtherConcerts').focus().click();
    }
});
