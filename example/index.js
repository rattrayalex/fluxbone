var Backbone = require('backbone');
var React = require('react/addons');
var FluxBone = require('fluxbone');

// create your models (typically in another file via Browserify et al)
var Author = Backbone.Model.extend({});
var Book = Backbone.Model.extend({});
var Books = Backbone.Collection.extend({
    model: Book
});

// some dummy data.
var tolkein = new Author({'name': 'Tolkein'});
var lotr_series = new Books([
    {'title': 'The Fellowship of the Ring'},
    {'title': 'The Two Towers'},
    {'title': 'The Return of the King'}
]);

// the ListView
var TolkeinBookShelf = React.createClass({
    mixins: [
        // will trigger this.forceUpdate() on `all` events of the `books` collection.
        FluxBone.Mixin('books'),
        React.addons.PureRenderMixin
    ],
    render: function () {
        return React.createElement('ul', {},
            this.props.books.models.map(function (book) {
                return React.createElement(Book, {
                    key: book.cid,
                    book: book,
                    author: tolkein
                })
            })
        );
    }
});

// the ItemView
var Book = React.createClass({
    mixins: [
        // triggers `this.forceUpdate()` whenever the `book`'s "change" event is fired.
        FluxBone.Mixin('book', 'change'),
        // triggers `this.handleAuthorChange()` on the `author`'s "change" event.
        FluxBone.Mixin('author', 'change', 'handleAuthorChange'),
        React.addons.PureRenderMixin
    ],
    handleAuthorChange: function (model, options) {
        alert('what do you mean, the author changed?');
    },
    render: function(){
        return React.createElement('li', {},
            'This book is ' + this.props.book.get('title') +
            ', by ' + this.props.author.get('name')
        )
    }
});

React.render(
    React.createElement(TolkeinBookShelf, {books: lotr_series}),
    document.body
);

// renders:
// <ul>
//      <li>This book is The Fellowship of the Ring, by Tolkein</li>
//      <li>This book is The Two Towers, by Tolkein</li>
//      <li>This book is The Return of the King, by Tolkein</li>
// </ul>