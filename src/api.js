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

export default router;
