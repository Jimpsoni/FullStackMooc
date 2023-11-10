interface ExerciseData {
  numberOfDays: number;
  numberOfTrainingDays: number;
  targetValue: number;
  avgTime: number;
  targetReached: boolean;
  rating: number;
  description: string;
}

interface exercisesTable {
  weeklyExercise: number[];
  targetValue: number;
}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseArgumentsExercises = ( exercises: any[], target: any ): exercisesTable | null => {
  if (!Array.isArray(exercises)) return null;
  if (exercises.length < 1) return null;


  for (let i = 0; i < exercises.length; i++) {
    const num = Number(exercises[i]);
    if (isNaN(Number(num))) return null;
    exercises[i] = num;
  }


  const t = Number(target);
  if (isNaN(Number(t))) return null;

  return {
    weeklyExercise: exercises,
    targetValue: target,
  };
};

export const exerciseCalculator = (
  weeklyExercise: number[],
  targetValue: number
): ExerciseData => {
  const numberOfTrainingDays = weeklyExercise.filter(
    (hours) => hours > 0
  ).length;
  const avgTime =
    weeklyExercise.reduce((prev, current) => prev + current) /
    weeklyExercise.length;
  const targetReached = avgTime >= targetValue;

  let rating = 0;
  if (avgTime / targetValue < 0.5) rating = 1;
  else if (avgTime / targetValue < 1) rating = 2;
  else if (avgTime / targetValue >= 1) rating = 3;

  let description = "Something went wront with rating";
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

export default { exerciseCalculator, parseArgumentsExercises };
