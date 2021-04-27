import { Router } from 'express';
import * as path from 'path';

const router = Router();

router.get('*', (_request, response) => {
  response.sendFile(
    path.resolve(__dirname, '../../../../client/build', 'index.html')
  );
});

export default router;
