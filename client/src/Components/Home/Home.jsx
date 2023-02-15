import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getAllDogs,
  getTemperaments,
  FilterByTemperament,
  OrderByName,
  OrderByWeight,
  filterByDB,
} from "../../Redux/actions/index";
import Dogs from "../Dogs/Dogs";
import Paginate from "../Paginate/Paginate";
import SearchBar from "../SearchBar/SearchBar";
import style from "./Home.module.css";

function Home() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs);
  const allTemperaments = useSelector((state) => state.temperaments);
  const [currentPage, setCurrentPage] = useState(1);
  const [order, setOrder] = useState("");
  console.log(order);
  const dogsByPage = 8;
  const lastIndex = currentPage * dogsByPage;
  const firstIndex = lastIndex - dogsByPage;
  const currentDogs = allDogs.slice(firstIndex, lastIndex);
  const paginated = (numberPage) => {
    setCurrentPage(numberPage);
  };

  useEffect(() => {
    dispatch(getAllDogs());
    dispatch(getTemperaments());
  }, [dispatch]);

  const handleFilterByTemperament = (e) => {
    e.preventDefault();
    dispatch(FilterByTemperament(e.target.value));
  };

  const handleOrderByName = (e) => {
    e.preventDefault();
    dispatch(OrderByName(e.target.value));
    setOrder(`Organized ${e.target.value}`);
  };

  const handleOrderByWeight = (e) => {
    e.preventDefault();
    dispatch(OrderByWeight(e.target.value));
    setOrder(`Organized ${e.target.value}`);
  };

  const handlerFilterByDB = (e) => {
    e.preventDefault();
    dispatch(filterByDB(e.target.value));
    setCurrentPage(1);
  };

  return (
    <>
      <header className={`${style.header}`}>
        <div className={`${style.header_container}`}>
          <Link to="/">
            <div id={`${style.logo}`}></div>
          </Link>
          <div className={`${style.searchbar_container}`}>
            <SearchBar />
            <div className={`${style.filtered}`}>
              <select onChange={handleOrderByName}>
                <option>Sort by name</option>
                <option value="A-Z">A-Z</option>
                <option value="Z-A">Z-A</option>
              </select>
              <select onChange={handleOrderByWeight}>
                <option>Sort by weight</option>
                <option value="max_weight">Max</option>
                <option value="min_weight">Min</option>
              </select>
              <select onChange={handleFilterByTemperament}>
                <option>Temperaments</option>
                <option value="All">All</option>
                {allTemperaments.map((temp) => (
                  <option value={temp.name} key={temp.id}>
                    {temp.name}
                  </option>
                ))}
              </select>
              <select onChange={handlerFilterByDB}>
                <option defaultValue="Api">Api</option>
                <option value="DB">DB</option>
              </select>
            </div>
          </div>
        </div>
        <div className={`${style.dogs}`}>
          <Link to="/dog">
            <button id={`${style.button_add}`}>CREATE DOG</button>
          </Link>
        </div>
      </header>
      <div className={`${style.main_container}`}>
        <div className={`${style.container_dogs}`}>
          {currentDogs.map((el) => {
            return (
              <div id={`${style.container_dog}`} key={el.id}>
                <Link to={"/dog-detail/" + el.id}>
                  {
                    <Dogs
                      key={el.id}
                      image={el.image}
                      name={el.name}
                      temperaments={
                        el.temperaments[0].name
                          ? el.temperaments.map((el) => el.name)
                          : el.temperaments
                      }
                    />
                  }
                </Link>
              </div>
            );
          })}
        </div>
        <div className={`${style.container_paginate}`}>
          <Paginate
            setCurrentPage={setCurrentPage}
            dogsByPage={dogsByPage}
            allDogs={allDogs.length}
            paginated={paginated}
            currentPage={currentPage}
          />
        </div>
      </div>
    </>
  );
}

export default Home;
