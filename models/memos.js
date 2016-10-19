'use strict';
module.exports = function(sequelize, DataTypes) {
  var Memos = sequelize.define('Memos', {
    content: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Memos;
};