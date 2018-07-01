import React from 'react';
import books from './books.json';
import image0 from './assets/0.jpg';
import image1 from './assets/1.jpg';
import image2 from './assets/2.jpg';
import image3 from './assets/3.jpg';


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

    render() {
        var id = (this.props.url).split("/book")[1].replace('/', '');
        var currentBook = books[parseInt(id)];
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
            </div>
        );
    }
}

const Book = () => {
    var url = window.location.href;
    return (
        <div className="book">
            <BookParameters url={url}/>
        </div>
    );
}

export default Book;