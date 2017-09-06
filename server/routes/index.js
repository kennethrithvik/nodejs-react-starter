import express from 'express';

const router = express.Router();

/* GET index page. */
router.get('/', (req, res, next) => {
  /* write the router code in here */
  res.send('from node server');

});

export default router;
