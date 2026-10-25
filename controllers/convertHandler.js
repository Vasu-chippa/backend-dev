const UNIT_NAMES = {
  gal: 'gallons',
  L: 'liters',
  mi: 'miles',
  km: 'kilometers',
  lbs: 'pounds',
  kg: 'kilograms'
};

const CONVERSIONS = {
  gal: { unit: 'L', factor: 3.78541 },
  L: { unit: 'gal', factor: 1 / 3.78541 },
  mi: { unit: 'km', factor: 1.60934 },
  km: { unit: 'mi', factor: 1 / 1.60934 },
  lbs: { unit: 'kg', factor: 0.453592 },
  kg: { unit: 'lbs', factor: 1 / 0.453592 }
};

const NUMBER_PATTERN = /^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:\/[+-]?(?:\d+(?:\.\d*)?|\.\d+))?$/;

function splitInput(input) {
  const value = String(input ?? '');
  const unitIndex = value.search(/[a-z]/i);

  if (unitIndex === -1) {
    return { number: value, unit: '' };
  }

  return {
    number: value.slice(0, unitIndex),
    unit: value.slice(unitIndex)
  };
}

function normalizeUnit(unit) {
  const normalized = unit.toLowerCase() === 'l' ? 'L' : unit.toLowerCase();
  return Object.hasOwn(CONVERSIONS, normalized) ? normalized : 'invalid unit';
}

function getNum(input) {
  const { number } = splitInput(input);
  const value = number.trim();

  if (value === '') {
    return 1;
  }

  if (!NUMBER_PATTERN.test(value)) {
    return 'invalid number';
  }

  if (value.includes('/')) {
    const [numerator, denominator] = value.split('/').map(Number);
    if (denominator === 0) {
      return 'invalid number';
    }
    const result = numerator / denominator;
    return Number.isFinite(result) ? result : 'invalid number';
  }

  const result = Number(value);
  return Number.isFinite(result) ? result : 'invalid number';
}

function getUnit(input) {
  const { unit } = splitInput(input);
  return normalizeUnit(unit);
}

function getReturnUnit(initUnit) {
  const normalized = normalizeUnit(initUnit);
  return normalized === 'invalid unit' ? normalized : CONVERSIONS[normalized].unit;
}

function getString(initNum, initUnit, returnNum, returnUnit) {
  const normalizedInitUnit = normalizeUnit(initUnit);
  const normalizedReturnUnit = normalizeUnit(returnUnit);

  return `${initNum} ${UNIT_NAMES[normalizedInitUnit]} converts to ${returnNum} ${UNIT_NAMES[normalizedReturnUnit]}`;
}

function convert(initNum, initUnit) {
  const normalizedUnit = normalizeUnit(initUnit);
  if (normalizedUnit === 'invalid unit' || !Number.isFinite(Number(initNum))) {
    return 'invalid number or unit';
  }

  return Number((Number(initNum) * CONVERSIONS[normalizedUnit].factor).toFixed(5));
}

module.exports = {
  getNum,
  getUnit,
  getReturnUnit,
  getString,
  convert
};
