import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './configs/mongodb.js'
import { clerkWebhooks } from './controllers/webhooks.js';
import User from './models/User.js';
import { updateRoleToEducator } from './controllers/educatorControllers.js';
import educatorRouter from './routes/educatorRoutes.js';
import { clerkMiddleware } from '@clerk/express';
import morgan from 'morgan';
import connectCloudinary from './configs/cloudinary.js';
import courseRouter from './routes/courseRoutes.js';


//Initialize express app
const app = express();

//Connect to MongoDB
try {
  await connectDB();
} catch (error) {
  console.error('Failed to connect to database:', error);
  process.exit(1);
}
//Connect to Cloudinary
try {
  await connectCloudinary();
} catch (error) {
  console.error('Failed to connect to Cloudinary:', error);
  process.exit(1);
}


//Middlewares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(clerkMiddleware());
app.use(morgan('dev'));

//Routes
app.get('/', (req, res) => {
  res.send("API Working")
})

app.post('/clerk', clerkWebhooks);

// app.use('/api', clerkMiddleware);
app.use('/api/educator', educatorRouter);

app.use('/api/course',courseRouter);

//PORT

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});