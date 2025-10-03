import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './configs/mongodb.js'
import { clerkWebhooks } from './controllers/webhooks.js';

//Initialize express app
const app = express();

//Connect to MongoDB
try {
  await connectDB();
} catch (error) {
  console.error('Failed to connect to database:', error);
  process.exit(1);
}

//Middlewares
app.use(express.json());
app.use(cors());


//Routes
app.get('/', (req, res) => {
    res.send("API Working")
})

app.post('/clerk',clerkWebhooks);

//PORT

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});