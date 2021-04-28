import { Router } from 'express';
import { createForecasts } from '../../controllers/magic-seaweed/forecasts';

const router = Router();

router.post('/forecasts', createForecasts);

export default router;
