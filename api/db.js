const query = require('mysql-query-promise');
const config = require ('config');
/*
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1111",
    database: "testdb"
});

connection.connect(function (err) {
    if (err) throw err;
});
*/
const queries = {
    getAll: async () => {
        return query('SELECT * FROM blog_id');
    },
    get: async (id) => {
        let post = await query('SELECT * FROM blog_id WHERE id=?', [Number(id)]);
        return post[0];
    },
    create: async function ({id, title, description}) {
        let post = {title: String(title), description: String(description)};
        if (id > 0) post.id = Number(id);
        let values = [[title, description]];
        let sql = 'INSERT INTO blog_id (title, description) VALUES ?';
        let result = await query(sql, [values]);
        if (result.insertId) id = result.insertId;
        return queries.get(id);
    },
    update: async (id, post) => {
        let uPost = {};
        if (post.hasOwnProperty('title')) uPost.title = String(post.title);
        if (post.hasOwnProperty('description')) uPost.description = String(post.description);
        let result = await query("UPDATE blog_id SET ? WHERE id = ?", [uPost, Number(id)]);
        return result.affectedRows;
    },
    delete: async (id) => {
        let result = await query(`DELETE FROM blog_id WHERE id=?`, [Number(id)]);
        return result.affectedRows;
    }
};

module.exports = queries;