(() => {
  interface Report {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
  }

  interface exerciseCalculatorInputs {
    target: number,
    training: number[],
  }

  const parseArguments = (args: string[]): exerciseCalculatorInputs => {
    if (args.length < 4) {
      throw new Error('not enough arguments');
    }

    const target = Number(args[2]);

    if (isNaN(target)) {
      throw new Error('target isn\'t a number!');
    }

    const training = [];

    for (let idx = 3; idx < process.argv.length; idx += 1) {
      const hours = Number(process.argv[idx]);

      if (isNaN(hours)) {
        throw new Error(`training hour at position ${idx} isn'nt a number!`);
      }

      training.push(hours);
    }

    return {
      target,
      training,
    };
  };

  const exerciseCalculator = (training: number[], target: number): Report => {
    const periodLength = training.length;

    const trainingDays = training.reduce((total, curr) => {
      if (curr == 0) {
        return total;
      }

      return total += 1;
    }, 0);

    const sum = training.reduce((total, curr) => {
      return total += curr;
    }, 0);

    const average = sum / training.length;

    const success = average >= target;

    let rating;
    let ratingDescription;
    if (average < target) {
      rating = 1;
      ratingDescription = 'do better';
    } else if (average === target) {
      rating = 2;
      ratingDescription = 'good job';
    } else {
      rating = 3;
      ratingDescription = 'amazing work';
    }

    return {
      periodLength,
      trainingDays,
      success,
      rating,
      ratingDescription,
      target,
      average,
    };
  };

  try {
    const { target, training } = parseArguments(process.argv);
    const trainingLog = exerciseCalculator(training, target);
    console.log(trainingLog);
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.';

    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }

    console.log(errorMessage);
  }
})();
