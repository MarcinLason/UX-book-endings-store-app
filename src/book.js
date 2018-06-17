import React from 'react';


class BookParameters extends React.Component {
    render () {
        return (
            <h1>Book!!</h1>
        );
    }
}

const Book = () => {
    return (
        <div className="book">
           <BookParameters/>
        </div>
    );
}

export default Book;