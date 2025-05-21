const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const config = require('./config/default');
const errorHandler = require('./middleware/error');

// Connect to Database
connectDB();

const app = express();

// Init Middleware
app.use(express.json({ extended: false }));
app.use(cors());

// Define Routes
app.use('/', require('./routes'));
// app.get('/', (req, res) => res.send('API Running'));

// Error Handler (should be last middleware)
app.use(errorHandler);

const PORT = config.port;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));