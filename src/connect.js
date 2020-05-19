import sql from 'mssql';

const pool = new sql.ConnectionPool({
    user: 'carmendb',
    password: 'twoShoe22!',
    server: 'goalmine20200220070938dbserver.database.windows.net',
    database: 'GoalMine20200220070938_db',
    options: {
        enableArithAbort: true //abort fatal errors
    }
});

export function initDb(callback) {
    pool.connect(err => {
        if(err) console.log(err);
        console.log('connected');
        callback();
    });
}

export function getConnectionPool() {
    return pool;
}
