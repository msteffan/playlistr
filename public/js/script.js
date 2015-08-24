$(".currentArtist").on("click", function(){
    var artist = $(".currentArtist").html()
    $.getJSON("http://api.bandsintown.com/artists/"+artist+"/events.json?api_version=2.0&app_id=YOUR_APP_ID", function(response){
        console.log(response);
    })
})
