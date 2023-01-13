import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { showDogsDetails } from '../../Redux/actions/index';
import style from "./DogDetails.module.css";

export default function DogDetail() {
    const dispatch = useDispatch();
    let { id } = useParams();

    useEffect(() => {
        dispatch(showDogsDetails(id));
    }, [dispatch, id]);

    const details = useSelector((state) => state.details);

    let nameDog, imageDog, temperamentDog = [], heightDog, weightDog, lifeSpanDog;

    if (details[0]) {
        nameDog = details[0].name;
        imageDog = details[0].image;
        heightDog = details[0].height;
        weightDog = details[0].weight;
        lifeSpanDog = details[0].life_span;

        if (details[0].temperaments[0]) temperamentDog = [...details[0].temperaments];
        if (details[0].temperaments[0].name) temperamentDog = details[0].temperaments.map((e) => e.name);  
    };

    return (
        <div className={`${style.main_container}`}>
            <Link to='/home'>
                <button className={`${style.button}`}>Home</button>
            </Link>
            <div className={`${style.container}`}>
                <div className={`${style.sub_container}`}>
                    <div>
                        <img id={`${style.image}`} src={imageDog} alt={`${nameDog}`} />
                    </div>
                    <div className={`${style.info_container}`}>
                        <h1>{nameDog}</h1>
                        <h3>{`Height: ${heightDog && heightDog[0]} - ${heightDog && heightDog[1]} cm`}</h3>
                        <h3>{`Weight: ${weightDog && weightDog[0]} - ${weightDog && weightDog[1]} kg`}</h3>
                        <h3>{`Lifespan: ${lifeSpanDog}`}</h3>
                        <div>
                            <h3>Temperaments</h3>
                            <ul id={`${style.list}`}>{temperamentDog.map((e) => <li key={e}>{e}</li>)}</ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};



