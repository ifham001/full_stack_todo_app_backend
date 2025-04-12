const app = require('./app');
const connectDB = require('./confiq/Db')



connectDB();

// app.listen(3000, () => {
//     console.log('Server is running on port 3000');
// }
// );