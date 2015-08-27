var UserView = function(user){
  this.user = user;
  this.$el = $("<div class='user'></div>");
};
//
// User.fetch = function(){
//   // saving the ajax request to a local variable
//   var request = $.getJSON("http://localhost:3000/users")
//   // the promise function on a successful ajax call.
//   .then(function(response) {
//     // local variable in the promise callback instantiated as an empty array
//     var artists = []
//     // loop over each element in the response
//     for(var i = 0; i < response.length; i++){
//       // create a new JS Artist object for each element in the response
//       users.push(new User(response[i]))
//     }
//     // returns artists in the promise so that it can be passed in as an argument to future promises
//     return users
//     })
//   .fail(function(response){
//       console.log("users fetch fail")
//     })
//   // explicit return of the fetch function that returns the json request with artists available an argument for future promises
//   return request
// }
//
// UserView.prototype = {
//   appendPlaylists: function(playlists, playlistDiv){
//     playlists.forEach(function(playlist){
//       var playlistView = new PlaylistView(playlist);
//       playlistDiv.append(playlistView.render());
//     });
//   },
//   render: function(){
//     var self = this;
//
//     self.$el.html(self.userTemplate(self.user));
//     $(".users").append(self.$el);
//   },
//   userTemplate: function(user){
//     var html = $("<div>");
//     html.append("<h3>" + user.spotifyId + "</h3>");
//     // html.append("<button class='showSongs'>Show Songs</button>");
//     html.append("<div class='user'></div>");
//     return(html);
//   }
// };
