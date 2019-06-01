import app from './app';
require('dotenv').config();

const { PORT } = process.env;
app.listen(PORT, () => {
    console.log('Songc server is listening to port', PORT);
})