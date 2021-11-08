const {Comment} = require('../models')
const sequelize = require('../config/connection');

const commentData = [{
    comment_text: "Lorem ipsum dolor sit amet",
    user_id: 1,
    post_id: 1
},
{
    comment_text: "consectetur adipiscing elit",
    user_id: 2,
    post_id: 2
},
{
    comment_text: "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    user_id: 3,
    post_id: 3
}
];

const seedDatabase = async (commentjson) => {
    await sequelize.sync({ force: true });

    await Comment.bulkCreate(commentjson);
  
    process.exit(0);
  };

seedDatabase(commentData);
