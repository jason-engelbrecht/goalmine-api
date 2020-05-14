import sql from 'mssql';
import bcrypt from 'bcrypt';

class Database {
    pool = new sql.ConnectionPool({
        user: 'carmendb',
        password: 'twoShoe22!',
        server: 'goalmine20200220070938dbserver.database.windows.net',
        database: 'GoalMine20200220070938_db',
        options: {
            enableArithAbort: true //abort fatal errors
        }
    });

    constructor() {
        try {
            this.connect();
        }
        catch(err) {
            console.error(err);
        }
    }

    connect() {
        this.pool.connect(err => {
            if(err) throw err;
            console.log('connected');
        });
    }

    //basic request
    getAllUsers(callback) {
        const request = this.pool.request();

        request.query('SELECT * from UserAccount', (err, result) => {
            if(err) throw err;
            callback(result.recordset);
        });
    }

    //request w input parameter
    getAllParents(callback) {
        const request = this.pool.request();
        request.input('parent', sql.Bit, 1);
        const query = 'SELECT * FROM UserAccount WHERE Parent = @parent';

        request.query(query, (err, result) => {
            if(err) throw err;
            callback(result.recordset);
        });
    }

    authLogin(username, password, callback) {
        const request = this.pool.request();
        request.input('username', sql.VarChar, username);
        const getPassword = 'SELECT Password FROM UserAccount WHERE Username = @username';

        request.query(getPassword, (err, result) => {
            if(err) throw err;
            const hashedPassword = result.recordset[0].Password;

            bcrypt.compare(password, hashedPassword, (err, success) => {
                if(err) throw err;
                callback(success);
            });
        });
    }
}

export default Database;
