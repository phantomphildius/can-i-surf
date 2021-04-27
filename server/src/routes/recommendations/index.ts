import { Router } from 'express';
import { createSpotRecommendation } from '../../controllers/recommendations/spots';

const router = Router();

router.post('/spot', createSpotRecommendation);

export default router;
