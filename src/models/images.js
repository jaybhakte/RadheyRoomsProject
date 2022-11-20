const mongoose = require('mongoose');
  
const ImageSchema =  mongoose.Schema({
    name: String,
    desc: String,
    image:
    {
        data: Buffer,
        contentType: String
    }
});
  
//Image is a model which has a schema imageSchema
  
module.exports = ImageModel =  mongoose.model('imageModel', ImageSchema);