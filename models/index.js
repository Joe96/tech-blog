const User = require('./User');
const Comment = require('./Comment');

User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
  foreignKey: 'comment_id',
  onDelete: 'CASCADE'
});



module.exports = {User, Comment};