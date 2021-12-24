import { Router } from 'express';
import { createSpotRecommendation } from '../../controllers/recommendations/spots';
import { createWindowRecommendation } from '../../controllers/recommendations/windows';
import { getRecommendationLocations } from '../../controllers/recommendations/locations';

const router = Router();

router.post('/spot', createSpotRecommendation);
router.post('/window', createWindowRecommendation);
router.get('/locations', getRecommendationLocations);

export default router;
