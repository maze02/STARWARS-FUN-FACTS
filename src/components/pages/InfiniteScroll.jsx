import { useContext, useState, useRef, useCallback } from "react";
import StarshipBrief from "../starships/StarshipBrief";
import { StarshipsContext } from "../context/StarshipsContext";

import useInfiniteScrollApi from "../useInfiniteScrollApi";
const AllStarshipsPage = () => {
  const ctx = useContext(StarshipsContext);
  const starshipsArr = ctx.starships;
  const [url, setUrl] = useState("https://swapi.dev/api/starships");
  const [pageNumber, setPageNumber] = useState(1);
  const { hasMore, loading, error } = useInfiniteScrollApi(pageNumber, url);

  const observer = useRef();
  const lastStarshipRef = useCallback(
    (node) => {
      console.log(node);
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          console.log("visible");
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
          console.log(pageNumber);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const starshipList = starshipsArr.map((element, index) => {
    if (starshipsArr.length === index + 1) {
      return (
        <div
          id={element.id}
          onClick={ctx.handleClickShip}
          ref={lastStarshipRef}
          key={element.id}
        >
          <p>{element.id}</p>
          <h4>{element.name}</h4>
          <h5>{element.model}</h5>
          <p>"I'm the last one"</p>
        </div>
      );
    } else {
      return (
        <StarshipBrief
          key={element.id}
          id={element.id}
          name={element.name}
          model={element.model}
          handleClickShip={ctx.handleClickShip}
        />
      );
    }
  });

  return (
    <div>
      <h1>Here's a list of starships</h1>
      {[...starshipList]}
      <div>{loading && "Loading..."}</div>
      <div>{error && "Error"}</div>
    </div>
  );
};

export default AllStarshipsPage;
