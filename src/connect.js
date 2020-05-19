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

function initDb(callback) {
    pool.connect(err => {
        if(err) throw err;
        console.log('connected');
        callback(pool);
    });
}

function getDb() {
    return pool;
}

module.exports = {
    getDb,
    initDb
};
