import React from "react";
import ReactTable from "react-table";
import 'react-table/react-table.css';
import './index.css';
import books from './books.json';
import endings from './endings.json';
import cloneDeep from 'lodash/cloneDeep';

var bookColumns = [{
    id: 'id',
    Header: '',
    accessor: 'id',
    Cell: props => <a href={"book/" + props.value}>LINK </a>,
    width: 50,
}, {
    id: 'TitleColumnId',
    Header: 'Title',
    accessor: 'title',
    Cell: props => props.value,
    width: 300,
    filterable: true,
    filterMethod: (filter, row) =>
        row[filter.id].startsWith(filter.value)
}, {
    id: 'AuthorColumnId',
    Header: 'Author',
    accessor: 'author',
    width: 400
}, {
    id: 'RankColumnId',
    Header: 'Rank',
    accessor: 'rank',
    width: 100
}];

var endingsColumns = [ {
    id: 'EndingsTitleColumnId',
    Header: 'Endings title',
    accessor: 'endingsTitle',
    width: 300,
    filterable: true,
    filterMethod: (filter, row) =>
        row[filter.id].startsWith(filter.value)
},  {
    id: 'TitleColumnId',
    Header: 'Books Title',
    accessor: 'relatedBook',
    Cell: props => <a href={"book/" + props.value.booksId}>{props.value.booksTitle} </a>,
    width: 300
}, {
    id: 'AuthorColumnId',
    Header: 'Books Author',
    accessor: 'relatedBook',
    Cell: props => props.value.booksAuthor,
    width: 400
}, {
    id: 'RankColumnId',
    Header: 'Rating',
    accessor: 'rating',
    width: 200
}]

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

export class Header extends React.Component {

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
            tableDataset: cloneDeep(books),
            tableColumns: cloneDeep(bookColumns)
        }
    }

    renderBooksTable() {
        return <ReactTable
            data={this.state.tableDataset}
            columns={this.state.tableColumns}
            defaultPageSize={10}
        />
    }

    handleBooksClick() {
        this.setState({tableColumns: cloneDeep(bookColumns), tableDataset:cloneDeep(books)});
    }

    handleEndingsClick() {
        console.log(this);
        this.setState({tableColumns:endingsColumns});
        this.setState({tableDataset:endings});
    }

    render() {
        return (
            <div className="TableContainer">
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
                <div className="BookEndingsButtons">
                    <form id="bookEndingsForm">
                        <label>
                            <input type="radio" name="bookending" defaultChecked={true} value="books"
                                   onClick={() => this.handleBooksClick()}/>Books
                        </label><br/>
                        <label>
                            <input type="radio" name="bookending" value="endings" defaultChecked={false}
                                   onClick={() => this.handleEndingsClick()}/>Endings
                        </label><br/>
                    </form>
                </div>
                <div className="TableDiv">
                    {this.renderBooksTable()}
                </div>
            </div>
        );
    }
}

class Main extends React.Component {
    render() {
        var date = new Intl.DateTimeFormat('en-GB').format(Date.now());
        return (
            <div className="page">
                <Header username='Marcin Lason' date={date} appTitle='Book Endings Store'/>
                <TableContainer/>
            </div>);
    }
}

export default Main