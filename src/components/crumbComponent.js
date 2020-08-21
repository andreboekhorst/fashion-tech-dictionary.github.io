import React, { useRef, useEffect, useState } from 'react';
import terms from '../inventory/terms.json';
import img_search from '../assets/search.svg'
import img_cross from '../assets/cross.svg'
import Fuse from 'fuse.js';
import {
  Link,
} from "react-router-dom";

 const CrumbComponent = (props) => {

    const activeTerm    = props.activeTerm;

    console.log(' activeTerm', activeTerm)

    return (
      <div className="menuBar">
        <div className="breadcrumbs">
          <span className="hideSmall"><Link to="/">all</Link> <span>></span> <Link to={"/?active=" + activeTerm.Type } >{ activeTerm.Type }</Link> <span>></span> { activeTerm.Term }</span>
          <span className="hideLarge">View all</span>
        </div>
        <div className="rightSide">
          <Link to="/about">about</Link>
        </div>
    </div>
    );
}

export default CrumbComponent

