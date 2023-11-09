interface ExerciseData {
  numberOfDays: number;
  numberOfTrainingDays: number;
  targetValue: number;
  avgTime: number;
  targetReached: boolean;
  rating: number;
  description: String;
}

interface exercisesTable {
    weeklyExercise: number[];
    targetValue: number;
}


const parseArgumentsExercises = (args: String[], ): exercisesTable => {
    if (args.length < 4) throw new Error("Not enough arguments");

    const weeklyExercise = [];
    let targetValue;

    if (!isNaN(Number(args[args.length - 1]))) {
        targetValue = Number(args[args.length - 1])
    } else {
        throw new Error("Only numeric values are accepted")
    };

    for (let i = 2; i < args.length - 1; i++) {
        if (!isNaN(Number(args[i]))) {
            weeklyExercise.push(Number(args[i]));
        } else {
            throw new Error("Only numeric values are accepted")
        };
    };

    return {
        weeklyExercise,
        targetValue
    };
};



const exerciseCalculator = (weeklyExercise: number[], targetValue: number): ExerciseData => {
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
  };

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


const { weeklyExercise, targetValue } = parseArgumentsExercises(process.argv);
console.log(exerciseCalculator(weeklyExercise, targetValue));
