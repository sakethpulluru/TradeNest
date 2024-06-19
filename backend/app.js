const express = require('express');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users'); // Import your users router

const app = express();

app.use(bodyParser.json());

// Use your users router for '/users' endpoint
app.use('/api/users', usersRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`http://localhost:3000`);
});


