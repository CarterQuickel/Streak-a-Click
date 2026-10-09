const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const IP = '172.16.3.241';

let streakLvl = 1;
let strength = 1;
let levels = Array.from({ length: streakLvl }, (_, i) => [i + 1]);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, IP, () => {
  console.log(`Server is running on ${IP}:${port}`);
});

app.post('/upgrade', (req, res) => {
    streakLvl++;
    strength = strength + 1;
    levels = Array.from({ length: streakLvl }, (_, i) => [i + 1]);
    res.redirect('/');
});

app.get('/', (req, res) => {
  res.render('index', { title: 'Home', streak: levels, str: strength });
});