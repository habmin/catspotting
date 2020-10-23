const bcrypt = require('bcrypt');

module.exports = [
    {
        username: "Henry",
        password: bcrypt.hashSync("test", bcrypt.genSaltSync(10))
    },
    {
        username: "Maarvi",
        password: bcrypt.hashSync("test", bcrypt.genSaltSync(10))
    },
    {
        username: "Anosha",
        password: bcrypt.hashSync("test", bcrypt.genSaltSync(10))
    },
];
