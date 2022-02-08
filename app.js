const express = require("express");
const app = express();
app.use(express.json());

let nextId = 3;
const movies = [{id : 1, title: "A great movie"},{id : 2, title: "A great movie 2"} ];

app.get("/movies", (req, res) => {
    res.send(movies);
});

app.get("/movies/:id", (req, res) => {
    const movieId = parseInt(req.params.id);
    res.send(movies.find((movie) => movie.id === movieId));
});

app.post("/movies", (req, res) => {
    const movie = req.body;
    movie.id = nextId++;
    movies.push(movie);
    res.send(movies);
});


app.listen(8080);