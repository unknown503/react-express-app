require("dotenv").config();
require("./database");

const { server, app } = require("./app.js");

function main() {
    server.listen(app.get("port"));
}

main();