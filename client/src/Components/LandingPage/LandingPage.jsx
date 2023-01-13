import React from "react";
import { Link } from "react-router-dom";
import style from "./LandingPage.module.css";

function LandingPage() {
    return (
        <div className={`${style.main_container}`}>
            <div className={`${style.container}`}>
                <h1>Breed Web</h1>
                <h3>Dog Breed Library</h3>
                <div id={`${style.paragraph}`}>
                    <p>On this web you can find details of the dog<br/> breeds or create them yourself</p>
                </div>
                <Link to='/home'>
                    <button id={`${style.button}`}>Go Home</button>
                </Link>
            </div>
        </div>
    );
};

export default LandingPage;