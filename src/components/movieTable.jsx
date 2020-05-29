import React, { Component } from "react";
import Like from "./common/like";
import Table from "./common/table";
import { Link } from "react-router-dom";
import auth from "../services/authService";

class MovieTable extends Component {
  deleteColumn = {
    key: "delete",
    content: (movie) => (
      <i
        className="fa fa-trash fa-2x text-danger"
        style={{ cursor: "pointer" }}
        onClick={() => this.props.onDeleteMovie(movie)}
        aria-hidden="true"
      ></i>
    ),
  };
  columns = [
    {
      path: "title",
      label: "Title",
      content: (movie) => (
        <Link to={`/movies/${movie._id}`}> {movie.title}</Link>
      ),
    },

    { path: "dailyRentalRate", label: "Rate" },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    {
      key: "like",
      content: (movie) => (
        <Like
          liked={movie.liked}
          onLiked={() => this.props.onLikedMovie(movie)}
        />
      ),
    },
  ];

  constructor() {
    super();
    const user = auth.getCurrentUser();

    if (user && user.isAdmin) this.columns.push(this.deleteColumn);
  }

  render() {
    const { movies, onSortMovie, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        sortColumn={sortColumn}
        onSort={onSortMovie}
        data={movies}
      />
    );
  }
}

export default MovieTable;
