FluxBone
--------
## Bind your Backbone Models & Collections to React Components

The usage pattern this library is intended for is described in [this article](http://www.toptal.com/front-end/simple-data-flow-in-react-applications-using-flux-and-backbone).

## Usage: 

```js
Backbone = require('backbone');
React = require('react/addons');
FluxBone = require('fluxbone');

Author = Backbone.Model.exented({})
Book = Backbone.Model.exented({})
Books = Backbone.Collection.extend({
    model: Book
});

tolkein = new Author({'name': 'Tolkein'})

BookShelf = React.createClass({
    mixins: [
        // will trigger this.forceUpdate() on `all` events of the `books` collection.
        FluxBone.CollectionMixin('books'),
        React.addons.PureRenderMixin
    ],
    render: function () {
        return React.DOM.ul({},
            this.props.books.models.map(function (book) {
                return Book({book: book, author: tolkein})
            });
        );
    }
});

Book = React.createClass({
    mixins: [
        // triggers `this.forceUpdate()` whenever the `book`'s "change" event is fired.
        FluxBone.ModelMixin('book', 'change'),
        // triggers `this.handleAuthorChange()` on the `author`'s "change" event.
        FluxBone.ModelMixin('author', 'change', 'handleAuthorChange'),
        React.addons.PureRenderMixin
    ],
    handleAuthorChange: function (model, options) {
        alert('what do you mean, the author changed?');
    },
    render: function(){
        return React.DOM.li({}, 
            "This book is called " + this.props.book.get('title')
        )
    }
});

```
