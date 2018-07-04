import React from 'react';
import books from './books.json';
import endings from './endings.json';
import image0 from './assets/0.jpg';
import image1 from './assets/1.jpg';
import image2 from './assets/2.jpg';
import image3 from './assets/3.jpg';
import './books.css';
import StarRatingComponent from 'react-star-rating-component';
import {Header} from './main'

class StarComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            rating: this.props.rate
        };
    }

    onStarClick(nextValue, prevValue, name) {
        this.setState({rating: nextValue});
    }

    render() {
        const {rating} = this.state;

        return (
            <div>
                <StarRatingComponent
                    name="rate1"
                    starCount={5}
                    value={rating}
                    onStarClick={this.onStarClick.bind(this)}
                />
            </div>
        );
    }
}


class BookParameters extends React.Component {

    getImageToDisplay(id) {
        if (id == 0) {
            return image0;
        }
        if (id == 1) {
            return image1;
        }
        if (id == 2) {
            return image2;
        } else {
            return image3;
        }
    }

    prepareEndings(book) {
        var id = parseInt(book['id']);
        var endingsToList = [];
        endings.map(ending => {if (parseInt(ending['relatedBook']['booksId'].toString()) == id) endingsToList.push(<a href={'/'} > {ending['endingsTitle']} </a>)});
        return endingsToList;
    }

    render() {
        var id = (this.props.url).split("/book")[1].replace('/', '');
        var currentBook = books[parseInt(id)];
        var comment1String = currentBook['comments']['comment1']['date'].toString();
        var comment1StringName = currentBook['comments']['comment1']['name'].toString();
        var comment1StringText = currentBook['comments']['comment1']['text'].toString();
        var comment2String = currentBook['comments']['comment2']['date'].toString();
        var comment2StringName = currentBook['comments']['comment2']['name'].toString();
        var comment2StringText = currentBook['comments']['comment2']['text'].toString();
        var endingsString = this.prepareEndings(currentBook);
        return (
            <div>
                <div id="bookParameters">
                    <td className="bookParams"> Tytuł:</td>
                    <td id="bookTitle" className="bookDetails">{currentBook['title']}</td>
                    <br/>
                    <td className="bookParams"> Autor:</td>
                    <td id="bookAuthor" className="bookDetails">{currentBook['author']}</td>
                    <br/>
                    <td className="bookParams"> Rok wydania:</td>
                    <td id="bookYear" className="bookDetails">{currentBook['year']}</td>
                    <br/>
                    <td className="bookParams"> Wydawnictwo:</td>
                    <td id="bookPublisher" className="bookDetails">{currentBook['publisher']}</td>
                    <br/>
                    <td className="bookParams"> Numer ISBN:</td>
                    <td id="bookNumber" className="bookDetails">{currentBook['number']}</td>
                    <br/>
                    <td className="bookParams"> Liczba stron:</td>
                    <td id="bookPages" className="bookDetails">{currentBook['pages']}</td>
                    <br/>
                    <td className="bookParams"> Gatunek:</td>
                    <td id="bookDomain" className="bookDetails">{currentBook['domain']}</td>
                    <br/>
                </div>
                <div id="bookImage">
                    <img id="bookImg" src={this.getImageToDisplay(id)} alt="Logo"/>
                </div>
                <div id="start">
                    <StarComponent rate={currentBook['rank']}/>
                </div>
                <div>
                    <textarea disabled id="description-area">{currentBook['description']}</textarea>
                </div>
                <div id="com-end">
                    <div id="comments">
                        <h1>Komentarze</h1>
                        <textarea disabled={true} id="comments-area">
                            {comment1String + ' ' + comment1StringName + '\n' + comment1StringText + '\n ' + '\n' + comment2String + ' ' + comment2StringName + '\n' + comment2StringText + '\n ' + '\n'}
                        </textarea>
                    </div>
                    <div id="endings">
                        <h1>Zakończenia alternatywne</h1>
                        <div id="endings-div">
                            <div id="endings-area">
                                {endingsString.map(ending => <p>{ending}</p>)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const Book = () => {
    var url = window.location.href;
    var date = new Intl.DateTimeFormat('en-GB').format(Date.now());
    return (
        <div className="book">
            <Header username='Marcin Lason' date={date} appTitle='Book Endings Store'/>
            <div className="container">
                <BookParameters url={url}/>
            </div>
        </div>
    );
}

export default Book;