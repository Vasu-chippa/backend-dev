const express = require('express');
const convertHandler = require('../controllers/convertHandler');

const router = express.Router();

router.get('/convert', (req, res) => {
  const input = typeof req.query.input === 'string' ? req.query.input : '';
  const initNum = convertHandler.getNum(input);
  const initUnit = convertHandler.getUnit(input);

  const invalidNumber = initNum === 'invalid number';
  const invalidUnit = initUnit === 'invalid unit';
  if (invalidNumber || invalidUnit) {
    const error = invalidNumber && invalidUnit
      ? 'invalid number and unit'
      : invalidNumber
        ? 'invalid number'
        : 'invalid unit';

    return res.json({ error });
  }

  const returnUnit = convertHandler.getReturnUnit(initUnit);
  const returnNum = convertHandler.convert(initNum, initUnit);
  const string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

  return res.json({ initNum, initUnit, returnNum, returnUnit, string });
});

module.exports = router;
