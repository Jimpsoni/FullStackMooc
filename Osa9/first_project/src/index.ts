import express from "express";
import { calculateBmi, parseArguments } from "./calculateBmi";
import { exerciseCalculator, parseArgumentsExercises } from "./exerciseCalculator";

const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const data = parseArguments(req.query.height, req.query.weight);

  if (!data) {
    res.json({
      error: "malformatted parameters",
    });
    return;
  }

  const bmi = calculateBmi(data.height, data.weight);
  res.json({
    weight: data.weight,
    height: data.height,
    bmi,
  });
});

app.post("/exercises", (req, res) => {
  if (!req.body.daily_exercises || !req.body.target) {
    res.status(400).json({ error: "missing parameters" });
    return;
  }
  const data = parseArgumentsExercises(req.body.daily_exercises, req.body.target);
  if (!data) { res.status(400).json({ error: "malformatted parameters" }); return; }

  const values = exerciseCalculator(data.weeklyExercise, data.targetValue);
  res.json(values);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
