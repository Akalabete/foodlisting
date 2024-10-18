
const mongoose = require('mongoose');
const MONGODB_URI = "mongodb+srv://lacouralexandre:Y5UOeMymaIP6Lw3U@akatest.3bqaqao.mongodb.net/foodlisting?retryWrites=true&w=majority"
console.log('MONGODB_URI:', MONGODB_URI);
if (!MONGODB_URI) {
  console.error('MongoDB URI is not found!');
  process.exit(1);
}
let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

module.exports = connectToDatabase;