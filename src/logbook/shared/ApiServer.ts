import express from "express";
import { CreateLogbookController } from "../features/create-logbook/CreateLogbookController";
import { GetLogbookController } from "../features/get-logbook/GetLogbookController";

export class ApiServer {
  public static async run(
    port: number,
    controller: CreateLogbookController,
    getController: GetLogbookController
  ): Promise<void> {
    const app = express();
    app.use(express.json());

    app.post("/logbooks", (req, res) => controller.handle(req, res));
    app.get("/logbooks/:id", (req, res) => getController.handle(req, res));

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }
}
