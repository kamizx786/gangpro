import { Col, Row } from "react-bootstrap";
import React from "react";
import { useSelector } from "react-redux";
import Message from "../Message";
import styled from "styled-components";
import Spinner from "../spinner/Spinner";

const StyledSpinner = styled(Spinner)`
  color: red;
  border: 1px red;
  .lds-dual-ring {
    text-align: center;
    color: red;
  }
`;
const CalculatorCostProfitResult = ({ bidAmount }) => {
  const values = useSelector((state) => state.costProfitValues);
  const { loading: bidAmountLaborLoader, error: bidAmountLaborError } =
    useSelector((state) => state.bidAmountPricing);

  const {
    one_day_work,
    loading: stateLaborLoader,
    error: stateLaborError,
  } = useSelector((state) => state.stateLaborPricing);

  const noOfDaysExpected = (bidAmount / one_day_work).toFixed(1);

  const accurateDaysOnSite = values?.accurate_days_on_site;

  const numberOfDaysToUse = values.use_accurate_days_on_site
    ? accurateDaysOnSite
    : noOfDaysExpected;

  const projectLaborCost =
    values?.laborers_on_site *
    values?.hours_crew_works_daily *
    numberOfDaysToUse *
    values?.hourly_labor_rate;

  const supplyCost = (5 / 100) * parseFloat(bidAmount);

  const noOfDaysExpectedCal = values.use_number_of_days
    ? Number(values.noOfDaysExpected)
    : Number(noOfDaysExpected);

  const noOfDaysExpectedCalToUse = values.use_accurate_days_on_site
    ? accurateDaysOnSite
    : noOfDaysExpectedCal;

  const mobilizationCost =
    10 * Number(values?.laborers_on_site) * noOfDaysExpectedCalToUse;

  const jobOverHeadAmount = values?.job_costs_over_head * bidAmount;
  // const projectProfitAmount =
  //   Number(bidAmount) - (Number(projectLaborCost) + Number(jobOverHeadAmount));
  // const projectProfitAmount =
  //   parseFloat(projectLaborCost) +
  //   parseFloat(supplyCost) +
  //   parseFloat(mobilizationCost);

  const totalCost =
    parseFloat(projectLaborCost) +
    parseFloat(supplyCost) +
    parseFloat(mobilizationCost) +
    parseFloat(jobOverHeadAmount);

  const projectProfitAmount = parseFloat(bidAmount) - parseFloat(totalCost);

  const profitPerDay = projectProfitAmount / noOfDaysExpected || 0;

  function localStringToNumber(s) {
    return Number(String(s).replace(/[^0-9.,-]+/g, ""));
  }

  const convertBidAmountToCurrency = (value) => {
    var options = {
      maximumFractionDigits: 2,
      currency: "USD",
      currencyDisplay: "symbol",
    };
    return localStringToNumber(value).toLocaleString(undefined, options);
  };

  return (
    <Row className="d-flex justify-content-center">
      {bidAmountLaborLoader || stateLaborLoader ? (
        <div className="text-center">
          <StyledSpinner />
        </div>
      ) : stateLaborError || bidAmountLaborError ? (
        <Message variant="danger">
          {stateLaborError + "\n" + bidAmountLaborError}
        </Message>
      ) : (
        <Col lg={7}>
          <div className="mb-5">
            <h3 className="font-weight-bolder">Project profit amount</h3>
            <h3>
              {" "}
              $
              {convertBidAmountToCurrency(
                projectProfitAmount.toFixed(0).toLocaleString()
              )}
            </h3>
            <p>
              Calculated using Bid amount minus payroll, supplies, mobilization,
              and overhead costs
            </p>
          </div>
          <div className="my-4">
            <h3 className="font-weight-bolder">labor cost/payroll</h3>
            <h3>
              $
              {convertBidAmountToCurrency(
                projectLaborCost.toFixed(0).toLocaleString()
              )}
            </h3>
          </div>
          <div className="my-4">
            <h3 className="font-weight-bolder">Supplies cost</h3>
            <h3>
              $
              {convertBidAmountToCurrency(
                supplyCost.toFixed(0).toLocaleString()
              )}
            </h3>
          </div>
          <div className="my-4">
            <h3 className="font-weight-bolder">Mobilization cost</h3>
            <h3>
              $
              {convertBidAmountToCurrency(
                mobilizationCost.toFixed(0).toLocaleString()
              )}
            </h3>
          </div>
          <div className="my-4">
            <h3 className="font-weight-bolder">Overhead cost</h3>
            <h3>
              $
              {convertBidAmountToCurrency(
                jobOverHeadAmount.toFixed(0).toLocaleString()
              )}
            </h3>
          </div>
          <hr className="hr border-top border-3 border-dark" />
          <div className="my-4">
            <h3 className="font-weight-bolder">Total Cost</h3>
            <h3>
              $
              {convertBidAmountToCurrency(
                totalCost.toFixed(0).toLocaleString()
              )}
            </h3>
          </div>
          <hr className="hr border-top border-3 border-dark" />
          <div className="my-4">
            <h3 className="font-weight-bolder">Profit per day worked</h3>
            <h3>
              $
              {convertBidAmountToCurrency(
                profitPerDay.toFixed(0).toLocaleString()
              )}
            </h3>
          </div>
        </Col>
      )}
    </Row>
  );
};

export default CalculatorCostProfitResult;
