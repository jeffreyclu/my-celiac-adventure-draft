const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'my-celiac-adventure',
})
  .then(() => console.log('Connected to Mongo DB.'))
  .catch((err) => console.log(err));