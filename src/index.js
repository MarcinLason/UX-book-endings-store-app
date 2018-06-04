import React from 'react';
import ReactDOM from 'react-dom';
import ReactTable from "react-table";
import 'react-table/react-table.css';
import './index.css';
import books from './books.json';
import endings from './endings.json';

class HeaderBlock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.title,
            id: this.props.id
        }
    }

    render() {
        return (
            <div className='HeaderBlock' id={this.props.id}>
                <h1 className={this.props.className}>{this.props.title}</h1>
            </div>
        )
    }
}

class Header extends React.Component {

    renderHeaderBlock(title, id) {
        return <HeaderBlock title={title} id={id}/>
    }

    render() {
        return (
            <div className="Header">
                {this.renderHeaderBlock(this.props.date, 'Date')}
                {this.renderHeaderBlock(this.props.appTitle, 'AppTitle')}
                {this.renderHeaderBlock(this.props.username, 'Username')}
            </div>
        );
    }
}

class TableContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            columnsSet: [{
                Header: 'Author',
                accessor: d => {d.author}
            }]
        }
    }

    renderTable() {
        // return <ReactTable
        //     data={books}
        //     columns={this.props.columnsSet}/>
        return <Table/>
    }

    render() {
        return (
            <div className="TableContainer">
                <div className="Search">
                    <input type="text" id="searchInput" name="searchString" placeholder="Type to search..."/>
                </div>
                <div className="RadioButtons">
                    <form id="searchParameterForm">
                        <label>
                            <input type="radio" name="sort" value="ranking"/>Ranking
                        </label><br/>
                        <label>
                            <input type="radio" name="sort" value="new"/>Nowości
                        </label><br/>
                    </form>
                </div>
                <div className="TableDiv">
                    {this.renderTable()}
                </div>
            </div>
        );
    }
}

class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            booksVisible: true,
            books: books,
            endings: endings
        }
    }

    prepareRow(book) {
        return (
            <tr>
                <td></td>
                <td></td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td></td>
                <td>{book.rank}</td>
            </tr>
        )
    }

    render() {
        return (
            <table>
                <th>
                    <td></td>
                    <td></td>
                    <td>Tytuł</td>
                    <td>Autor</td>
                    <td>Komentarze</td>
                    <td>Ocena</td>
                </th>
                {this.state.books.map(book => this.prepareRow(book))}
            </table>
        )
    }
}

class Game extends React.Component {
    render() {
        var date = new Intl.DateTimeFormat('en-GB').format(Date.now());
        return (
            <div className="page">
                <Header username='Marcin Lason' date={date} appTitle='Book Endings Store'/>
                <TableContainer/>
            </div>
        );
    }
}

ReactDOM.render(
    <Game/>,
    document.getElementById('root')
);

