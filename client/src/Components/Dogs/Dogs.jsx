import React from "react";
import style from "./Dogs.module.css";

export default function Dogs({ image, name, temperaments }) {
    return (
        <div className={`${style.main_container}`}>
            <div className={`${style.container}`}>
                <img className={`${style.image}`} src={`${image}`} alt={`${name}`} />
            </div>
            <h2>{name}</h2>
            <div className={`${style.temperaments}`}>
                {temperaments.map((e) => <h3 key={e+Math.random}>{e}</h3>)}
            </div>
        </div>
    );
};
