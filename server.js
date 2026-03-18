require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./config/db');

const app = express();
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

app.get('/', (req, res) => {
    res.send('API is herre...');
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
app.use('/api/auth', require('./routes/auth'));