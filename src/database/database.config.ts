import { Sequelize, Dialect } from 'sequelize';

export class DBConfig{
    private server: string;
    private dbName: string;
    private dbUser: string;
    private dbPassword: string;
    private dbDialect: Dialect;

    constructor(){
        this.server = process.env.DB_SERVER || 'localhost';
        this.dbName = process.env.DB_NAME || 'mydb';
        this.dbUser = process.env.DB_USER || 'admin';
        this.dbPassword = process.env.DB_PASSWORD || '';
        let dialect = process.env.DB_DIALECT || 'sqlite';
        this.dbDialect = dialect as Dialect;
    }

    public connect(): Sequelize {
        let storage: string = '';
        if("sqlite" === this.dbDialect){
            // Specify the database file for SQLite
            storage = this.dbName + '.db';
        }
        const sequelize = new Sequelize(this.dbName, this.dbUser, this.dbPassword, {
            host: this.server,
            dialect: this.dbDialect,
            storage: storage
        });
        // Initialize the database with schema
        sequelize.sync();
        // Connect to the database
        sequelize.authenticate().then(()=>{
            console.log(`Connect to database [ ${this.dbName} ] successfully.`);
        });
        return sequelize;
    }
}