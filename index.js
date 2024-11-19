const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const userRouter = require("./routes/user");

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use("/user", userRouter);

const PORT = 4000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
