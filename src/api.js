import express from 'express';
import Database from './database';

const router = express.Router();
const db = new Database();

router.get('/', (req, res) => {
    res.send('Hello world');
});

router.get('/users', (req, res) => {
    db.getAllUsers((users) => {
        res.send(users);
    });
});

router.get('/parents', (req, res) => {
    db.getAllParents((parents) => {
        res.send(parents);
    });
});

router.get('/students', (req, res) => {
    db.getAllStudents((students) => {
        res.send(students);
    });
});

router.get('/goals', (req, res) => {
    db.getAllGoals((goals) => {
        res.json({goals});
    });
});

router.get('/notes', (req, res) => {
    db.getAllNotes((notes) => {
        res.send(notes);
    });
});

router.get('/objectives', (req, res) => {
    db.getAllObjectives((objectives) => {
        res.send(objectives);
    });
});

router.get('/scores', (req, res) => {
    db.getAllScores((scores) => {
        res.send(scores);
    });
});

router.get('/trials', (req, res) => {
    db.getAllTrials((trials) => {
        res.send(trials);
    });
});

router.get('/evidence', (req, res) => {
    db.getAllEvidence((evidence) => {
        res.send(evidence);
    });
});

router.get('/parent/:id', (req, res) => {
    db.getParentByID(req.params.id, (parent) => {
        res.send(parent);
    });
});

router.get('/students/:parent', (req, res) => {
    console.log('parent: ' + req.params.parent);
    db.getParentChildren(req.params.parent, students => {
        res.send(students);
    });
});

//gets student goals
router.get('/goals/:student', (req, res) => {
    console.log('student: ' + req.params.student);
    db.getStudentGoals(req.params.student, goals => {
        res.send(goals);
    });
});

//gets goal objectives
router.get('/objectives/:goal', (req, res) => {
    console.log('goal: ' + req.params.goal);
    db.getGoalObjectives(req.params.goal, objectives => {
        res.send(objectives);
    });
});

//gets objective notes
router.get('/notes/:objective', (req, res) => {
    console.log('objective: ' + req.params.objective);
    db.getObjectiveNotes(req.params.objective, notes => {
        res.send(notes);
    });
});

//gets objective scores
router.get('/scores/:objective', (req, res) => {
    console.log('objective: ' + req.params.objective);
    db.getObjectiveScores(req.params.objective, scores => {
        res.send(scores);
    });
});

//gets objective trials
router.get('/trials/:objective', (req, res) => {
    console.log('objective: ' + req.params.objective);
    db.getObjectiveTrials(req.params.objective, trials => {
        res.send(trials);
    });
});

//gets objective evidence
router.get('/evidence/:objective', (req, res) => {
    console.log('objective: ' + req.params.objective);
    db.getObjectiveEvidence(req.params.objective, evidence => {
        res.send(evidence);
    });
});

router.post('/authLogin', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
        db.authLogin(username, password, (ID, success) => {
            if(success) res.send({ID: ID});
            else res.sendStatus(401); //unauthorized
        });
    }
    catch(err) {
        console.error(err);
        res.sendStatus(500); //server error
    }
});

export default router;
