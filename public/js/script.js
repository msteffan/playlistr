$(".currentArtist").on("click", function(){
    var artist = $(".currentArtist").html()
    $.getJSON("http://api.bandsintown.com/events/recommended?artists[]="+artist+"&location=use_geoip&format=json&app_id=YOUR_APP_ID", function(response){
        console.log(response);
    })
    $.getJSON("http://developer.echonest.com/api/v4/artist/news?api_key=6N51VGIQONFDX0AGP&name="+artist+"&format=json", function(response){
        console.log(response);
    })

})


//6N51VGIQONFDX0AGP
