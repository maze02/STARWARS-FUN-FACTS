import ShipItem from "../characters/ShipItem";
import classes from "../starships/PilotList.module.css";

const ShipList = ({ shipListArr, loadShips, characterName, shipImgInfo }) => {
  if (loadShips) {
    return <p className="textcenter">Starships loading...</p>;
  } else {
    if (!loadShips) {
      let shipsListLocal = localStorage.getItem("shipsCharacter");
      let shipListImgs = localStorage.getItem("shipImgs");
      if (shipsListLocal) {
        shipListArr = JSON.parse(shipsListLocal);
        let shipImgArr = JSON.parse(shipListImgs);
        for (let i = 0; i < shipListArr.length; i++) {
          if (shipListArr[i].img === undefined) {
            shipListArr[i].img = shipImgArr[i];
          }
        }
      }
      if (shipListArr.length === 0) {
        return (
          <p className="textcenter">
            No record of {characterName} ever flying any starships.
          </p>
        );
      } else {
        let shipListContent = shipListArr.map((e) => {
          return (
            <ShipItem
              key={e.id}
              shipName={e.name}
              shipImg={e.img}
              crew={e.crew}
              passengers={e.passengers}
              speed={e.max_atmosphering_speed}
            />
          );
        });
        return (
          <div className={classes.pilotListWrapper}>{[...shipListContent]}</div>
        );
      }
    }
  }
};

export default ShipList;

//Recurrent Armani Error
//Keep forgetting to destructure the context I import from the path right at the top
//comes up as undefined

/*
  if (pilotListArr.length === 0) {
    return <p>No record of pilots flying this starship</p>;
  } else {
    let pilotListContent = pilotListArr.map((e) => {
      return (
        <PilotItem
          pilotName={e.name}
          height={`${Number(e.height) / 100}m`}
          planet={e.homeworld}
        />
      );
    });
    return <div>{[...pilotListContent]}</div>;
  }
  */

/*
  if (pilotListArr.length === 0) {
    return <p>No record of pilots flying this starship</p>;
  } else {
    let pilotListContent = pilotListArr.map((e) => {
      return (
        <PilotItem
          pilotName={e.name}
          height={`${Number(e.height) / 100}m`}
          planet={e.homeworld}
        />
      );
    });
    return <div>{[...pilotListContent]}</div>;
  }
  */