interface bmiCalculatorInputs {
  heightCm: number,
  weightKg: number,
}

const parseArguments = (
  height: number,
  weight: number
): bmiCalculatorInputs => {

  if (!isNaN(height) && !isNaN(weight)) {
    return {
      heightCm: height,
      weightKg: weight
    };
  } else {
    throw new Error('provided values were not numbers!');
  }
};

const bmiCalculator = (height: number, weight: number): string => {
  const bmi = weight / (height / 100) ** 2;

  if (bmi < 18.5) {
    return 'Underweight';
  } else if (bmi < 25) {
    return 'Normal';
  } else if (bmi < 30) {
    return 'Over';
  } else if (bmi < 35) {
    return 'Class 1 obesity';
  } else if (bmi < 40) {
    return 'Class 2 obesity';
  } else {
    return 'Class 3 obesity';
  }
};

export {
  parseArguments,
  bmiCalculator
};
