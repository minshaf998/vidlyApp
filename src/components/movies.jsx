import React, { Component } from "react";
import reactDom from "react-dom";
import ListGroup from "./common/ListGroup";
import { getMovies } from "./../services/fakeMovieService";
import Like from "./common/like";
import Pagination from "./common/pagination";
import { paginate } from "./../utils/paginate";
import { getGenres } from "../services/fakeGenreService";

class Movies extends Component {
  state = {
    movies: [],
    pageSize: 4,
    currentPage: 1,
    genres: [],
  };

  componentDidMount() {
    this.setState({ movies: getMovies(), genres: getGenres() });
  }

  handleClick = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };

  handleLike = (c) => {
    const movies = this.state.movies.map((movie) => {
      if (movie.liked !== true && movie.liked !== false) movie.liked = false;
      if (movie._id === c._id) {
        movie.liked = !movie.liked;
        return movie;
      }
      return movie;
    });
    this.setState({ movies });
  };

  handleGenreSelect = (genre) => {
    console.log(genre);
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, movies: allMovies } = this.state;

    if (count === 0) return "There are no movies in the database.";

    const movies = paginate(allMovies, currentPage, pageSize);

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.genres}
            onItemSelect={this.handleGenreSelect}
            textProperty="name"
            valueProperty="_id"
          />
        </div>
        <div className="col">
          <p>Showing {count} movies in the database.</p>
          <div>
            <table className="table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Genre</th>
                  <th>Stock</th>
                  <th>Rate</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {movies.map((c) => (
                  <tr key={c._id}>
                    <td>{c.title}</td>
                    <td>{c.genre.name}</td>
                    <td>{c.numberInStock}</td>
                    <td>{c.dailyRentalRate}</td>
                    <td>
                      <Like
                        liked={c.liked}
                        onClick={() => this.handleLike(c)}
                      />
                    </td>
                    <td>
                      <button
                        onClick={() => this.handleClick(c)}
                        className="btn btn-danger btn-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination
              itemsCount={count}
              pageSize={pageSize}
              onPageChange={this.handlePageChange}
              currentPage={currentPage}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Movies;
