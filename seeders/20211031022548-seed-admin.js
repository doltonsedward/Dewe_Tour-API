'use strict';

const bcrypt = require('bcrypt')

const avatarDefault = require('../src/utils/avatar')
const randomAvatar = Math.floor(Math.random() * (avatarDefault.length))


module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const hashedPassword = await bcrypt.hash('Admin1234', 10)

    await queryInterface.bulkInsert("users", [
      {
        fullName: "Doltons",
        email: "admin@dewetour.com",
        password: hashedPassword,
        phone: "089619800459",
        address: "Jl. Musyawarah",
        role: "admin",
        avatar: `http://localhost:8080/uploads/avatar/${avatarDefault[randomAvatar]}`
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
