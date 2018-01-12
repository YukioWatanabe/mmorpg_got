const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const Server = mongo.Server;

class DbConnection{
    constructor(){
        const client = new MongoClient(new Server('localhost', 27017));

        client.connect((err, instance) => {
            if(err){
                console.error(`Failed to create connection to database: ${err}`);
                process.exit();
            }

            this._connection = instance.db('got');
            console.log("Created connection...");
        });
    }

    getConnection(){
        console.log("Retrieved connection");
        return this._connection;
    }
}

module.exports = () => {
    return new DbConnection();
}