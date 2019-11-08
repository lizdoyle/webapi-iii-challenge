const express = require('express');


const postRoutes = require('./posts/postRouter');

const userRoutes = require('./users/userRouter');

const server = express();

server.use(express.json());
server.use('/posts', logger, postRoutes);
server.use('/users',  logger, userRoutes);

server.get('/',logger, (req, res) => {
    res.send('Server is working');
  });


//custom middleware

//logger complete
function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get(
      'Origin'
    )}`
  );
  next();
};


module.exports = server;
