import express from 'express'
import authRoutes from './routes/auth.js'
import userRoutes from './routes/users.js'
import postRoutes from './routes/posts.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
const app = express()

dotenv.config()
app.use(express.json())

app.use(cors({origin:[process.env.baseurl, "http://localhost:5173"], credentials:true}))


app.use(cookieParser())
app.use("/api/auth", authRoutes )
app.use("/api/users", userRoutes )
app.use("/api/posts", postRoutes )

app.listen(8800,()=>{
    console.log('Backend server is running!')
})