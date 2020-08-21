import React from 'react';
import CrumbComponent from './crumbComponent.js';

import {
    BrowserRouter as Router,
    Link,
    useParams
  } from "react-router-dom";

  function getItemBySlug(termArr, slug){
    return termArr.find( term => term.url == slug );
  }
  
  function getRandom(arr, x){
    let newArr = [];
    for (let i = 0; i < x; i++) {
        const x =  arr[Math.floor(Math.random() * arr.length)];
        newArr.push(x);
    }
    return newArr;
  }

  export default function SingleComponent(props) {
    
    const terms = props.terms;
    let { id } = useParams();

    const termObj = getItemBySlug(terms, id );

    return (

        <div>
            <CrumbComponent activeTerm={ termObj }></CrumbComponent>

            <div className="singleTerm">
                <div className="side">
                        <strong className="backBtn"><Link to="/">view all</Link></strong><br />
                        <ul>
                            <li className="related">random other terms</li>
                            { getRandom(terms, 3).map( item => {
                                return( <li><Link to={ item.url }>{ item.Term }</Link></li> );
                            }) }
                        </ul>
                        {/* {  terms.map( term => { */}
                            {/* // return <a href="#">{ term }</a> */}
                        {/* })} */}
                </div>
                <div className="main">
            
                    <div className="animated fadeIn" key={ termObj.url } >
                        <div className="mainTitle">
                            <h1>{ termObj.Term }</h1>
                        </div>
                        <i>{ termObj.Type } term</i>
                        
                        {/*<!-- Definition would be good for SEO --> */}
                        <p>Definition: { termObj.Definition }</p> 

                        {/* <p>Synonyms</p> */}
                        {/* <p>Acronyms</p> */}
                        {/* <p>external links</p> */}
                    </div>

                </div>
            </div>
        </div>
    );
  

  



}

