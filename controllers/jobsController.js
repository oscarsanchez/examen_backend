var job = require('../schemas/job');

exports.createJob = {
  auth: {
    mode:'required',
    strategy:'session',
    scope: ['admin']
  },
    handler: function(request, reply) {
       var newJob = new job({
         title : request.payload.title,
         description : request.payload.description,
         position : request.payload.position,
         info : request.payload.status,
         salary : request.payload.salary,
         cdate : request.payload.cdate,
         status : request.payload.status
       });

       newJob.save();
       console.log('Job Saved');
       return reply('ok');
     }
   }


  exports.getJobs = {
    auth: {
      mode:'required',
      strategy:'session',
      scope: ['regular','admin']
    },
    handler: function(request, reply){
      var jobs = job.find({});
      reply(jobs);
    }
  }

  exports.getJob = {
    auth: {
      mode:'required',
      strategy:'session',
      scope: ['regular','admin']
    },
    handler: function(request, reply){
      var jobs = jobs.find({_id:request.params.jobId});
      reply(jobs);
    }
  }


  exports.updateJob = {
    auth: {
      mode:'required',
      strategy:'session',
      scope: ['admin']
    },
    handler: function(request, reply){
      var filterBy = request.params.jobId;
      var newJobtitle = request.payload.title;
      var newJobdescription = request.payload.description;
      var newJobposition = request.payload.position;
      var newJobinfo = request.payload.info;
      var newJobsalary = request.payload.salary;
      var newJobcdate = request.payload.cdate;
      var newJobstatus = request.payload.status;


      job.findOneAndUpdate(
        { _id: filterBy },
        {
          title: newJobtitle,
          description: newJobdescription,
          position: newJobposition,
          info: newJobinfo,
          salary : newJobsalary,
          cdate : newJobcdate,
          status : newJobstatus
        }, function (err, jobs){
          jobs.save(function(err){

          });
        });

        console.log('job updated');

        return reply('ok');
      }
    }

    exports.deleteJob = {
      auth: {
        mode:'required',
        strategy:'session',
        scope: ['admin']
      },
      handler: function(request, reply){
        var filterBy = request.params.jobId;
        /*user.findOneAndRemove(
          { _id : filterBy },function (err, users){
            users.save(function(err){

            })
            return reply('ok');
            console.log('user deleted');
          });*/


          job.findOneAndUpdate(
            { _id: filterBy },
            {

              status : false

            }, function (err, jobs){
              jobs.save(function(err){
                return reply('ok');
                console.log('job deleted');
              });
            });

        }



      }
      exports.undeleteJob = {
        auth: {
          mode:'required',
          strategy:'session',
          scope: ['admin']
        },
        handler: function(request, reply){
          var filterBy = request.params.jobId;
          /*user.findOneAndRemove(
            { _id : filterBy },function (err, users){
              users.save(function(err){

              })
              return reply('ok');
              console.log('user deleted');
            });*/


            job.findOneAndUpdate(
              { _id: filterBy },
              {

                status : true

              }, function (err, jobs){
                jobs.save(function(err){
                  return reply('ok');
                  console.log('job activated');
                });
              });

          }
        }
