import React from 'react'

const Pagination = ({ pokemonsPerPage, totalPokemons, paginate }) => {

        const pageNumbers = [];
      
        for (let i = 1; i <= Math.ceil(totalPokemons / pokemonsPerPage); i++) {
          pageNumbers.push(i);
        }
      
        return (
          <div className='item-position'>
          <nav>
            <ul className='pagination'>
              {pageNumbers.map(number => (
              <li key={number} className='page-item'>
                <button onClick={() => paginate(number)} 
                href='!#' className='page-link paginationItem'>
                {number}
              </button>
                </li>
              ))}
            </ul>
          </nav>
          </div>
        );
      };



export default Pagination