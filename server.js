const app = require('./app');
const connectDB = require('./confiq/Db')
require('dotenv').config();

const port = process.env.PORT || 3000;


connectDB();

app.listen(port, () => {
    console.log('Server is running on port 3000');
}
);