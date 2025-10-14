import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './configs/mongodb.js'
import { clerkWebhooks, stripeWebhooks } from './controllers/webhooks.js';
import User from './models/User.js';
import { updateRoleToEducator } from './controllers/educatorControllers.js';
import educatorRouter from './routes/educatorRoutes.js';
import { clerkMiddleware } from '@clerk/express';
import morgan from 'morgan';
import connectCloudinary from './configs/cloudinary.js';
import courseRouter from './routes/courseRoutes.js';
import userRoutes from './routes/userRoutes.js';
import userRouter from './routes/userRoutes.js';



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


// middleware
app.use(cors());
app.use(clerkMiddleware())
// app.use(morgan('dev'));


// Routes
app.get('/', (req,res)=>{res.send("API is working fine!")})
app.post('/clerk', express.json(), clerkWebhooks)
app.use('/api/educator', express.json(), educatorRouter);
app.use('/api/course', express.json(), courseRouter);
app.use('/api/user', express.json(), userRouter);
app.post('/stripe', express.raw({type: 'application/json'}), stripeWebhooks);



// port
const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=> {
    console.log(`Server is running on ${PORT}`);
    
})