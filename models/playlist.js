module.exports = function(sequelize, Sequelize){
  return sequelize.define("playlist", {
    title: Sequelize.STRING,
    artist: Sequelize.STRING,
    userId: Sequelize.INTEGER
  });
}
