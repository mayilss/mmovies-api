import Express from "express";
const logger = require("./middleware/logger");
const app = Express();
const port = 3000;

app.use(logger);

app.get("/", (_req: Express.Request, res: Express.Response) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
