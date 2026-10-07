const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

let streakLvl = 1;
let levels = Array.from({ length: streakLvl }, (_, i) => [i + 1]);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.post('/upgrade', (req, res) => {
    streakLvl++;
    levels = Array.from({ length: streakLvl }, (_, i) => [i + 1]);
    res.redirect('/');
});

app.get('/', (req, res) => {
  res.render('index', { title: 'Home', streak: levels });
});