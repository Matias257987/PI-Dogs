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
        if((currentPage-1) % limitPage === 0){
            setMaxPage(maxPage - limitPage);
            setMinPage(minPage - limitPage);
        }
        setCurrentPage(prev=> prev-1);
    };

    
    const onNextClick = ()=>{
        if(currentPage + 1 > maxPage){
            setMaxPage(maxPage + limitPage);
            setMinPage(minPage + limitPage);
        }
        setCurrentPage(prev=>prev+1);
    };

    const handlePageClick = (e)=>{
        paginated(Number(e.target.id));
    }

    const pageNumbers = numberPage.map(e => {

        if (e <= maxPage  && e > minPage) {
            return(
                <li key={e} id={e} onClick={handlePageClick} className={currentPage === e ? style.current_active : style.current}>{e}</li>
            );
        } else {
            return null;
        }
    })

    let pageIncrementEllipses = null;
    if(numberPage.length > maxPage){
        pageIncrementEllipses = <li className={`${style.ellipse}`} onClick={onNextClick}>&hellip;</li>
    }
    let pageDecremenEllipses = null;
    if(minPage >= 1){
        pageDecremenEllipses = <li className={`${style.ellipse}`} onClick={onPrevClick}>&hellip;</li> 
    }

    return (
        <nav>
            <ul className={`${style.ul_container}`}>
               <li className={`${style.list}`}>
                   <button className={currentPage === numberPage[0] ? style.disabled : style.prevAndNext} onClick={onPrevClick}>Prev</button>
               </li>
                {pageDecremenEllipses}
                {pageNumbers}
                {pageIncrementEllipses}
                <li className={`${style.list}`}>
                   <button className={currentPage === numberPage[numberPage.length-1] ? style.disabled : style.prevAndNext} onClick={onNextClick}>Next</button>
               </li>
            </ul>    
        </nav>
    );
};



            