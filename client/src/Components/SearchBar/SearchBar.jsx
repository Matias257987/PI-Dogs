import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getBreed } from "../../Redux/actions/index";
import style from "./SearchBar.module.css";

export default function SearchBar() {
    const dispatch = useDispatch();
    const [searchDog, setSearchDog] = useState("");

    const handleInput = (e) => {
        e.preventDefault();
        setSearchDog(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(getBreed(searchDog));
    };

    return (
        <div className={`${style.searchBar_container}`}>
            <input className={`${style.searchBar}`} type="text" onChange={handleInput} placeholder='Search...' />
            <button className={`${style.searchBar_button}`} type="submit" onClick={handleSubmit}>Submit
            </button>
        </div>
    )
}
