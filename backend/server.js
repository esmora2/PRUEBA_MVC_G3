const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const coursesRoutes = require('./routes/courses');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.use('/courses', coursesRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
