import React from "react";
import "@testing-library/jest-dom/extend-expect"
import {render} from "@testing-library/react"
import DetailCard from "../src/components/DetailCard/DetailCard";
import {Link} from "react-router-dom"

describe("<DetailCard />", () => {
  let detailCard2;
  let detailCard;
  let videogame1 ={
    name: "Mario 64",
    releaseDate: "10-05-1996",
    rating: 4.8,
    description: "Descripcion para el test",
    platforms: ["Nintendo 64"],
    genres:["Platform","Adventure"]
  }

  
  beforeEach(() => {
    detailCard2 = shallow(<DetailCard />);
    detailCard = (character) =>
      shallow(
        <DetailCard
          
        />
      );
    expect(isReact.classComponent(DetailCard)).toBeFalsy();
  });

  it('Debería renderizar un tag "img" y utilizar como source la imagen del equipo', () => {
    expect(detailCard(videogame1).find("img").at(0).prop("src")).toEqual(
      team1.image
    );
   
   
  });

  it('Debería renderizar un "p" que contenga la descripcion del videojuego', () => {
    expect(detailCard(videogame1).find("p").at(0).text()).toBe(`${videogame1.description}`);
    
  });

  it('Debería renderizar un "h4" que contenga el texto "Rating: " el rating del videojuego', () => {
    expect(detailCard(team1).find("h4").at(2).text()).toBe(
      `Ratign : ${videogame1.rating}`
    );
   
  });

  it('Debería renderizar un "h4" que contenga el texto "Released : " la fecha de lanzamiento', () => {
    expect(detailCard(videogame1).find("h4").at(1).text()).toBe(
      `Released: ${videogame1.releaseDate}`
    );
   
  });

  it('Debería renderizar un "h1" que contenga el nombre del videojuego', () => {
    expect(detailCard(team1).find("h1").at(0).text()).toBe(
      `${videogame1.name}`
    );
    
  });
  it('Debería renderizar un <Link to="" /> que vaya a "/" ', () => {
    expect(detailCard2.find(Link).at(0).prop("to")).toEqual("/");
    
  });
});
