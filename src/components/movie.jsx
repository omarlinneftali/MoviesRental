import React, { Component } from "react";
import { getMovies } from "../services/movieService";
import { getGenres } from "../services/genreService";
import MovieTable from "./movieTable";
import Pagination from "./common/pagination";
import ListGroup from "./common/ListGroup";
import { paginate } from "../utils/paginate";
import _ from "lodash";
import { Link } from "react-router-dom";
import SearchBox from "./common/searchBox";
import { deleteMovie } from "../services/movieService";
import { toast } from "react-toastify";

class Movie extends Component {
  state = {
    movies: [],
    pageSize: 4,
    currentPage: 1,
    genres: [],
    selectedGenre: null,
    searchQuery: "",
    sortColumn: { path: "title", order: "asc" },
  };

  async componentDidMount() {
    const { data } = await getGenres();
    const genres = [{ name: "All Genres", key: "all" }, ...data];

    const { data: movies } = await getMovies();

    this.setState({ movies, genres });

    console.log(process.env);
  }

  handleDelete = async (movie) => {
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter((m) => m._id !== movie._id);
    this.setState({ movies });

    try {
      await deleteMovie(movie._id);
    } catch (error) {
      if (error.response && error.response.status === 404)
        toast.error("this movie has been deleted");

      this.setState({ movies: originalMovies });
    }
  };

  handleLiked = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movie };
    movies[index].liked = !movie.liked;
    this.setState({ movies });
  };

  handlePageChange = (currentPage) => {
    this.setState({ currentPage });
  };

  handleGenreSelect = (selectedGenre) => {
    this.setState({ selectedGenre, currentPage: 1, searchQuery: "" });
  };

  handleSearch = (searchQuery) => {
    this.setState({ searchQuery, currentPage: 1, selectedGenre: null });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  extratMovies(allMovies, currentPage, pageSize) {
    let moviesCount = paginate(allMovies, currentPage, pageSize).length;

    if (moviesCount <= 0) {
      this.setState({ selectedGenre: null, currentPage: 1, searchQuery: "" });

      return [];
    }
    return paginate(allMovies, currentPage, pageSize);
  }
  getPageData() {
    let {
      movies: allMovies,
      currentPage,
      pageSize,
      selectedGenre,
      searchQuery,
      sortColumn,
    } = this.state;

    let filteredMovies = allMovies;
    if (searchQuery)
      filteredMovies = allMovies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filteredMovies = allMovies.filter(
        (m) => m.genre._id === selectedGenre._id
      );

    let sortedMovies = _.orderBy(
      filteredMovies,
      [sortColumn.path],
      [sortColumn.order]
    );

    let movies = paginate(sortedMovies, currentPage, pageSize);

    return { filteredMovies, movies };
  }

  render() {
    const { length: count } = this.state.movies;
    const { user } = this.props;

    let {
      currentPage,
      pageSize,
      genres,
      selectedGenre,
      sortColumn,
    } = this.state;

    let { filteredMovies, movies } = this.getPageData();

    return (
      <div className="row">
        <div className="col-2 mt-5 ml-2 p-1 bg-navy  text-center rounded shadow-lg   ">
          <ListGroup
            items={genres}
            onItemSelect={this.handleGenreSelect}
            selectedItem={selectedGenre ? selectedGenre : genres[0]}
          />
        </div>
        <div className="col">
          <p>
            <span>Hay {filteredMovies.length} disponibles</span>
          </p>
          <SearchBox
            value={this.state.searchQuery}
            onChange={this.handleSearch}
          />
          {user && (
            <Link
              to="/movies/new"
              className="btn btn-primary"
              style={{ marginBottom: 20 }}
            >
              New
            </Link>
          )}

          <MovieTable
            movies={movies}
            onDeleteMovie={this.handleDelete}
            onLikedMovie={this.handleLiked}
            sortColumn={sortColumn}
            onSortMovie={this.handleSort}
          />

          <Pagination
            totalCount={filteredMovies.length}
            pageSize={pageSize}
            onPageChange={this.handlePageChange}
            currentPage={currentPage}
          />
        </div>
      </div>
    );
  }
}

export default Movie;
