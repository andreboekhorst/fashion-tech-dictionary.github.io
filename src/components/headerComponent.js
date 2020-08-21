import React, { useRef, useEffect, useState } from 'react';
import terms from '../inventory/terms.json';
import img_search from '../assets/search.svg'
import img_cross from '../assets/x.svg'
import Fuse from 'fuse.js';
import {
  BrowserRouter as Router,
  Switch,
  useHistory,
  useRouteMatch,
  Route,
  Link,
  useParams
} from "react-router-dom";

 const HeaderComponent = (props) => {

    // HOOKS
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults ] = useState([]);
    const [searchActive, setSearchActive ] = useState(false);

    let history = useHistory();

    const searchInput = useRef(null);

    const termArr = terms.terms;

    const options = {
        shouldSort: true,
        threshold: 0.2,
        location: 0,
        distance: 100,
        minMatchCharLength: 5,
        keys: ['Term']
      };
  
    const fuse = new Fuse(termArr, options );

    //---------------------------------------------//

    document.addEventListener('keypress', (e) => {
      if( searchQuery.length == 0 ){
          searchInput.current.focus();
      }

    });

    const onSearchChange = e => {
        
        console.log( 'searchChange', e.target.value );

        setSearchQuery(e.target.value);
        setSearchResults( fuse.search(e.target.value).filter( x=> x.item.Term != '') )
    }

    const onSubmit = e => {
        e.preventDefault();
        if( searchResults.length > 0 ){
          onSearchClick( searchResults[0].item )
        } else {
          setSearchQuery('');
        searchInput.current.blur();

        }
    }

    const onSearchClick = term => {
        setSearchQuery('');
        setSearchResults([]);
        history.push('/term/' + term.url );
        searchInput.current.blur();
    }

    const setSearch = (e, val) => {
      e.preventDefault();

      if( val ){
        // useEffect(() => {
          searchInput.current.focus();
        // }, []);
      } else {
        setSearchQuery('');
        setSearchResults([]);
        searchInput.current.blur();
      }

    }

    const onFocus = e => {
      setSearchActive(true)
    }

    const onBlur = e => {
      setSearchActive(false);
      if( searchResults.length == 0 ){
        setSearchQuery('');
      }
    }

    return (
        <header>
          <div className="wrapper">
            
            <div className="title">
              FASHIONTECH DICTIONARY
            </div>

            <div className="searchHolder">
                
                <div className="buttons">
                  { !(searchActive || searchQuery.length>0) && <a href="" className="btnSearch" onClick={ (e) => setSearch(e, true) }><img src={ img_search } /></a> }
                  { (searchActive || searchQuery.length>0) && <a href="" className="btnClose" onClick={ (e) => setSearch(e, false) }><img src={ img_cross } /></a> }
                </div>

                <form onSubmit={ onSubmit }> 
                  
                    <input type="search" value={searchQuery} onChange={onSearchChange} onFocus={onFocus} onBlur={onBlur} ref={searchInput} maxLength="40" />
                </form>

                

            </div>

            { searchResults && searchResults.length > 0 && 
                <div className="searchResults">  
                  { 
                    searchResults.map( result => {
                      return(<div className="searchItem" key={result.item.url}>
                          <a onClick={ () => onSearchClick(result.item) }>{ result.item.Term }</a>
                      </div>)
                    })
                  }
                </div>
              }

          </div>
        </header>

    );
}

export default HeaderComponent

