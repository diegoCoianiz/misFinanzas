import { connect, connection } from "mongoose";

let condition = { isConnected: false }

export const dbConnect = async () => {
    if (condition.isConnected) return;
    try {
        await connect(process.env.DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        condition.isConnected = connection.readyState;
        console.log(`Connected to MongoDBatlas: ${connection.db.databaseName}`);
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }

    connection.on("disconnected", () => {
        console.log("MongoDBatlas disconnected");
        condition.isConnected = false;
    });

    connection.on("error", (err) => {
        console.error(err.message);
        process.exit(1);
    });
};


export const dbDisconnect = async () => {
    if (!condition.isConnected) return;
    try {
      await connection.close();
      console.log("MongoDBatlas connection closed");
      condition.isConnected = false;
    } catch (err) {
      console.error(err.message);
      process.exit(1);
    }
  };