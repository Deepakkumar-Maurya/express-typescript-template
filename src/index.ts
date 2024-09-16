import express, { Request, Response, NextFunction, Application, ErrorRequestHandler } from "express";
import { Server } from "http";
import createHttpError from "http-errors";
import dotenv from "dotenv";
dotenv.config();

const app: Application = express();

app.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.send("Hello World!");
});

app.use((req: Request, res: Response, next: NextFunction) => {
    next(createHttpError.NotFound());
})


const errorHandler: ErrorRequestHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500);
    res.send({
        status: err.status || 500,
        message: err.message || "Internal Server Error"
    });
}

app.use(errorHandler);


const PORT: Number = Number(process.env.PORT) || 5000;
const server: Server = app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
