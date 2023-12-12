/**
*  File: index.js 
*
*  Description: Imports express to route. Each api
*  is handled by a seperate router.
*  Class: Comp 3612
*
*  Name: Ben Cacic
*/

const express = require('express');
const app = express();

app.use(express.json());

app.use('/api/paintings', require('./routes/paintings'));
app.use('/api/painting', require('./routes/paintings'));
app.use('/api/artists', require('./routes/artists'));
app.use('/api/galleries', require('./routes/galleries'));

let port = 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});