import React from "react";
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

    columns = [{
        id: 'TitleColumnId',
        Header: 'Title',
        accessor: 'title',
        Cell: props => <a href={"book/" + props.value}>{props.value}</a>,
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
    }]

    renderBooksTable() {
        return <ReactTable
            data={books}
            columns={this.columns}
            defaultPageSize={10}
        />
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