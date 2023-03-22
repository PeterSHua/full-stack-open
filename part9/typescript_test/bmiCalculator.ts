/*
Write a function calculateBmi that calculates a BMI based on a given height (in centimeters) and weight (in kilograms) and then returns a message that suits the results.

Call the function in the same file with hard-coded parameters and print out the result. The code

console.log(calculateBmi(180, 74))

should print the following message:

Normal (healthy weight)

Create an npm script for running the program with the command npm run calculateBmi.
*/
(() => {
  interface bmiCalculatorInputs {
    height: number,
    weight: number,
  };

  const parseArguments = (args: string[]): bmiCalculatorInputs => {
    if (args.length < 4) {
      throw new Error('not enough arguments');
    }

    if (args.length > 4) {
      throw new Error('too many arguments');
    }

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
      return {
        height: Number(args[2]),
        weight: Number(args[3])
      }
    } else {
      throw new Error('provided values were not numbers!');
    }
  };

  const calculateBmi = (height: number, weight: number) => {
    const bmi = weight / (height / 100) ** 2;
    let result;

    if (bmi < 18.5) {
      result = 'Underweight';
    } else if (bmi < 25) {
      result = 'Normal';
    } else if (bmi < 30) {
      result = 'Over';
    } else if (bmi < 35) {
      result = 'Class 1 obesity';
    } else if (bmi < 40) {
      result = 'Class 2 obesity';
    } else {
      result = 'Class 3 obesity';
    }

    console.log(result);
  };

  try {
    const { height, weight } = parseArguments(process.argv);
    calculateBmi(height, weight);
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.';

    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }

    console.log(errorMessage);
  }

})();
