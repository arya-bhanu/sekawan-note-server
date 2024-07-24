import express from 'express';
import { AdminRoute } from './admin.route';

const router = express.Router();

router.use('/admin', AdminRoute);

export { router as IndexRoute };
