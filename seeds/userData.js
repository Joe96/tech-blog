const {User} = require('../models')
const sequelize = require('../config/connection');

const userData = [{
  name: 'Joel',
  email: 'joel@afamefune.com',
  password: 'remember96'
},
];

const seedDatabase = async (userjson) => {
    await sequelize.sync({ force: true });

    await User.bulkCreate(userjson);
  
    process.exit(0);
  };

seedDatabase(userData);
