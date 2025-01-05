module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('users', [
    {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'hashedpassword1'
    },
    {
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      password: 'hashedpassword2'
    }
  ]),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('users', null, {})
};
