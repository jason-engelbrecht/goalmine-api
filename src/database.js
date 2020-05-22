import sql from 'mssql';
import bcrypt from 'bcrypt';

class Database {
    pool;

    constructor(pool) {
        this.pool = pool;
    }

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

    getParentByID(id, callback) {
        const request = this.pool.request();
        request.input('id', sql.Int, id);
        const query = 'SELECT ID, Username, IsActive FROM UserAccount WHERE ID = @id';
        request.query(query, (err, result) => {
            if(err) console.log(err);
            callback(result.recordset[0]);
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
        const getPassword = 'SELECT Password, ID, Username, IsActive FROM UserAccount WHERE Username = @username';

        request.query(getPassword, (err, result) => {
            if(err) throw err;
            const hashedPassword = result.recordset[0].Password;

            bcrypt.compare(password, hashedPassword, (err, success) => {
                if(err) throw err;
                callback(result.recordset[0], success);
            });
        });
    }
}

export default Database;
