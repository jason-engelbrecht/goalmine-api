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


router.get('/students/:parent', (req, res) => {
    console.log('parent: ' + req.params.parent);
    db.getParentChildren(req.params.parent, students => {
        res.send(students);
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
