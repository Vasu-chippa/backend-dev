const assert = require('node:assert/strict');
const convertHandler = require('../controllers/convertHandler');

describe('convertHandler', () => {
  it('correctly reads a whole number input', () => {
    assert.equal(convertHandler.getNum('10L'), 10);
  });

  it('correctly reads a decimal number input', () => {
    assert.equal(convertHandler.getNum('3.1mi'), 3.1);
  });

  it('correctly reads a fractional input', () => {
    assert.equal(convertHandler.getNum('1/2gal'), 0.5);
  });

  it('correctly reads a fractional input with a decimal', () => {
    assert.equal(convertHandler.getNum('2.5/6lbs'), 2.5 / 6);
  });

  it('returns an error on a double-fraction', () => {
    assert.equal(convertHandler.getNum('3/2/3kg'), 'invalid number');
  });

  it('defaults to a numerical input of 1 when no numerical input is provided', () => {
    assert.equal(convertHandler.getNum('kg'), 1);
  });

  it('correctly reads each valid input unit', () => {
    for (const unit of ['gal', 'L', 'mi', 'km', 'lbs', 'kg']) {
      assert.equal(convertHandler.getUnit(`1${unit}`), unit);
    }
    assert.equal(convertHandler.getUnit('1GAL'), 'gal');
    assert.equal(convertHandler.getUnit('1l'), 'L');
  });

  it('returns an error for an invalid input unit', () => {
    assert.equal(convertHandler.getUnit('3g'), 'invalid unit');
  });

  it('returns the correct return unit for each valid input unit', () => {
    const pairs = { gal: 'L', L: 'gal', mi: 'km', km: 'mi', lbs: 'kg', kg: 'lbs' };
    for (const [unit, returnUnit] of Object.entries(pairs)) {
      assert.equal(convertHandler.getReturnUnit(unit), returnUnit);
    }
  });

  it('returns the spelled-out string unit for each valid input unit', () => {
    const pairs = {
      gal: ['gallons', 'liters'],
      L: ['liters', 'gallons'],
      mi: ['miles', 'kilometers'],
      km: ['kilometers', 'miles'],
      lbs: ['pounds', 'kilograms'],
      kg: ['kilograms', 'pounds']
    };
    for (const [unit, [from, to]] of Object.entries(pairs)) {
      assert.equal(convertHandler.getString(1, unit, 2, convertHandler.getReturnUnit(unit)),
        `1 ${from} converts to 2 ${to}`);
    }
  });

  it('correctly converts gal to L', () => {
    assert.equal(convertHandler.convert(1, 'gal'), 3.78541);
  });

  it('correctly converts L to gal', () => {
    assert.equal(convertHandler.convert(1, 'L'), 0.26417);
  });

  it('correctly converts mi to km', () => {
    assert.equal(convertHandler.convert(1, 'mi'), 1.60934);
  });

  it('correctly converts km to mi', () => {
    assert.equal(convertHandler.convert(1, 'km'), 0.62137);
  });

  it('correctly converts lbs to kg', () => {
    assert.equal(convertHandler.convert(1, 'lbs'), 0.45359);
  });

  it('correctly converts kg to lbs', () => {
    assert.equal(convertHandler.convert(1, 'kg'), 2.20462);
  });
});
