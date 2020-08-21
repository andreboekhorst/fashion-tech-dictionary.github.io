import React, { useRef, useEffect, useState } from 'react';

import Fuse from 'fuse.js';

import {groupBy} from 'lodash';
import logo from './logo.svg';
import terms from './inventory/terms.json';
import SingleComponent from './components/singleComponent.js';
import HeaderComponent from './components/headerComponent.js';
import ListPage from './components/listPage.js';
import ListComponent from './components/listComponent.js';
import ScrollToTop from './components/ScrollToTop.js';
import {
  BrowserRouter as Router,
  Switch,
  useHistory,
  useRouteMatch,
  Route,
  Link,
  useParams
} from "react-router-dom";

import img_404 from './assets/404.gif'
import './animate.css';
import './App.css';

const sortBySlug = arr => {
  return arr.sort((a, b) => (a.url > b.url) ? 1 : -1)
}



// https://stackoverflow.com/questions/43822589/react-router-v4-browserhistory-is-undefined
const App = () => {

  const allTerms = sortBySlug(terms.terms).filter( term => term.Term != '' );
  
  return (
    <Router>
     

      <div className="App">

        <HeaderComponent></HeaderComponent>
     
      
        <div className="mainSection">

          <Switch>

            <Route path="/about">
              <div>
                <h1>Speak</h1>
                <p>speak eachothers language, this dictionary is made


                  FashionTech is a place where two diametrical worlds come together.

                  Where innovation of tech and the creativity of fashion come together.

                  Brought to you by the people from HATCH - where the Digital Showroom has its home.

                  ___

                  Do you have any questions or remarks, feel free to reach out to fashiontech-dictionary@hatchstudio.co.

                  meant for fashion people we need to understand tech, and techies that want to understand fashion.

                </p>
              </div>
            </Route>

            <Route path="/term/:id">
                <ScrollToTop>
                    <SingleComponent terms={ allTerms } />
                </ScrollToTop>
            </Route>
              
            <Route exact path="/">
              <ListPage terms={ allTerms }></ListPage>
            </Route>            

            <Route path="*">
              <div className="singleTerm">
                <h1>404 - Page not found</h1>
                <p>
                  <img src={ img_404 } />
                </p>
              </div>
            </Route>

          </Switch>

      </div>
      


      <footer>
        <a href="https://hatchstudio.co" target="_new">Brought to you by the team at HATCH. Come join us! </a>
      </footer>

      <Route path="/term/:id">
        <div className="footerList">
          <ListComponent terms={ allTerms }></ListComponent>
        </div>
      </Route>

      </div>


    </Router>
  )

}

export default App
