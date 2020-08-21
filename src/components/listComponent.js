import React, { useRef, useEffect, useState } from 'react';
import {
  Link,
} from "react-router-dom";

 const ListComponent = props => {

    let newCategory = '';
    const terms  = props.terms;

    return <div className="termList">

      { terms.map( item => {
        
        if (item.Term == '') return '';
        const isNewCategory = item.url.charAt(0) != newCategory;

        newCategory = item.url.charAt(0);
        const elements = [];

        if( isNewCategory ){
          elements.push( 
            <h1 key={ newCategory }>{ newCategory }</h1>
          );
        }

        elements.push(
          <Link to={ "/term/" + item.url } key={ item.slug } className={ item.Type }>{ item.Term }</Link>
        )
        return elements;
      })
      } 
    </div>
}

export default ListComponent

