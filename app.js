const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));


// Register the location for handlebars partials here:

hbs.registerPartials(__dirname + '/views/partials');

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index', { title: "Home", class: "page-home" });
});

app.get('/beers', async (req, res) => {
  const allBeers = await punkAPI.getBeers()
  res.render('beers', { title: "All beers", class: "page-beers", allBeers: allBeers })
});

app.get('/random-beer', async (req, res) => {
  const randomBeer = await punkAPI.getRandom()
  res.render('single-beer', { title: "Random beer", class: "page-single-beer", beer: randomBeer })
})

app.get("/beer/:id", async (req, res) => {
  const beer = await punkAPI.getBeer(req.params.id)
  res.render('single-beer', { title: beer[0].name, class: "page-single-beer", beer: beer })
})

app.listen(3000, () => console.log('🏃‍ on port 3000'));
