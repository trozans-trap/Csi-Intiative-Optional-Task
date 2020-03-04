
const Team = require('../models/user');
const bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = (app)=>{

    app.get('/todo/:id' , (req , res)=>{
        var id = req.params.id;
        var t,i;

        if(id==967)
           {
              t="I N";
              i=0;
           }
        else if(id==467)
           {
              t="I T";
              i=1;
           }
        else if(id==174)
           {
              t="I A";
              i=2;
           }
        else if(id==462)
           {
              t="T I";
              i=3;
           }
        else if(id==513)
           {
              t="V E";
              i=4;
           }
        else 
           t="ERROR";  
           if(t!="ERROR") 
             {
              res.render('todo',{ person:t , index : i});
             }
           else
            {
               res.render('failure',{person:t});
            }
    });

   
    app.post('/todos/:id/:index' ,urlencodedParser, (req , res, next)=>{

        console.log(req.params.id, req.params.index);
        var id = req.params.id;
        var index = req.params.index;
       const {teamname , email} = req.body;
       var arr2 = [];
       
       console.log(teamname,email,arr2);
       Team.findOne({teamname: teamname}).then((user)=>{
         //  console.log(user);
          if(user)
           {   
              user.arr2[index]=id;
              arr2=user.arr2;
              console.log(arr2);
              console.log(user);
              user.update( { $set: {arr2: arr2}}).then(()=>{
                  console.log(user);
              }).catch(next);
              var t=0;
              for(var i = 0;i<5;i++)
              {
                 if(arr2[i]==0)
                 {
                  res.render('success', {todos: id , arr2: arr2});
                  t = 1;
                  break;
                 }
              }
              if(t==0)
              {
               res.render('complete-success', { arr2: arr2});
              }
            
            
              
           }
          else
          {
            var arr2 = [0,0,0,0,0];
            arr2[index]= id;
            const newUser = new Team ({
               teamname,
               email,
               arr2
            });
            newUser.save().then((user)=>{
                     console.log(user.teamname);
                     console.log(user.arr2);
                     res.send(user);
            }).catch(next);
            res.render('success', {todos: id , arr2: arr2});
          }
       });
        

    });

}