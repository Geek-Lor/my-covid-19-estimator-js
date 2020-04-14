/* eslint-disable operator-linebreak */
/* eslint-disable wrap-iife */
/* eslint-disable radix */
/* eslint-disable object-curly-newline */
function estimator(data) {
  const {
    region,
    periodType,
    timeToElapse,
    reportedCases,
    totalHospitalBeds
  } = data;
  const { avgDailyIncomePopulation, avgDailyIncomeInUSD } = region;

  let days;

  switch (periodType) {
    case 'days':
      days = Math.trunc(timeToElapse);
      break;
    case 'weeks':
      days = Math.trunc(timeToElapse) * 7;
      break;
    case 'months':
      days = Math.trunc(timeToElapse) * 30;
      break;
    default:
      days = Math.trunc(timeToElapse);
      break;
  }

  const impact = function impactEstimator() {
    // Challenge 1 Impact
    const currentlyInfected = Math.floor(reportedCases) * 10;

    const infectionsByRequestedTime = (function infectionsPerTime() {
      const exponent = Math.trunc(days / 3);
      return currentlyInfected * 2 ** exponent;
    })();

    // Challenge 2 Impact

    const severeCasesByRequestedTime = Math.trunc(
      0.15 * infectionsByRequestedTime
    );

    const hospitalBedsByRequestedTime = (function hospitalBeds() {
      const bedsAvailable = Math.trunc(0.35 * totalHospitalBeds);
      return bedsAvailable - severeCasesByRequestedTime;
    })();

    // Challenge 3 Impact

    const casesForICUByRequestedTime = Math.trunc(
      0.05 * infectionsByRequestedTime
    );

    const casesForVentilatorsByRequestedTime = Math.trunc(
      0.02 * infectionsByRequestedTime
    );

    const dollarsInFlight = Math.trunc(
      (infectionsByRequestedTime *
        avgDailyIncomePopulation *
        avgDailyIncomeInUSD) /
        days
    );

    return {
      currentlyInfected,
      infectionsByRequestedTime,
      severeCasesByRequestedTime,
      hospitalBedsByRequestedTime,
      casesForICUByRequestedTime,
      casesForVentilatorsByRequestedTime,
      dollarsInFlight
    };
  };

  const severeImpact = function severeImpactEstimator() {
    // Challenge 1 Severe Impact
    const currentlyInfected = Math.trunc(reportedCases) * 50;

    const infectionsByRequestedTime = (function infectionsPerTime() {
      const exponent = Math.trunc(days / 3);
      return currentlyInfected * 2 ** exponent;
    })();

    // Challenge 2 Severe Impact
    const severeCasesByRequestedTime = Math.trunc(
      0.15 * infectionsByRequestedTime
    );

    const hospitalBedsByRequestedTime = (function hospitalBeds() {
      const bedsAvailable = Math.trunc(0.35 * totalHospitalBeds);
      return bedsAvailable - severeCasesByRequestedTime;
    })();

    // Challenge 3 Severe Impact
    const casesForICUByRequestedTime = Math.trunc(
      0.05 * infectionsByRequestedTime
    );

    const casesForVentilatorsByRequestedTime = Math.trunc(
      0.02 * infectionsByRequestedTime
    );

    const dollarsInFlight = Math.trunc(
      (infectionsByRequestedTime *
        avgDailyIncomePopulation *
        avgDailyIncomeInUSD) /
        days
    );

    return {
      currentlyInfected,
      infectionsByRequestedTime,
      severeCasesByRequestedTime,
      hospitalBedsByRequestedTime,
      casesForICUByRequestedTime,
      casesForVentilatorsByRequestedTime,
      dollarsInFlight
    };
  };

  return {
    impact,
    severeImpact
  };
}

export default estimator;
