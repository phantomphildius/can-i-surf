import { Router } from 'express';
import { getForecasts } from '../../controllers/magic-seaweed/forecasts';

const router = Router();

router.get('/forecasts/:spot_id', getForecasts);

export default router;
