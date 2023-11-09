type Data = { height: number, weight: number}

const parseArguments = (args: string[]): Data => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");
  if (Number(args[2]) === 0) throw new Error("Height cant be 0");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]), 
      weight: Number(args[3])
    };
     } else {
    throw new Error("Provided values were not numbers!");
  }
};

const calculateBmi = (height: number, weight: number): String => {
  const bmi = weight / ((height / 100) * (height / 100));
  if (bmi < 16) return "Severe Thinness";
  if (bmi < 17) return "Moderate Thinness";
  if (bmi < 18.5) return "Mild Thinness";
  if (bmi < 25) return "Normal";
  if (bmi < 30) return "Overweight";
  if (bmi < 35) return "Obese Class 1";
  if (bmi < 40) return "Obese Class 2";
  return "Obese Class 3";
};

const { height, weight } = parseArguments(process.argv);

console.log(calculateBmi(height, weight));
