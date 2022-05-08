import express from 'express';
import path from 'path';
import router from './routes/router';
const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'assets') ));
console.log(path.join(__dirname, 'assets'));
app.use(router);

app.listen(PORT, ()=> {
    console.log('Server is running.');
});