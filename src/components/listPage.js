import React, { useRef, useEffect, useState } from 'react';
import MenuComponent from './menuComponent.js';
import ListComponent from './listComponent.js';
import {
  BrowserRouter as Router,
  Link,
  useLocation,
  useHistory
} from "react-router-dom";

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  }

  const filterBy = (terms, filters) => {
    return (filters)
      ? terms.filter( term => filters.includes(term.Type) )
      : terms
  }

 const ListPage = props => {

    let query = useQuery();

    const terms           = props.terms;
    const queryFilters    = query.get('active') && query.get('active').split(',');
    const _filteredTerms  = filterBy( terms, queryFilters );

    const [filteredTerms, setFilteredTerms] = useState(_filteredTerms);




    const getTypes = ( allTerms ) => {
      return onlyUnique(allTerms.map( item => item.Type ));
    }

    const onlyUnique = arr => { 
      return arr.filter( (value, index, array) => array.indexOf(value) === index); 
    }

    const onFilterCallback = updatedFilters => {
      setFilteredTerms( filterBy(terms, updatedFilters) );
    }
  
    return <div>
      <MenuComponent callBack={ onFilterCallback } filters={ getTypes( terms ) }></MenuComponent>
      <ListComponent terms={ filteredTerms }></ListComponent>
    </div>
}

export default ListPage

