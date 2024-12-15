import express from "express";
import cors from "cors";
import { dbCreate, AppDataSouce } from "./db";
import { appRouter } from "./routes";
import { errorHandlerMiddleware, routeMiddleware } from "./middlewares";
import { Env } from "./env";
// import { clientUse } from "valid-ip-scope";

const setupServer = async () => {    
  const port = process.env.PORT || 4000;
    // Ensure dbCreate resolves properly and handles any issues
    console.log('Database connection established.');
    await AppDataSouce.initialize()
    
    // Initialize AppDataSource (Database connection for TypeORM)
    
    .then(() => {
      console.log('MongoDB connected successfully');
    })
    .catch((error) => {
      console.error('Error during MongoDB connection', error);
    }) 
    console.log('Database connection asasasestablished.');
    await dbCreate();
    const app = express();

    app.use(cors()); 
    app.use(express.json());
    // app.use(clientUse());
    app.use(routeMiddleware);

    app.use("/health", (_req, res) => {
      res.json({ msg: "Hello Get Zell" });
    });

    app.use("/api/v1", appRouter);
    app.use(errorHandlerMiddleware);

    // const { port } = Env;
    console.log(`Server is starting on port ${port}`);
    
    app.listen(port, () => {
      console.log(`Server is listening on ${port}.`);
    });
  
};

setupServer();
