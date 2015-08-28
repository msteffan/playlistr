# Welcome to Playlistr!

Playlistr is an app that lets you generate Spotify playlists based on artists' names; save those playlists to your Playlistr profile; and learn more about artists, including social media links, bio, concerts, and more. 

# Installation Instructions

Route 1: open http://theplaylistr.herokuapp.com! Login using your spotify account, and then start building some playlists!

Route 2: clone this repository from Github; run ``npm install `` in your repository to install and initialize your node dependencies; create a file called ` env.js ` and add your Spotify API Key to it; run `nodemon app.js ` and visit http://localhost:3000 in your browser.

# Approach

There are a lot of (really good) music apps out there, and we wanted to build something unique. The idea for Playlistr emerged as we explored the Echonest API; we noticed that it would generate playlists of related artists/genres based on just a single input, and this ultimately became the core functionality of the app. 

To build Playlistr as an Express app, we broke the project down into client-side and server-side steps. First, we created the app.js file and built our server routes; following that, we focused on rendering the information from our third-party APIs on  client-side using AJAX. Once we had the information in our views, we returned to the problem of persisting information to the database and built out the server routes (and corresponding models/views on the client side) to meet that need.

# Hurdles

1. Embedding with Spotify — turns out, this is really annoying, because Spotify doesn't allow embedded players to actually play the music.
2. Getting the passport-spotify package to work, in order to allow users to authenticate via Spotify
3. Express: All of it.
4. Deploying to Heroku with a node app

# Unsolved Problems

I'm sure there are some.
