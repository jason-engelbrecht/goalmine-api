import sql from 'mssql';
import bcrypt from 'bcrypt';
import router from "./api";

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

    getAllStudents(callback) {
        const request = this.pool.request();
        const query = 'SELECT * FROM Student';
        request.query(query, (err, result) => {
            if(err) throw err;
            callback(result.recordset);
        })
    }

    getAllGoals(callback) {
        const request = this.pool.request();
        const query = 'SELECT * FROM Goal';
        request.query(query, (err, result) => {
            if(err) throw err;
            callback(result.recordset);
        })
    }

    getAllNotes(callback) {
        const request = this.pool.request();
        const query = 'SELECT * FROM Note';
        request.query(query, (err, result) => {
            if(err) throw err;
            callback(result.recordset);
        })
    }

    getAllObjectives(callback) {
        const request = this.pool.request();
        const query = 'SELECT * FROM Objective';
        request.query(query, (err, result) => {
            if(err) throw err;
            callback(result.recordset);
        })
    }

    getAllScores(callback) {
        const request = this.pool.request();
        const query = 'SELECT * FROM Scores';
        request.query(query, (err, result) => {
            if(err) throw err;
            callback(result.recordset);
        })
    }

    getAllTrials(callback) {
        const request = this.pool.request();
        const query = 'SELECT * FROM Trial';
        request.query(query, (err, result) => {
            if(err) throw err;
            callback(result.recordset);
        })
    }

    getAllEvidence(callback) {
        const request = this.pool.request();
        const query = 'SELECT * FROM Evidence';
        request.query(query, (err, result) => {
            if(err) throw err;
            callback(result.recordset);
        })
    }

    getParentChildren(parentId, callback) {
        console.log("parentId: " + parentId);
        const request = this.pool.request();
        request.input('parent', sql.Int, parentId);
        const query = 'SELECT * FROM Student WHERE ParentId = @parent';
        request.query(query, (err, result) => {
            if(err) throw err;
            callback(result.recordset);
        })
    }

    //gets students goals
    getStudentGoals(studentId, callback) {
        console.log("studentId: " + studentId);
        const request = this.pool.request();
        request.input('student', sql.Int, studentId);
        const query = 'SELECT * FROM Goal WHERE StudentId = @student';
        request.query(query, (err, result) => {
            if(err) throw err;
            callback(result.recordset);
        })
    }

    //gets goal objectives
    getGoalObjectives(goalId, callback) {
        console.log("goalId: " + goalId);
        const request = this.pool.request();
        request.input('goal', sql.Int, goalId);
        const query = 'SELECT * FROM Objective WHERE goalId = @goal';
        request.query(query, (err, result) => {
            if(err) throw err;
            callback(result.recordset);
        })
    }

    //gets objective notes
    getObjectiveNotes(objectiveId, callback) {
        console.log("objectiveId: " + objectiveId);
        const request = this.pool.request();
        request.input('objective', sql.Int, objectiveId);
        const query = 'SELECT * FROM Note WHERE objectiveId = @objective';
        request.query(query, (err, result) => {
            if(err) throw err;
            callback(result.recordset);
        })
    }

    //gets objective scores
    getObjectiveScores(objectiveId, callback) {
        console.log("objectiveId: " + objectiveId);
        const request = this.pool.request();
        request.input('objective', sql.Int, objectiveId);
        const query = 'SELECT * FROM Scores WHERE objectiveId = @objective';
        request.query(query, (err, result) => {
            if(err) throw err;
            callback(result.recordset);
        })
    }

    //gets objective trials
    getObjectiveTrials(objectiveId, callback) {
        console.log("objectiveId: " + objectiveId);
        const request = this.pool.request();
        request.input('objective', sql.Int, objectiveId);
        const query = 'SELECT * FROM Trial WHERE objectiveId = @objective';
        request.query(query, (err, result) => {
            if(err) throw err;
            callback(result.recordset);
        })
    }

    //gets objective evidence
    getObjectiveEvidence(objectiveId, callback) {
        console.log("objectiveId: " + objectiveId);
        const request = this.pool.request();
        request.input('objective', sql.Int, objectiveId);
        const query = 'SELECT * FROM Evidence WHERE objectiveId = @objective';
        request.query(query, (err, result) => {
            if(err) throw err;
            callback(result.recordset);
        })
    }

    authLogin(username, password, callback) {
        const request = this.pool.request();
        request.input('username', sql.VarChar, username);
        const getPassword = 'SELECT Password, ID FROM UserAccount WHERE Username = @username';

        request.query(getPassword, (err, result) => {
            if(err) throw err;
            const hashedPassword = result.recordset[0].Password;
            const ID = result.recordset[0].ID;

            bcrypt.compare(password, hashedPassword, (err, success) => {
                if(err) throw err;
                callback(ID, success);
            });
        });
    }

    //TODO get students & their goals (INNER JOIN), based on parents ID from login

    //TODO get all objectives based on goal ids from ^
}

export default Database;
