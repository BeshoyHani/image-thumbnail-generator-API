import express from 'express';
import router from './routes/router';
const app = express();
const PORT = 3000;

app.use(router);
app.listen(PORT, () => {
    console.log('Server is running.');
});

export default app;
