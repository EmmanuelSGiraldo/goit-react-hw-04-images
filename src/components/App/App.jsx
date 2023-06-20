
import  { Component } from "react";
import { Searchbar } from '../Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import styles from './App.module.scss';

export class App extends Component {
  state = {
    query: '',
  }
  
  searchFormSubmitHandler = (query) => {
    this.setState({ query });
  };

  render() {
    return (
      <div className={styles["app"]}>
        <Searchbar onSubmit={this.searchFormSubmitHandler} />
        <ImageGallery query={this.state.query} />
        <h2>Designed by Emmanuel S Giraldo</h2>
      </div>
    );
  }
}
