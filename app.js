import express from 'express';
import mongoose from 'mongoose';
import { join } from 'path'; // Corrected import for 'join' function
import customer from './routes/customer.js'
import hotel from './routes/hotel.js'
import room from './routes/room.js'
import auth from './routes/auth.js'
import { error } from 'console';
 

const app = express();
const dbl = 'mongodb+srv://gulk31362:umar12345@cluster0.7mwfqxg.mongodb.net/booking_com?retryWrites=true&w=majority';
const port = process.env.PORT ||  '3120';

mongoose
  .connect(dbl)
  .then(() => {
    console.log('Connected successfully to MongoDB');
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
  });

  app.use(express.json())
  app.use(express.urlencoded({extended: true}))
// // static file
app.use(express.static(join(process.cwd(), 'public')));
// app.use('/student/edit',express.static(join(process.cwd(), 'public')));

//middlewares========================================================================

app.use('/customer', customer);
app.use('/htl', hotel)
app.use('/room', room)
app.use('/auth', auth)


app.use((err , req , res , next)=>
{
  const errorStatus= err.status || 500
  const errorMessage= err.message || "Something went wrong"
 return res.status(errorStatus).json({
  success : false,
  status : errorStatus,
  message : errorMessage,
  stack : err.stack,
 })
})


app.get('/', (req, res) => {
  res.send('Hello world from the server');
});
