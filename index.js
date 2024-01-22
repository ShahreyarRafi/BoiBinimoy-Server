
const port = 3030
const app = require("./src/app");
const dbConnection = require("./src/config/db");

app.listen(port, async () => {
    console.log(`Ecommerce Server is running at http://localhost:${port}`);
    await dbConnection();
});
