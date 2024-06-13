import express from "express";
import dotenv from "dotenv";
import routes from "./src/routes/api.routes.js";
import cors from "cors";


const app = express();

app.use(cors({
    origin:["http://localhost:5173"],
    methods: ['GET','POST', 'PUT']
}));

app.use(express.json());


const port = process.env.PORT || 9002;
dotenv.config();
app.use('/api', routes);

app.listen(port, ()=>{
    console.log("El servidor esta escuchando desde: ", port )
});

export default app;