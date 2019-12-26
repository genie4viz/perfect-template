import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import App from './App';
export default function RouterContainer () {
    return (
        <Router>
            <div>
                <Route exact path='/' component={App} />
                {/* <Route path='/edit/:id' component={Edit} />
                <Route path='/create' component={Create} />
                <Route path='/show/:id' component={Show} /> */}
            </div>
        </Router>
    )
}