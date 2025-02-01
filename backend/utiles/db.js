const mongoose = require('mongoose');

module.exports.dbConnect = async (req, res) => {
    try {
        await mongoose.connect(process.env.DB_URL, {useNewURLParser: true});
        console.log('Db conntected..');
    } 
    catch (error) {
        console.log(error.message);
    }
}