import { createContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const CharactersProvider = (props) => {
  const history = useHistory();
  const [actors, setActors] = useState([]);

  const [currentAPage, setCurrentAPage] = useState(1);
  const [totalAPages, setTotalAPages] = useState(1);

  const addIdToArr = (arr) => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].id === undefined) {
        arr[i].id = arr[i].url.substring(29, arr[i].url.length - 1);
        arr[i].apiPage = currentAPage;
      }
    }
    return arr;
  };

  //CALLING API
  //FIRST CALL UPON LOAD
  useEffect(() => {
    let initialActors = localStorage.getItem("actorsArr");
    if (!initialActors) {
      initialActors = [];
    }
    if (initialActors && initialActors.length) {
      let arr = [...JSON.parse(initialActors)];
      console.log(arr);
      if (arr[0].apiPage === 1) {
        setActors(arr);
      }
      return;
    } else {
      const getActors = async () => {
        const actorsPerPage = 10;
        const url = `https://swapi.dev/api/people/?page=1`;
        const result = await axios.get(url);
        console.log("result.data.results =" + result.data.results);

        const resultWithId = await addIdToArr(result.data.results);

        setActors((prev) => resultWithId);
        localStorage.setItem("actorsArr", JSON.stringify(resultWithId));

        const calculateTotalPages = Math.ceil(
          result.data.count / actorsPerPage
        );
        console.log("total: " + result.data.count);
        setTotalAPages((prev) => calculateTotalPages);
      };
      getActors();
    }
  }, []);

  //HANDLE SECOND CALL TO API
  useEffect(() => {
    const getActors = async () => {
      const actorsPerPage = 10;
      const url = `https://swapi.dev/api/people/?page=${currentAPage}`;
      try {
        const result = await axios.get(url);
        const resultWithId = addIdToArr(result.data.results);
        setActors((prev) => resultWithId);
        localStorage.setItem("actorsArr", JSON.stringify(resultWithId));
        const calculateTotalPages = Math.ceil(
          result.data.count / actorsPerPage
        );
        setTotalAPages((prev) => calculateTotalPages);
      } catch (error) {
        console.log(error.response);
      }
    };

    getActors();
  }, [currentAPage]);

  //HANDLE PREVIOUS PAGE
  const previousAPage = () => {
    const newCurrentAPage = currentAPage - 1;
    if (newCurrentAPage === 0) return;
    setCurrentAPage((prev) => newCurrentAPage);
    };
  //HANDLE NEXT PAGE
  const nextAPage = () => {
    const newCurrentAPage = currentAPage + 1;
    if (newCurrentAPage > totalAPages) return;
    setCurrentAPage((prev) => newCurrentAPage);
    };

  return (
    <CharactersContext.Provider
      value={{
        actors: actors,
        setActors: setActors,
        currentAPage: currentAPage,
        setCurrentAPage: setCurrentAPage,
        totalAPages: totalAPages,
        setTotalAPages: setTotalAPages,
        previousAPage: previousAPage,
        nextAPage: nextAPage,
        history: history,
      }}
    >
      {props.children}
    </CharactersContext.Provider>
  );
};

export default CharactersProvider;
export const CharactersContext = createContext();
