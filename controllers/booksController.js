var book = require('../schemas/book');

exports.getBooks = {
  auth: {
    mode:'required',
    strategy:'session',
    scope: ['regular','admin']
  },
  handler: function(request, reply){
    var books = book.find({});
    reply(books);
  }
}

exports.getBook = {
  auth: {
    mode:'required',
    strategy:'session',
    scope: ['regular','admin']
  },
  handler: function(request, reply){
    var books = book.find({_id:request.params.bookId});
    reply(books);
  }
}

exports.createBook = {
  auth: {
    mode:'required',
    strategy:'session',
    scope: ['admin']
  },
  handler: function(request, reply){
    var newBook = new book({
      title: request.payload.title,
      year: request.payload.year,
      editorial: request.payload.editorial,
      author: request.payload.author
    });
    newBook.save();
    console.log('book saved');
    return reply('ok');
  }
}

exports.updateBook = {
  auth: {
    mode:'required',
    strategy:'session',
    scope: ['admin']
  },
  handler: function(request, reply){
    var filterBy = request.params.bookId;
    var newBooktitle = request.payload.title;
    var newBookyear = request.payload.year;
    var newBookeditorial = request.payload.editorial;
    var newBookAuthor = request.payload.author;
    book.findOneAndUpdate(
      { _id: filterBy },
      {
        title: newBooktitle,
        year: newBookyear,
        editorial: newBookeditorial,
        author: newBookAuthor
      }, function (err, books){
        books.save(function(err){

        });
      });

      console.log('book updated');

      return reply('ok');
    }
  }

  exports.deleteBook = {
    auth: {
      mode:'required',
      strategy:'session',
      scope: ['admin']
    },
    handler: function(request, reply){
      var filterBy = request.params.bookId;
      book.findOneAndRemove(
        { _id : filterBy },function (err, books){
          books.save(function(err){

          })
          return reply('ok');
          console.log('book deleted');
        });

      }
    }
