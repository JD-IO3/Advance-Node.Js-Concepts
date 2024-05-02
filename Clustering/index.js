import express from 'express';

const app = express();

app.get('/heavy', (req, res) => {
    let total = 0;
    for (let i = 0; i < 50_000_000; i++) {
        total++;
    }
    res.send(`The result of the CPU intensive task is ${total}\n`);
});

app.listen(3000, () => {
    console.log(`App started on port: 3000`);
    console.log(`worker pid: ${process.pid}`);
})