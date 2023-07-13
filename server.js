const dotenv = require('dotenv');
dotenv.config({ path: './.env' });
const app = require('./app');
const connectDB = require('./db');
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server listening on PORT: ${PORT}`);
});
