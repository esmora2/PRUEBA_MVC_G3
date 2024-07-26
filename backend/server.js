const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();


app.use(bodyParser.json());
app.use(cors()); 


app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor ejecutandose en el puerto ${PORT}`);
});
