import express from 'express';
import dotenv from 'dotenv';
import { clerkMiddleware } from '@clerk/express';;
import { connectDB } from './lib/db.js';
import fileupload from 'express-fileupload';
import path from 'path';
import cors from 'cors';


import userRoutes from './routes/user.route.js';
import adminRoutes from './routes/admin.route.js';
import authRoutes from './routes/auth.route.js';
import songRoutes from './routes/song.route.js';
import albumRoutes from './routes/album.route.js';
import statRoutes from './routes/stat.route.js';
import fileUpload from 'express-fileupload';
// Load environment variables from .env file
dotenv.config();

const __dirname = path.resolve(); // Get the current directory name
const app = express();
const PORT = process.env.PORT;

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true, // Allow credentials to be sent
}
));


app.use(express.json()); //to parse req.body
app.use(clerkMiddleware()); // Clerk middleware for authentication
app.use(
  fileUpload({
    useTempFiles: true, // Use temporary files for uploads
    tempFileDir: path.join(__dirname, 'tmp'), // Directory for temporary files
    createParentPath: true, // Create parent directories if they don't exist
    limits: { fileSize: 50 * 1024 * 1024 }, // Limit file size to 50MB
  }),
); // Middleware for file uploads



app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/songs', songRoutes);
app.use('/api/albums', albumRoutes);
app.use('/api/stats', statRoutes);

//error handler
app.use((err, req, res, next) => {
  res.status(500).json({ message: process.env.NODE_ENV === 'production' ? 'Internal Server Error' : err.message });
});


app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT);
  connectDB();
});