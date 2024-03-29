import React from "react";
import { Link } from "react-router-dom";
import style from "./LandingPage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";


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
            <div className={`${style.container_icon}`}>
                <a href="https://github.com/Matias257987" target='_blank' rel="noreferrer"><FontAwesomeIcon icon={ faGithub } className={`${style.icon}`}/></a>
                <a href="https://www.linkedin.com/in/matias-acosta-32c" target='_blank' rel="noreferrer"><FontAwesomeIcon icon={ faLinkedin } className={`${style.icon}`}/></a>
            </div>
        </div>
    );
};

export default LandingPage;