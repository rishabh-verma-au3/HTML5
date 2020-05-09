var express = require('express');
var router = express.Router();
var passport=require('passport')
var LocalStrategy=require('passport-local').Strategy;

var User=require("../models/user");
var Student=require("../models/student")
var Instructor=require("../models/instructor")


/* GET users listing. */
router.get('/register', function(req, res, next) {
  res.render('users/register')
});

router.post('/register', function(req, res, next) {
    
  var first_name=req.body.first_name;
  var last_name=req.body.last_name
  var street_address=req.body.street_address
  var city=req.body.city
  var state=req.body.state
  var zip=req.body.zip
  var email=req.body.email
  var username=req.body.username
  var password=req.body.password
  var password2=req.body.password2
  var type=req.body.type
    
                   req.checkBody('first_name','First name Field is required').notEmpty();
                   req.checkBody('last_name','Last name Field is required').notEmpty();
                   req.checkBody('email','Email Field is required').notEmpty();
                   req.checkBody('email','Email must be a valid emial').isEmail();
                   req.checkBody('username','Username name Field is required').notEmpty();
                   req.checkBody('password','Password Field is required').notEmpty();
                   req.checkBody('password2','Password don not match').equals(req.body.password);

                    errors=req.validationErrors();
                    // console.log(req.validationResult())
                    if (errors){
                      console.log(errors)
                         res.render('users/register',{
                           errors:errors
                         })
                    } 
                    else{
                         var newUser=new User({
                           email:email,
                           username:username,
                           password:password,
                           type:type
                         })

                          if(type == 'student'){
                            console.log('Registering Student')
                                      var newStudent=new Student({
                                        first_name:first_name,
                                        last_name:last_name,
                                        address:[{
                                          street_address:street_address,
                                          city:city,
                                          state:state,
                                          zip:zip
                                        }],
                                        email:email,
                                        username:username
                                      })

                                      User.saveStudent(newUser,newStudent,function(error,user){
                                        console.log('Student created')
                                      })





                          }
                          else{
                            console.log('Registering Instructor')
                            var newInstructor=new Instructor({
                              first_name:first_name,
                              last_name:last_name,
                              address:[{
                                street_address:street_address,
                                city:city,
                                state:state,
                                zip:zip
                              }],
                              email:email,
                              username:username
                            })

                            User.saveInstructor(newUser,newInstructor,function(error,user){
                              console.log('Instructor created')
                            })
                       
                       
                       
                       
                       
                          }

                          req.flash('success_msg','User Added')
                          console.log(req.flash())
                          res.redirect('/')

                    }
                   
});

passport.serializeUser(
  function(user,done){
    done(null,user._id)
  }
)


passport.deserializeUser(
  function(id,done){
        User.getUserById(id,function(err,user){
          done(err,user)
        })
  }
)



router.post('/login',passport.authenticate('local',{failureRedirect:'/',failureFlash:true}), function(req, res, next) {
    req.flash('success_msg','You are now loggedIn');
    var usertype=req.user.type
    console.log(usertype)
    res.redirect('/'+usertype+'s/classes')

});


passport.use(new LocalStrategy(
  function(username,password,done){
    User.getUserByUsername(username,function(err,user){
      if (err) throw err;
      if(!user){
        return done(null,false,{message:'Unknown user '+username})
      }

      User.comparePassword(password,user.password,function(err,isMatch){
        if (err)
              {return done(err)}
              if (isMatch){
                return done(null,user);
              }
              else {
                console.log('Invalid Password')

                return done(null,false,{message:'Invalid password'})
              }
      })
              

    })
  }
)

)


router.get('/logout', function(req, res, next) {
  req.logout();
  req.flash('success_msg','You have logged Out')
  res.redirect("/")
});



module.exports = router;
