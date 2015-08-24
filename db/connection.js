var Sequelize = require("sequelize");
var sequelize = new Sequelize("postgres:///playlistr_db");
//required for local linux testing
//var sequelize = new Sequelize('postgres://sequelize_user:sequelize_password@localhost:5432/playlistr_db');
var User = sequelize.import("../models/user");
var Playlist = sequelize.import("../models/playlist");

Playlist.belongsTo(User);
User.hasMany(Playlist);

module.exports = {
  Sequelize: Sequelize,
  sequelize: sequelize,
  models: {
    User: User,
    Playlist: Playlist
  }
}
