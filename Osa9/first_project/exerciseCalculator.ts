interface Exercises {
  numberOfDays: number;
  numberOfTrainingDays: number;
  targetValue: number;
  avgTime: number;
  targetReached: boolean;
  rating: number;
  description: String;
}

const exerciseCalculator = (weeklyExercise: number[], targetValue: number): Exercises => {
  const numberOfTrainingDays = weeklyExercise.filter((hours) => hours > 0).length;
  const avgTime = weeklyExercise.reduce((prev, current) => prev + current) / weeklyExercise.length;
  const targetReached = avgTime > targetValue;

  let rating;
  if (avgTime / targetValue < 0.5) rating = 1;
  else if (avgTime / targetValue < 1) rating = 2;
  else if (avgTime / targetValue >= 1) rating = 3;

  let description;
  switch (rating) {
    case 1:
      description = "Not good, lets try again";
      break;
    case 2:
      description = "Not too bad! but could be better";
      break;
    case 3:
      description = "You reached your goal! Well done!";
      break;
  }

  return {
    numberOfDays: weeklyExercise.length,
    numberOfTrainingDays,
    targetValue,
    avgTime,
    rating,
    description,
    targetReached,
  };
};

const exercises = [3, 0, 2, 4.5, 0, 3, 1];
const target = 15;

console.log(exerciseCalculator(exercises, target));
