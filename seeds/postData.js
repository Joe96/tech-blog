const {Post, User,Comment} = require('../models')
const commentData = require('./commentData.json')
const userData = require('./userData.json')
const sequelize = require('../config/connection');

const postData = [
    {
        title: 'Fablehaven',
        content: "What language should I learn first?",
        user_id: 1,
    },
    {
        title: 'Where The Red Fern Grows',
        content:"What language should I learn first?",
        user_id: 1,

    },
    {
        title: 'Digital Fortress',
        content: "What language should I learn first?",
        user_id: 1,

    },
    {
        title: "The Hitchhiker's Guide to the Galaxy",
        content: "What language should I learn first?",
        user_id: 1,
        
    },
    {
        title: 'Mechanical Harry',
        content: "What language should I learn first?",
        user_id: 1,

    },
    {
        title: 'To Kill A Mockingbird',
        content: "What language should I learn first?",
        user_id: 1,

    },
]; 

const seedDatabase = async () => {
    await sequelize.sync({ force: true });
    await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    await Post.bulkCreate(postData);
    await Comment.bulkCreate(commentData);

  
    process.exit(0);
  };

seedDatabase();
