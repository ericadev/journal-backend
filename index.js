const express = require('express');
const app = express();
app.use(express.json());

const entries = [
  {
    id: 0,
    title: 'An entry',
    date: 'August 14, 2019',
    content: 'Some journal entry content'
  },
  {
    id: 1,
    title: 'Another entry',
    date: 'August 15, 2019',
    content: 'Another journal entry'
  },
  {
    id: 2,
    title: 'A third entry',
    date: 'August 15, 2019',
    content: 'A final journal entry'
  }
];

app.get('/api/v1/entries', (req, res) => {
  res.status(200).json({
    status: 'success',
    data: entries
  });
});

app.post('/api/v1/entries', (req, res) => {
  if (!req.body || !req.body.title || !req.body.date || !req.body.content) {
    return res.status(400).json({
      status: 'failure',
      message: 'Missing required field to make journal entry'
    });
  }

  const id = entries[entries.length - 1].id + 1;
  const newEntry = Object.assign({ id }, req.body);
  entries.push(newEntry);
  res.status(201).json({
    status: 'Success',
    data: newEntry
  });
});

app.put('/api/v1/entries/:id', (req, res) => {
  const id = Number(req.params.id);
  if (
    !req.body ||
    !req.body.title ||
    !req.body.date ||
    !req.body.content ||
    id >= entries.length
  ) {
    return res.status(400).json({
      status: 'failure',
      message:
        'Missing required field to make journal entry, or invalid entry chosen'
    });
  }

  const entry = entries.find(ent => ent.id === id);
  entries.splice(id, 1);
  const newEntry = Object.assign({ id }, req.body);
  entries.push(newEntry);

  res.status(202).json({
    status: 'success',
    data: newEntry
  });
});

const port = 3001;
app.listen(port, () => console.log(`Server is listening on ${port}`));
