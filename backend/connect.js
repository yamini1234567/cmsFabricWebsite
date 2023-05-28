const mongoose = require('mongoose');
const uri = 'mongodb+srv://yaminin678:SDMAks4NBu5us4Pa@cluster0.fvxqz2n.mongodb.net/CMSDB?retryWrites=true&w=majority'
const connection = mongoose.connect(uri).then(()=>console.log('connected to Database')).catch(err=> console.log(err))
module.exports = connection