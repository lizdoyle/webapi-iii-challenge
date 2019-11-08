// code away!
require('dotenv').config();
const server = require('./server');


// const {PORT} = process.env

const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`\n*** Server Running on http://localhost:${port} ***\n`);
});
