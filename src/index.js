import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import Book from './book';
import Main from './main';

class App extends React.Component {
    render() {
        return (
            <div>
                <Router>
                    <div>
                        <Route exact path="/" component={Main}/>
                        <Route path="/book" component={Book}/>
                    </div>
                </Router>
            </div>
        );
    }
}

ReactDOM.render(
    <App/>, document.getElementById('root')
);