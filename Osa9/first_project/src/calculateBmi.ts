interface bodyValues {
  height: number;
  weight: number;
}

export const calculateBmi = (height: number, weight: number): string => {
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseArguments = (height: any, weight: any): bodyValues | null => {
  const h = Number(height);
  const w = Number(weight);

  if (!isNaN(h) && !isNaN(w) && h !== 0) {
    return {
      height: h,
      weight: w,
    };
  }

  return null;
};

export default calculateBmi;
