("use strict");

const env = require("dotenv").config(),
  app = require("./app"),
  port = process.env.PORT || 3000;

// console.log(process.env);

app.listen(port, (err) => {
  !err
    ? console.log(`The service is running at http://localhost:${port}`)
    : console.log(`the service is not working`);
});
