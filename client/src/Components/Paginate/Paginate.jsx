import React from "react";
import style from "./Paginate.module.css";
import { useState } from "react";

export default function Paginate({ dogsByPage, allDogs, paginated, currentPage, setCurrentPage }) {
    const numberPage = [];
    const limitPage = 5;
    const [maxPage, setMaxPage] = useState(5);
    const [minPage, setMinPage] = useState(0);
    

    for (let i = 1; i <= Math.ceil(allDogs / dogsByPage); i++) {
        numberPage.push(i);
    };

    const onPrevClick = ()=>{
        if((currentPage -2) <= minPage && currentPage > 2){
            setMaxPage(maxPage -1);
            setMinPage(minPage -1);
        }
        setCurrentPage(prev => prev - 1);
    };

    
    const onNextClick = () => {
        if(currentPage + 2 >= limitPage){
            setMaxPage(maxPage +1);
            setMinPage(minPage +1);
        }
        setCurrentPage(next => next + 1);
    };

    const handlePageClick = (e)=>{
        paginated(Number(e.target.id));
    }

    const pageNumbers = numberPage.map(e => {
        console.log(maxPage);
        console.log(minPage);
        if (e <= maxPage && e > minPage) {
            return(
                <li key={e} id={e} onClick={handlePageClick} className={currentPage === e ? style.current_active : style.current}>{e}</li>
            );
        } else {
            return null;
        }
    })

    let pageIncrementEllipses = null;
    if(numberPage.length > maxPage){
        pageIncrementEllipses = <li className={`${style.ellipse}`} >&hellip;</li>
    }
    let pageDecremenEllipses = null;
    if(minPage > 1){
        pageDecremenEllipses = <li className={`${style.ellipse}`} >&hellip;</li> 
    }

    let pageMin = false;

    if (currentPage !== numberPage[0]) pageMin = true;

    let pageMax = false;

    if (currentPage !== numberPage.length) pageMax = true;

    return (
        <nav>
            <ul className={`${style.ul_container}`}>
               <li className={`${style.list}`}>
                    
                   <button className={currentPage === numberPage[0] ? style.disabled : style.prevAndNext} onClick={pageMin ? onPrevClick : null}>Prev</button>
               </li>
                {pageDecremenEllipses}
                {pageNumbers}
                {pageIncrementEllipses}
                <li className={`${style.list}`}>
                   <button className={currentPage === numberPage[numberPage.length-1] ? style.disabled : style.prevAndNext} onClick={pageMax ? onNextClick : null}>Next</button>
               </li>
            </ul>    
        </nav>
    );
};



            