const Post = require('./db');

exports.addPost = ({title, description}) => new Promise(async (resolve, reject) => {
    try {
        resolve({
            success: true
        });
    } catch (err) {
        reject(err)
    }
});



