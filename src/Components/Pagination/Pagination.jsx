import React from 'react'
import { useRef } from 'react';

const Pagination = ({arrayPages, currentPage, setCurrentPage, quantityPages}) => {

  const listNumber = useRef()

    const prevPage = () => {
      if(currentPage - 1 === 0){
        setCurrentPage(quantityPages)
      } else {
      setCurrentPage(currentPage - 1)
    }    
  }

  const nextPage = () => {
    if(currentPage + 1 > quantityPages){
      setCurrentPage(1)
    } else {
    setCurrentPage(currentPage + 1)
  }    
}

const changePageTo = n => setCurrentPage(n) 

        return (
          <div className='pagination-container'>
          <div onClick={prevPage} className='prev'>&#60;</div>
          <ul ref={listNumber}>
            {
              arrayPages?.map(num => (
                <li onClick={() => changePageTo(num)} key={num} className='pagination_number'>{num}</li>
              ))
            }
          </ul>
          <div onClick={nextPage} className='next'>&#62;</div>
          </div>
        );
      };



export default Pagination