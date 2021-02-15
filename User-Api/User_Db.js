var sqlite3 = require('sqlite3')

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if(err){
        //failed to open the db
        console.log(err.message);
        throw err;
    }
    else{
        console.log("Connected to sqlite DB");
        db.run(`CREATE TABLE user (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text,
            email text UNIQUE,
            password text,
            CONSTRAINT unique_email UNIQUE (email)
        )`,
        (err) => {
            if(err){
                console.log("Table is there in DB");
            }
            else{
                //Table created
                var insert = 'INSERT INTO user (name, email, password) VALUES (?,?,?)'
                db.run(insert,["User1", "user1@gmail.com", "user11234"])
                db.run(insert,["User2", "user2@gmail.com", "user21234"])
            }
        });
    }
});
module.exports = db