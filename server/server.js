const express = require("express");
const cors = require("cors");

const app = express();

const registerRouter = require("./routes/auth/register.router");
const loginRouter = require("./routes/auth/login.router");
const picnicRouter = require("./routes/picnic/picnic.router.js");

const connectDB = require("./config/db");

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8000;

app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/picnic", picnicRouter);

connectDB();

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
