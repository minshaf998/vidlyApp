import React, { Component } from "react";
import reactDom from "react-dom";
import { getMovies } from "./../services/fakeMovieService";
import Like from "./common/like";
import Pagination from "./common/pagination";

class Movies extends Component {
  state = { movies: getMovies(), pageSize: 4, currentPage: 1 };
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

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage } = this.state;
    if (count === 0) return "There are no movies in the database.";
    return (
      <React.Fragment>
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
              {this.state.movies.map((c) => (
                <tr key={c._id}>
                  <td>{c.title}</td>
                  <td>{c.genre.name}</td>
                  <td>{c.numberInStock}</td>
                  <td>{c.dailyRentalRate}</td>
                  <td>
                    <Like liked={c.liked} onClick={() => this.handleLike(c)} />
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
      </React.Fragment>
    );
  }
}

export default Movies;
