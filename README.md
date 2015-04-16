FluxBone
--------
## Bind your Backbone Models & Collections to React Components

The usage pattern this library is intended for is described in [this article](http://www.toptal.com/front-end/simple-data-flow-in-react-applications-using-flux-and-backbone).

## Usage: 

```js
var MyComponent = React.createClass({
    mixins: [
        // runs this.forceUpdate() on `all` events on the model at this.myFirstProp
        FluxBone.ModelMixin("myFirstProp"), 

        // runs this.forceUpdate() on "change" events on this.mySecondProp
        FluxBone.ModelMixin("mySecondProp", "change"),

        // runs this.myCustomCallback() on "add", "remove", "reset" events on this.myThirdProp
        FluxBone.CollectionMixin("myThirdProp", "add remove reset", "myCustomCallback")
    ],
    myCustomCallback: function() {
        // ...
    },
    // ...
});
```

## Example

```js
var Backbone = require('backbone');
var React = require('react/addons');
var FluxBone = require('fluxbone');

// create your models (typically in another file via Browserify et al)
var Author = Backbone.Model.extend({})
var Book = Backbone.Model.extend({})
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

// the ItemView
var Book = React.createClass({
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
            'This book is ' + this.props.book.get('title') +
            ', by ' + this.props.author.get('name')
        )
    }
});

React.render(
    document.body, 
    TolkeinBookShelf({books: lotr_series})
);

// renders:
// <ul>
//      <li>This book is The Fellowship of the Ring, by Tolkein</li>
//      <li>This book is The Two Towers, by Tolkein</li>
//      <li>This book is The Return of the King, by Tolkein</li>
// </ul>

```
