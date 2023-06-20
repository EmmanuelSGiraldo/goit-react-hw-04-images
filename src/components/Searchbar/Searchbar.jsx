import { Component } from "react";
import PropTypes from "prop-types";
import styles from "./Searchbar.module.scss";
import { Notify } from "notiflix/build/notiflix-notify-aio";

export class Searchbar extends Component {
  state = {
    query: "",
  };

  handleInputChange = (e) => {
    this.setState({ query: e.currentTarget.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.query.trim() === "") {
      Notify.failure("Sorry, enter something in search line.");
      return;
    }

    this.props.onSubmit(this.state.query);
    this.setState({ query: "" });
  };

  render() {
    return (
      <header className={styles["Header"]}>
        <form className={styles["Form"]} onSubmit={this.handleSubmit}>
          <button
            type="submit"
            className={styles["Button"]}
            aria-label="Search"
          >
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 32 32"
            >
              <title>search</title>
              <path d="M31.008 27.231l-7.58-6.447c-0.784-0.705-1.622-1.029-2.299-0.998 1.789-2.096 2.87-4.815 2.87-7.787 0-6.627-5.373-12-12-12s-12 5.373-12 12 5.373 12 12 12c2.972 0 5.691-1.081 7.787-2.87-0.031 0.677 0.293 1.515 0.998 2.299l6.447 7.58c1.104 1.226 2.907 1.33 4.007 0.23s0.997-2.903-0.23-4.007zM12 20c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z"></path>
            </svg>
            <span className={styles["ButtonLabel"]}>Search</span>
          </button>
          <input
            className={styles["Input"]}
            autoComplete="off"
            type="text"
            value={this.state.query}
            onChange={this.handleInputChange}
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
