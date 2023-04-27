import express from 'express';
import { parseArguments, bmiCalculator } from './bmiCalculator';

const app = express();

app.use(express.json());

app.get('/ping', (_req, res) => {
  res.send('pong');
});

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = req.query.height;
  const weight = req.query.weight;

  if (!weight || !height) {
    res.status(400);
    res.send({ error: 'missing parameter height or weight'});
  } else {
    try {
      const { heightCm, weightKg } = parseArguments(
        Number(height),
        Number(weight)
      );

      const bmi = bmiCalculator(heightCm, weightKg);

      res.send({
        weight: weightKg,
        height: heightCm,
        bmi
      });
    } catch (e) {
      res.status(400);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      res.send({ error: e.message });
    }
  }
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const {
    daily_exercises,
    target
  }: {
    daily_exercises: any,
    target: any
  } = req.body;


  if (!daily_exercises || !target) {
    return res.status(400).send({ error: 'parameters missing' });
  }

  if (!Array.isArray(daily_exercises) || isNaN(Number(target))) {
    return res.status(400).send({ error: 'malformed parameters' });
  }

  const periodLength = daily_exercises.length;

  const trainingDays = daily_exercises.reduce((total, curr) => {
    if (curr == 0) {
      return total;
    }

    return total += 1;
  }, 0);

  const sum = daily_exercises.reduce((total, curr) => {
    return total += curr;
  }, 0);

  const average = sum / daily_exercises.length;

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

  return res.send({
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

