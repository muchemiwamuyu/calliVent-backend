import express from 'express'
import dotenv from 'dotenv'
import connectDb from "./db/db.js"

// load environment variables
dotenv.config();

// connect database
connectDb();

const app = express();
app.use(express.json());

// routing 
app.get( '/', (req, res) => {
    res.send('api is live');
});

// starting the server
const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})

