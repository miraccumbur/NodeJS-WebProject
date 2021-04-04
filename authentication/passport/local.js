const passport = require("passport"),LocalStrategy = require("passport-local").Strategy;
const User = require("../../models/users");


passport.use(new LocalStrategy({
    usernameField: 'email'
},(email,password,done)=>{

    User.findOne({email},(err,user)=>{
        
        if (err){
            console.log("Something is wrong");
            return done(err,null,"Something is wrong");

        } 
        
        if (!user){
            console.log("User not found");
            return done(null,false,"User not found");
        } 
        
        if(password===user.password){
            console.log("Successfully Logged In");
            return done(null,user,"Successfully Logged In");
            
        }
        else{
            console.log("Incorrect Password");
            return done(null,false,"Incorrect Password");
            
        }
    });

}));

passport.serializeUser(function(user, done) {
    
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });