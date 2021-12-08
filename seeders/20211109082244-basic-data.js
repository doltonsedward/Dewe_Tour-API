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
        avatar: avatarDefault[randomAvatar]
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
        day: 6,
        night: 4,
        dateTrip: "2021-12-06T00:00:00.000Z",
        price: 12398000,
        quota: 12,
        filled: 12,
        type: "IDR",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
        image: "[\"https://res.cloudinary.com/dmegegwqb/image/upload/v1638670749/trip-default-dewetour/sydney_p4d1w2.jpg\",\"https://res.cloudinary.com/dmegegwqb/image/upload/v1638670749/trip-default-dewetour/sydney1_c0bsra.jpg\",\"https://res.cloudinary.com/dmegegwqb/image/upload/v1638670750/trip-default-dewetour/sydney2_xnte3w.jpg\",\"https://res.cloudinary.com/dmegegwqb/image/upload/v1638670745/trip-default-dewetour/sydney3_lfj5qu.jpg\"]"
      },
      {
        title: "6D/4N Exciting Summer in Korea",
        countryId: 2,
        accomodation: "Hotel 2 Night",
        transportation: "Korean Air",
        eat: "Included as ltinerary",
        day: 4,
        night: 2,
        dateTrip: "2021-12-06T00:00:00.000Z",
        price: 10288000,
        quota: 14,
        filled: 14,
        type: "IDR",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
        image: "[\"https://res.cloudinary.com/dmegegwqb/image/upload/v1638670747/trip-default-dewetour/south-korea_uuf2qa.jpg\",\"https://res.cloudinary.com/dmegegwqb/image/upload/v1638670748/trip-default-dewetour/south-korea1_homzxc.jpg\",\"https://res.cloudinary.com/dmegegwqb/image/upload/v1638670749/trip-default-dewetour/south-korea2_ifc1ha.jpg\",\"https://res.cloudinary.com/dmegegwqb/image/upload/v1638670750/trip-default-dewetour/south-korea3_eajplz.jpg\"]"
      },
      {
        title: "8D/6N Wonderful Autum From Japan",
        countryId: 3,
        accomodation: "Hotel 2 Night",
        transportation: "Japan Air",
        eat: "Included as ltinerary",
        day: 4,
        night: 2,
        dateTrip: "2021-12-06T00:00:00.000Z",
        price: 28999000,
        quota: 10,
        filled: 10,
        type: "IDR",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
        image: "[\"https://res.cloudinary.com/dmegegwqb/image/upload/v1638670746/trip-default-dewetour/japan_uxbsam.jpg\",\"https://res.cloudinary.com/dmegegwqb/image/upload/v1638670747/trip-default-dewetour/japan1_bhzcmc.jpg\",\"https://res.cloudinary.com/dmegegwqb/image/upload/v1638670750/trip-default-dewetour/japan2_lbzjhe.jpg\",\"https://res.cloudinary.com/dmegegwqb/image/upload/v1638670748/trip-default-dewetour/japan3_ojjgrv.jpg\"]"
      },
      {
        title: "4D/3N Overland Jakarta Bogor",
        countryId: 4,
        accomodation: "Hotel 7 Nights",
        transportation: "Garuda Air",
        eat: "Pizza",
        day: 7,
        night: 6,
        dateTrip: "2021-12-06T00:00:00.000Z",
        price: 10488000,
        quota: 8,
        filled: 8,
        type: "IDR",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
        image: "[\"https://res.cloudinary.com/dmegegwqb/image/upload/v1638670745/trip-default-dewetour/bogor_tyqxyl.jpg\",\"https://res.cloudinary.com/dmegegwqb/image/upload/v1638670746/trip-default-dewetour/bogor1_xm9a49.jpg\",\"https://res.cloudinary.com/dmegegwqb/image/upload/v1638670746/trip-default-dewetour/bogor2_kdrb3f.jpg\",\"https://res.cloudinary.com/dmegegwqb/image/upload/v1638670746/trip-default-dewetour/bogor3_hg6i6d.jpg\"]"
      },
      {
        title: "JL Maros Sulawesi-Selatan",
        countryId: 4,
        accomodation: "Hotel 6 Nights",
        transportation: "Indonesia",
        eat: "Pizza",
        day: 7,
        night: 6,
        dateTrip: "2021-12-15T00:00:00.000Z",
        price: 12599000,
        quota: 8,
        filled: 8,
        type: "IDR",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
        image: "[\"https://res.cloudinary.com/dmegegwqb/image/upload/v1638857439/trip-default-dewetour/maros_ikquzm.jpg\",\"https://res.cloudinary.com/dmegegwqb/image/upload/v1638857441/trip-default-dewetour/maros1_fau84q.jpg\",\"https://res.cloudinary.com/dmegegwqb/image/upload/v1638857438/trip-default-dewetour/maros2_wuf4r8.jpg\",\"https://res.cloudinary.com/dmegegwqb/image/upload/v1638857456/trip-default-dewetour/maros3_lmadio.jpg\"]"
      },
      {
        title: "JL Maros pangkep",
        countryId: 4,
        accomodation: "Hotel 6 Nights",
        transportation: "Indonesia",
        eat: "Pizza",
        day: 7,
        night: 6,
        dateTrip: "2021-12-15T00:00:00.000Z",
        price: 12599000,
        quota: 8,
        filled: 8,
        type: "IDR",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
        image: "[\"https://res.cloudinary.com/dmegegwqb/image/upload/v1638857716/trip-default-dewetour/maros-pangkep_mdalj2.jpg\",\"https://res.cloudinary.com/dmegegwqb/image/upload/v1638857716/trip-default-dewetour/maros-pangkep-1_npgran.jpg\",\"https://res.cloudinary.com/dmegegwqb/image/upload/v1638857721/trip-default-dewetour/maros-pangkep-2_ty6lbl.jpg\",\"https://res.cloudinary.com/dmegegwqb/image/upload/v1638857714/trip-default-dewetour/maros-pangkep-3_ohgjk6.jpg\"]"
      },
      {
        title: "3D Stone Forest George",
        countryId: 4,
        accomodation: "Hotel 6 Nights",
        transportation: "Indonesia",
        eat: "Pizza",
        day: 7,
        night: 6,
        dateTrip: "2021-12-15T00:00:00.000Z",
        price: 1599000,
        quota: 8,
        filled: 8,
        type: "IDR",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
        image: "[\"https://res.cloudinary.com/dmegegwqb/image/upload/v1638857892/trip-default-dewetour/stone-forest-gorge_nb1hlk.jpg\",\"https://res.cloudinary.com/dmegegwqb/image/upload/v1638857894/trip-default-dewetour/stone-forest-gorge1_tpu0k9.jpg\",\"https://res.cloudinary.com/dmegegwqb/image/upload/v1638857893/trip-default-dewetour/stone-forest-gorge2_n5l7k2.jpg\",\"https://res.cloudinary.com/dmegegwqb/image/upload/v1638857891/trip-default-dewetour/stone-forest-gorge3_fnk5sw.jpg\"]"
      },
      {
        title: "JL Malino Sulawesi Selatan",
        countryId: 4,
        accomodation: "Hotel 6 Nights",
        transportation: "Indonesia",
        eat: "Pizza",
        day: 7,
        night: 6,
        dateTrip: "2021-12-15T00:00:00.000Z",
        price: 1598000,
        quota: 8,
        filled: 8,
        type: "IDR",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
        image: "[\"https://res.cloudinary.com/dmegegwqb/image/upload/v1638858032/trip-default-dewetour/malino_feu9el.jpg\",\"https://res.cloudinary.com/dmegegwqb/image/upload/v1638858031/trip-default-dewetour/malino1_tjp3qw.jpg\",\"https://res.cloudinary.com/dmegegwqb/image/upload/v1638858035/trip-default-dewetour/malino2_it2kef.jpg\",\"https://res.cloudinary.com/dmegegwqb/image/upload/v1638858033/trip-default-dewetour/malino4_t2gb78.jpg\"]"
      },
      {
        title: "JL Pantai Apung Bogor",
        countryId: 4,
        accomodation: "Hotel 6 Nights",
        transportation: "Indonesia",
        eat: "Pizza",
        day: 7,
        night: 6,
        dateTrip: "2021-12-15T00:00:00.000Z",
        price: 1598000,
        quota: 8,
        filled: 8,
        type: "IDR",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
        image: "[\"https://res.cloudinary.com/dmegegwqb/image/upload/v1638670746/trip-default-dewetour/bogor3_hg6i6d.jpg\",\"https://res.cloudinary.com/dmegegwqb/image/upload/v1638670746/trip-default-dewetour/bogor2_kdrb3f.jpg\",\"https://res.cloudinary.com/dmegegwqb/image/upload/v1638670745/trip-default-dewetour/bogor_tyqxyl.jpg\",\"https://res.cloudinary.com/dmegegwqb/image/upload/v1638670746/trip-default-dewetour/bogor1_xm9a49.jpg\"]"
      },
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
