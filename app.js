const express = require("express");
const app = express();
app.use(express.json());

// array has been initialised with some objects to make testing easier
const movies = [{id : 1, title: "A great movie", releaseYear : 1997},{id : 2, title: "Another great movie", releaseYear : 2005}];
let nextId = movies.length + 1;


app.get("/movies", (req, res) => {
    res.send(movies);
});

app.get("/movies/:id", (req, res) => {
    const movieId = parseInt(req.params.id);
    const existingMovie = movies.find((movie) => movie.id === movieId);

    if (existingMovie === undefined) {
        res.sendStatus(404);
        return;
    }

    res.send(existingMovie);
});

app.post("/movies", (req, res) => {
    const movie = req.body;
    movie.id = nextId++;
    movies.push(movie);
    res.send(movies.find((mov) => mov.id === movie.id));
});

app.put("/movies/:id", (req, res) => {
    const movie = req.body;
    const movieId = parseInt(req.params.id);
    movie.id = movieId;
    const indexOfMovie = movies.findIndex((movie) => movie.id === movieId);
    if (indexOfMovie > -1) {
        movies[indexOfMovie] = movie;
        res.send(movies[indexOfMovie]);
    }

    else {
        res.sendStatus(404);
    }
});

app.patch("/movies/:id", (req, res) => {
    const requestMovie = req.body;
    const movieId = parseInt(req.params.id);
    const existingMovie = movies.find((movie) => movie.id === movieId);

    if (existingMovie === undefined) {
        res.sendStatus(404);
        return;
    }
    
    for (let [key, value] of Object.entries(requestMovie)) {
        existingMovie[key] = value;
    }

    res.send(existingMovie);
});

app.delete("/movies/:id", (req, res) => {
    const movieId = parseInt(req.params.id);
    const indexOfMovie = movies.findIndex((movie) => movie.id === movieId);

    if (indexOfMovie > -1) {
        movies.splice(indexOfMovie, 1);
        res.sendStatus(200);
    }

    else {
        res.sendStatus(404);
    }
})

app.listen(8080);