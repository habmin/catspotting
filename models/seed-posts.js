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
        latitude: null,
        longitude: null,
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
        latitude: null,
        longitude: null
    },
    {
        title: "Just chillin",
        description: "Came right over and sat next to us",
        location: "Portland",
        img: "https://cat-spotting.herokuapp.com/img/cat3.jpg",
        poster: "Maarvi",
        latitude: null,
        longitude: null,
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
        latitude: null,
        longitude: null
    },
    {
        title: "Stairwell Kitten",
        description: "Seemed so nervous!",
        location: "Flatbush, NY",
        img: "https://cat-spotting.herokuapp.com/img/cat5.jpg",
        poster: "Anosha",
        latitude: null,
        longitude: null
    }
];
