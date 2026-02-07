const express = require("express")
const dotenv = require("dotenv")
const cors = require('cors')
const { connectDB } = require("./db/database")
const Airline_User = require("./routes/userRoutes")
const cookieParser = require("cookie-parser")
const userBooking = require("./routes/bookingroutes")
const Admin = require("./routes/Adminroutes")
dotenv.config()

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended :true}))
app.use(cookieParser())
connectDB();
app.use(
  cors({
    origin: ['http://localhost:5173',"http://localhost:5174","https://airline-booking-admin.vercel.app","https://airline-booking-user.vercel.app"],
    credentials: true,               
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
)

app.set("trust proxy", 1);

app.use('/airline/users', Airline_User)
app.use('/airline/users', userBooking)
app.use('/airline/admin', Admin)

app.listen(process.env.PORT, ()=>{
    console.log(`Working on server ${process.env.PORT}`)
})
