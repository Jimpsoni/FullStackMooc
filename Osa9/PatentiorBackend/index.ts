import express from 'express';
const app = express();

app.use(express.json());


// Define all the functions of the API
app.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});


// Start listening
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
