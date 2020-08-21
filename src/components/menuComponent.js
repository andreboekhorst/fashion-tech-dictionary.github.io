import React, { useRef, useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Link,
  useLocation,
  useHistory
} from "react-router-dom";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
}

 const MenuComponent = (props) => {
    let   query       = useQuery();
    const history     = useHistory();

    const callBack    = props.callBack;
    const allFilters  = props.filters;

    const filtery = query.get('active') && query.get('active').split(',');
    const [activeFilters, setActiveFilters] = useState( filtery || allFilters );
    let _activeFilters = [];

    const toggleFilter = (e, filter) => {
        e.preventDefault();

        if( allFilters.length <= activeFilters.length){
          activeFilters.splice(0,activeFilters.length);
          activeFilters.push( filter );

        } else if ( activeFilters.length == 1 && activeFilters.includes(filter) ) {


        } else if ( activeFilters.includes(filter) ) {
          const filterPos       = activeFilters.indexOf( filter );
          activeFilters.splice(filterPos, 1);
          
        } else {
          activeFilters.push( filter );
        }

        // if less then toggle.


        // const filterPos       = activeFilters.indexOf( filter );
        
        // if( filterPos >= 0 ){
        //   activeFilters.splice(filterPos, 1)
        // } else {
        //   activeFilters.push( filter );
        // }

        history.push({
          pathname: '/',
          search: '?active=' + activeFilters.join(',')
        })
        
        setActiveFilters( activeFilters );
        callBack( activeFilters );
   
    }

    const isActiveFilter = filter => {
      return activeFilters.includes(filter)
    }

    return (
      <div className="menuBar">

      <div className="filters">
        { allFilters.map( (filter, i) => {
            if( filter == '' ) return false;
            return (
              <span key={ filter }>
                <a onClick={ e => toggleFilter(e, filter) } className={ isActiveFilter(filter) ? '' : 'disabled' }>{ filter }</a>
              </span>
            )
          })
        }
      </div>
      <div className="rightSide">
          <Link to="/about">about</Link>
        </div>
    </div>
    );
}

export default MenuComponent

