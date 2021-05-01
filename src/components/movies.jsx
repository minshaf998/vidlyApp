import React, { Component } from "react";
import reactDom from "react-dom";
import { getMovies } from "./../services/fakeMovieService";

class Movies extends Component {
  state = { movies: getMovies() };
  handleClick = (movie) => {
    // console.log(movie);
    // console.log(this.state.movies[0]._id);
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };

  render() {
    const { length: count } = this.state.movies;
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
        </div>
      </React.Fragment>
    );
  }
}

export default Movies;
