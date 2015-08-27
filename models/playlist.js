module.exports = function(sequelize, Sequelize){
  return sequelize.define("playlist", {
    title: Sequelize.STRING,
    artist: Sequelize.STRING,
    songCount: Sequelize.INTEGER,
    userId: Sequelize.INTEGER
  });
}
