import sql from 'mssql';

const db = new sql.ConnectionPool({
    user: 'carmendb',
    password: 'twoShoe22!',
    server: 'goalmine20200220070938dbserver.database.windows.net',
    database: 'GoalMine20200220070938_db',
    options: {
        enableArithAbort: true //abort fatal errors
    }
});

db.connect(err => {
    if(err) {
        console.log(err);
    }
    else {
        console.log('connected')
    }
});

export default db;
