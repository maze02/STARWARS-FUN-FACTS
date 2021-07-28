import { createContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const ActorsProvider = (props) => {
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

        console.log(
          "hey typeof result.data.results for actors is " +
            typeof result.data.results
        );
        const resultWithId = await addIdToArr(result.data.results);

        setActors(resultWithId);
        localStorage.setItem("actorsArr", JSON.stringify(resultWithId));

        const calculateTotalPages = Math.ceil(
          result.data.count / actorsPerPage
        );
        console.log("total: " + result.data.count);
        setTotalAPages(calculateTotalPages);
      };
      getActors();
    }
  }, []);

  //HANDLE SECOND CALL TO API
  useEffect(() => {
    const getActors = async () => {
      const actorsPerPage = 10;
      const url = `https://swapi.dev/api/people/?page=${currentAPage}`;
      const result = await axios.get(url);
      const resultWithId = addIdToArr(result.data.results);
      setActors(resultWithId);
      localStorage.setItem("actorsArr", JSON.stringify(resultWithId));
      const calculateTotalPages = Math.ceil(result.data.count / actorsPerPage);
      setTotalAPages(calculateTotalPages);
    };

    getActors();
  }, [currentAPage]);
  //HANDLE PREVIOUS PAGE
  const previousAPage = () => {
    const newCurrentAPage = currentAPage - 1;
    if (newCurrentAPage === 0) return;
    setCurrentAPage(newCurrentAPage);
    console.log("oi clicking back page");
    console.log("oi new curr page =" + newCurrentAPage);
    console.log("currentpage=" + currentAPage);
  };
  //HANDLE NEXT PAGE
  const nextAPage = () => {
    const newCurrentAPage = currentAPage + 1;
    if (newCurrentAPage > totalAPages) return;
    setCurrentAPage(newCurrentAPage);
    console.log("oi clicking next page");
    console.log("oi new curr page =" + newCurrentAPage);
    console.log("currentpage=" + currentAPage);
  };

  return (
    <ActorsContext.Provider
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
    </ActorsContext.Provider>
  );
};

export default ActorsProvider;
export const ActorsContext = createContext();

//Maria's Chanel errors!!!!:
/*
FORGETTING TO ADD A '.' between context and provider-> FOR GOODNESS SAKE!!!!

//forgetting to extra the results as an array from the api results caused function error

https://www.pluralsight.com/guides/typeerror-handling-in-react.js-for-map-function


Maria's Burkin Bag Error of the century
If you don't want to get state.map is not a function error
DON'T SET THE INITIAL STATE AS BOOLEAN!!!! Like truly wtf were you thinking
  const [actors, setActors] = useState(false); NOOOO
    const [actors, setActors] = useState([]); YESS
*/