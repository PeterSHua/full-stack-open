import express from 'express';
import { parseArguments, bmiCalculator } from './bmiCalculator';

const app = express();

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

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

