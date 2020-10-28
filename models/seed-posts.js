/*******************************
**** Cat Spotting Post Seed ****
*******************************/

//Provided 5 complete posts for database
module.exports = [
    {
        title: "I guess he was thirsty",
        description: "This guy followed me to the bathroom out of nowhere and demanded me to turn on the water",
        location: "Bushwick, NY",
        img: "https://cat-spotting.herokuapp.com/img/cat1.jpg",
        poster: "Henry",
        latitude: 40.6957755,
        longitude: -73.9170604,
        comments: [
            {
                text: "Love this cat!",
                user: "Maarvi"
            },
            {
                text: "Hair looks like ramen",
                user: "Anosha"
            },
        ]
    },
    {
        title: "Bodega Beer Cat",
        description: "Guess He Drank Too Much...",
        location: "Lower East Side, NY",
        img: "https://cat-spotting.herokuapp.com/img/cat2.jpg",
        poster: "Henry",
        latitude: 40.715033,
        longitude: -73.9842724
    },
    {
        title: "Just chillin",
        description: "Came right over and sat next to us",
        location: "Portland",
        img: "https://cat-spotting.herokuapp.com/img/cat3.jpg",
        poster: "Maarvi",
        latitude: 45.5051064,
        longitude: -122.6750261,
        comments: [
            {
                text: "I remember this guy",
                user: "Henry"
            },
            {
                text: "Kind of miss him",
                user: "Maarvi"
            },
        ]
    },
    {
        title: "On the prowl",
        description: "Better watch out!",
        location: "New Jersey",
        img: "https://cat-spotting.herokuapp.com/img/cat4.jpg",
        poster: "Maarvi",
        latitude: 40.99539423249059,
        longitude: -74.25954922331373
    },
    {
        title: "Stairwell Kitten",
        description: "Seemed so nervous!",
        location: "Flatbush, NY",
        img: "https://cat-spotting.herokuapp.com/img/cat5.jpg",
        poster: "Anosha",
        latitude: 40.65481114941911,
        longitude: -73.95542325730048
    }
];
