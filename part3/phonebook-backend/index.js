const { application } = require('express');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

morgan.token('res-json', (req) => {
  return JSON.stringify(req.body);
})

app.use(cors());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :res-json'));
app.use(express.json());

let phonebook = [
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

let indexOfPerson = (persons, id) => {
  let foundIdx = -1;

  for (let idx = 0; idx < persons.length; idx +=1) {
    if (persons[idx].id === id) {
      foundIdx = idx;
    }
  }

  return foundIdx;
}

let isUnique = (name) => {
  return (phonebook.every((person) => {
    return person.name !== name;
  }));
};

app.get('/api/persons', (req, res) => {
  res.json(phonebook);
});

app.get('/info', (req, res) => {
  let date = new Date();
  let content = `Phonebook has info for ${phonebook.length} people<br>`
  content += date.toString();

  res.send(content);
});

app.get('/api/persons/:id', (req, res) => {
  let id = Number(req.params.id);

  let contact = phonebook.find((contact) => {
    return contact.id === id;
  });

  if (contact) {
    res.json(contact);
  } else {
    res.status(404).end();
  }
});

app.delete('/api/persons/:id', (req, res) => {
  let id = Number(req.params.id);
  let idx = indexOfPerson(phonebook, id);

  if (idx !== -1) {
    phonebook.splice(idx, 1);
    res.status(200).end('Deleted');
  } else {
    res.status(404).end();
  }
});

app.post('/api/persons', (req, res) => {
  let person = req.body;

  console.log(person);
  if (!person.name) {
    res.status(400).end('Name is missing');
  } else if (!person.number) {
    res.status(400).end('Number is missing');
  } else if (!isUnique(person.name)) {
    res.status(400).end('Name must be unique');
  } else {
    person.id = Math.floor(Math.random() * 10000);
    phonebook = phonebook.concat(person);

    res.json(person);
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
