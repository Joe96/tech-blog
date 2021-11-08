const {Post} = require('../models')
const sequelize = require('../config/connection');

const postData = [{
    title: 'Lorem Ipsum I',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    user_id: 1

},
{
    title: 'Lorem Ipsum II',
    content: 'Amet aliquam id diam maecenas ultricies mi eget mauris pharetra.',
    user_id: 2
},
{
    title: 'Lorem Ipsum III',
    content: 'Ut etiam sit amet nisl purus in mollis.',
    user_id: 3
}
];

const seedDatabase = async (postjson) => {
    await sequelize.sync({ force: true });

    await Post.bulkCreate(postjson);
  
    process.exit(0);
  };

seedDatabase(postData);
