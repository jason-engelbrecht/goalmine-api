import express from 'express';
import db from './database';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello World');
});

export default router;
