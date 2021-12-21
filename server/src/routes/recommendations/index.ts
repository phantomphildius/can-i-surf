import { Router } from 'express';
import { createSpotRecommendation } from '../../controllers/recommendations/spots';
import { createWindowRecommendation } from '../../controllers/recommendations/windows';

const router = Router();

router.post('/spot', createSpotRecommendation);
router.post('/window', createWindowRecommendation);

export default router;
