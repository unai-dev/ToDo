
const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const taskRoutes = require('./routes/taskRoutes');
app.use("/tasks", taskRoutes);


app.get("/", (req, res) => {
  res.send("API funcionando");
});


module.exports = app;

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Servidor local en http://localhost:${PORT}`));
}