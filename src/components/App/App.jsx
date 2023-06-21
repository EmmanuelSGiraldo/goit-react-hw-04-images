import { useState } from "react";
import { Searchbar } from "../Searchbar";
import { ImageGallery } from "../ImageGallery/ImageGallery";
import styles from "./App.module.scss";

 export const App = () => {
  const [query, setQuery] = useState("");

  const searchFormSubmitHandler = (query) => {
    setQuery(query);
  };

  return (
    <div className={styles.app}>
      <Searchbar onSubmit={searchFormSubmitHandler} />
      <ImageGallery query={query} />
      <h2>Designed by Emmanuel S Giraldo</h2>
    </div>
  );
};


