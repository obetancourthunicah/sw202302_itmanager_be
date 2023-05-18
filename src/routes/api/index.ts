import express from 'express';
const router = express.Router();
import projectsRouter from './projects';
import securityRouter from './security';

router.use('/projects', projectsRouter);
router.use('/security', securityRouter);


export default router;
