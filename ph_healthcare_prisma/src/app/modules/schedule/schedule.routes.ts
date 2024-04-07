import express from 'express';
import { ScheduleController } from './schedule.controller';
import { auth } from '../../middleware/auth';
import { UserRole } from '@prisma/client';

const router = express.Router();

router.get('/',auth(UserRole.DOCTOR), ScheduleController.getAllFromDB)
router.post('/', ScheduleController.inserIntoDB)

router.get(
    '/:id',
    auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.DOCTOR),
    ScheduleController.getByIdFromDB
);

router.delete(
    '/:id',
    auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
    ScheduleController.deleteFromDB
);

export const ScheduleRoutes = router;

