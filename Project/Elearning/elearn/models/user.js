var mongoose=require('mongoose')
var bcrypt=require('bcryptjs')


var UserSchema=mongoose.Schema({
    username:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String,
        bcrypt:true
    },
    type:{
        type:String
    }
});



var User=module.exports=mongoose.model('User',UserSchema);

module.exports.getUserById=function(id,callback){
    User.findById(id,callback).lean()
}



module.exports.getUserByUsername=function(username,callback){
        var query={username:username}
        User.findOne(query,callback).lean()
}


module.exports.comparePassword=function(candidatePassword,hash,callback){
    bcrypt.compare(candidatePassword,hash,function(err,isMatch){
                   if (err) throw err;
                   callback(null,isMatch);
    })
}




module.exports.saveStudent=function(newUser,newStudent,callback){
    bcrypt.hash(newUser.password,10,function(err,hash){
        if (err) throw err
            newUser.password=hash;
            console.log('Student is being save')
            // async.waterfall([newUser.save,newStudent.save],callback)
            newUser.save(callback)
            newStudent.save(callback)

    })
}


module.exports.saveInstructor=function(newUser,newInstructor,callback){
    bcrypt.hash(newUser.password,10,function(err,hash){
        if (err) throw err
            newUser.password=hash;
            console.log('Instructor is being save')
            newUser.save(callback)
            newInstructor.save(callback)

    })
}