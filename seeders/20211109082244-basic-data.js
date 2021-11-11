'use strict';

const bcrypt = require('bcrypt')

const avatarDefault = require('../src/utils/avatar')
const randomAvatar = Math.floor(Math.random() * (avatarDefault.length))

module.exports = {
  up: async (queryInterface, Sequelize) => {
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

    await queryInterface.bulkInsert("countries", [
      {
        name: "Australia"
      },
      {
        name: "South Korea"
      },
      {
        name: "Japan"
      },
      {
        name: "Indonesia"
      }
    ])

    await queryInterface.bulkInsert('trips', [
      {
        title: "6D/4N Fun Tassie Vacation + Sydney",
        countryId: 1,
        accomodation: "Hotel 4 Night",
        transportation: "Qatar Airways",
        eat: "Included as ltinerary",
        day: "6 Day",
        night: "4 Night",
        dateTrip: "26 August 2021",
        price: 12398000,
        quota: 12,
        filled: 12,
        type: "IDR",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
        image: "[\"sydney.jpg\",\"sydney1.jpg\",\"sydney2.jpg\",\"sydney3.jpg\"]"
      },
      {
        title: "6D/4N Exciting Summer in Korea",
        countryId: 2,
        accomodation: "Hotel 2 Night",
        transportation: "Korean Air",
        eat: "Included as ltinerary",
        day: "4 Day",
        night: "2 Night",
        dateTrip: "11 December 2021",
        price: 10288000,
        quota: 14,
        filled: 14,
        type: "IDR",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
        image: "[\"south-korea.jpg\",\"south-korea1.jpg\",\"south-korea2.jpg\",\"south-korea3.jpg\"]"
      },
      {
        title: "8D/6N Wonderful Autum From Japan",
        countryId: 3,
        accomodation: "Hotel 2 Night",
        transportation: "Japan Air",
        eat: "Included as ltinerary",
        day: "4 Day",
        night: "2 Night",
        dateTrip: "11 December 2021",
        price: 28999000,
        quota: 10,
        filled: 10,
        type: "IDR",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
        image: "[\"japan.jpg\",\"japan1.jpg\",\"japan2.jpg\",\"japan3.jpg\"]"
      },
      {
        title: "4D/3N Overland Jakarta Bogor",
        countryId: 4,
        accomodation: "Hotel 7 Nights",
        transportation: "Japan Air",
        eat: "Pizza",
        day: "7 Day",
        night: "6 Night",
        dateTrip: "20 January 2022",
        price: 10488000,
        quota: 8,
        filled: 8,
        type: "IDR",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
        image: "[\"bogor.jpg\",\"bogor1.jpg\",\"bogor2.jpg\",\"bogor3.jpg\"]"
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
