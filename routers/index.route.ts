import express from 'express';
import { AdminRouter } from './admin.route';

const router = express.Router();

router.use('/admin', AdminRouter);


export { router as IndexRoute };
