const express = require('express');
const morgan = require('morgan');

const app = express();

morgan.token('res-json', (req) => {
  return JSON.stringify(req.body);
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :res-json'));
app.use(express.json());

let persons = [
    {
      "id": 1,
      "name": "Arto Hellas",
      "number": "040-123456"
    },
    {
      "id": 2,
      "name": "Ada Lovelace",
      "number": "39-44-5323523"
    },
    {
      "id": 3,
      "name": "Dan Abramov",
      "number": "12-43-234345"
    },
    {
      "id": 4,
      "name": "Mary Poppendieck",
      "number": "39-23-6423122"
    }
];

let isUnique = (name) => {
  console.log(persons);

  return (persons.every((person) => {
    return person.name !== name;
  }));
};

app.get('/api/persons', (request, response) => {
  response.json(persons);
});

app.get('/api/info', (request, response) => {
  let date = new Date();
  let info = `Phonebook has info for ${persons.length} people<br>`;
  info += date.toString();

  response.send(info);
});

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)

  if (person) {
	  response.json(person)
  } else {
	  response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

app.post('/api/persons/', (request, response) => {
  let person = request.body;

  if (!person.name) {
    response.status(400).json({ error: 'name is missing '});
  } else if (!person.number) {
    response.status(400).json({ error: 'number is missing '});
  } else if (!isUnique(person.name)) {
    response.status(400).json({ error: 'name must be unique'});
  } else {
    person.id = Math.floor(Math.random() * 10000);
    persons = persons.concat(person);

    response.json(person);
  }
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
