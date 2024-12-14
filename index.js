const express = require('express');
const app = express()

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send("Hello from server")
})

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Listening on ${PORT}`))