import express from 'express';
import cors from 'cors';

import diagnoseRouter from './routes/diagnoseRouter';
import patientRouter from './routes/patientRouter';

const app = express();


// eslint-disable-next-line @typescript-eslint/no-explicit-any
app.use(cors());
app.use(express.json());

// Define all the functions of the API
app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diagnoses', diagnoseRouter);
app.use('/api/patients', patientRouter);

// Start listening
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});