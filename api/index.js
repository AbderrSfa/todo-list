const express = require('express');
const app = express();
const port = 4040;
const cors = require('cors');

const todoRouter = require('./routes/todos');

app.use(cors());
app.use(express.json());
app.use('/api/todos', todoRouter);

app.listen(port, () => console.log(`Server is running on port ${port}...`));
