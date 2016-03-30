var user = require('../schemas/user');
var SHA3 = require("crypto-js/sha3");
var boom = require('boom');

exports.createUser = {
    auth: {
      mode:'try',
      strategy:'session'
    },
    handler: function(request, reply) {
      console.log(request.payload);
       var newUser = new user({
         name : request.payload.name,
         username : request.payload.username,
         password : SHA3(request.payload.password),
         telephone : request.payload.telephone,
         status : request.payload.status,
         scope : request.payload.scope
       });
       newUser.save(function (err) {
         console.log(err);
         if(err){
          return reply(boom.notAcceptable('Username must be unique: ' + err));
         }else{
           return reply('ok');
         };
      });
    }
  };



  exports.getUsers = {
    auth: {
      mode:'required',
      strategy:'session',
      scope: ['regular','admin','nanny']
    },
    handler: function(request, reply){
      var users = user.find({});
      reply(users);
    }
  }

  exports.getUser = {
    auth: {
      mode:'required',
      strategy:'session',
      scope: ['regular','admin','nanny']
    },
    handler: function(request, reply){
      var users = user.find({_id:request.params.userId});
      reply(users);
    }
  }


  exports.updateUser = {
    auth: {
      mode:'required',
      strategy:'session',
      scope: ['admin']
    },
    handler: function(request, reply){
      var filterBy = request.params.userId;
      var newUsername = request.payload.name;
      var newUserusername = request.payload.username;
      var newUserpassword = request.payload.password;
      var newUsertelephone = request.payload.telephone;

      user.findOneAndUpdate(
        { _id: filterBy },
        {
          name: newUsername,
          username: newUserusername,
          password: newUserpassword,
          telephone: newUsertelephone,
          status : request.payload.status,
          scope : request.payload.scope

        }, function (err, users){
          users.save(function(err){

          });
        });

        console.log('user updated');

        return reply('ok');
      }
    }

    exports.deleteUser = {
      auth: {
        mode:'required',
        strategy:'session',
        scope: ['admin']
      },
      handler: function(request, reply){
        var filterBy = request.params.userId;
        /*user.findOneAndRemove(
          { _id : filterBy },function (err, users){
            users.save(function(err){

            })
            return reply('ok');
            console.log('user deleted');
          });*/


          user.findOneAndUpdate(
            { _id: filterBy },
            {

              status : false

            }, function (err, users){
              users.save(function(err){
                return reply('ok');
                console.log('user deleted');
              });
            });

        }



      }
      exports.undeleteUser = {
        auth: {
          mode:'required',
          strategy:'session',
          scope: ['admin']
        },
        handler: function(request, reply){
          var filterBy = request.params.userId;
          /*user.findOneAndRemove(
            { _id : filterBy },function (err, users){
              users.save(function(err){

              })
              return reply('ok');
              console.log('user deleted');
            });*/


            user.findOneAndUpdate(
              { _id: filterBy },
              {

                status : true

              }, function (err, users){
                users.save(function(err){
                  return reply('ok');
                  console.log('user activated');
                });
              });

          }
        }
