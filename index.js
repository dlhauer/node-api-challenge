const server = require('./server');
const port = process.env.PORT || 5000;

// console.log('server', server);
server.listen(port, () => {
  console.log(`\n *** Server listening on port http://localhost:${port} *** \n`);
});