const Certificate = require('../models/certificate');
const jwt = require('jsonwebtoken');
const { roles } = require('../roles');


exports.postCertificate = async(req, res, next) => {

    try {
        let file = req.file;
        if (!file) {
            return next(new Error('File not found!'));
        }
        const user = res.locals.loggedInUser;
        const id= user._id;
        let extname = file.originalname.split('.')[1];
        const image = id + "." + extname;

        const newCertificate = new Certtificate({
            certiId: id,
            imageUrl: image
        })
        await newCertificate.save();
        res.json({
            data:newCertificate ,
            message: "New Certificate has been created"
          })
    }
    catch (error) {
        next(error)
      }
}


exports.getCertificates = await(req, res, next) => {
   const certificates = await Certificate.find({});
    res.status(200).json({
        data: certificates
        
      });
}

exports .getCertificate = await(req,res,next) => {
    const certiId = req.params.certiId;
    const certi = await Certificate.findById(certiId);
    if (!certi) return next(new Error('Certificate does not exist'));
    res.status(200).json({
      data: certi
    });
  } catch (error) {
    next(error.name)
  }
}
