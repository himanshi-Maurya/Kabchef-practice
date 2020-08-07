const AccessControl = require("accesscontrol");
const ac=new AccessControl();

exports.roles =(function() {
    ac.grant('public')
       .readOwn("profile")
       .createOwn('profile')
       .updateOwn("profile")
       .readAny('article')
       .createAny ('submitProject')

    ac.grant('team')
        .extend('public')
         .readAny('profile')
        .createAny("article")
        .updateAny("article")
        .deleteAny('article')
        
    ac.grant('admin')
       .extend('team')
       .updateAny('profile')
       .deleteAny('profile')
       .createAny('profile')
       .createAny('certificate')
       .readAny('certificate')
       .updateAny('certificate')
       .readAny('submitProject')
        .createAny('project')
        .updateAny('project')
        .readAny('project')
        .deleteAny('project')

   return ac;    
})()

