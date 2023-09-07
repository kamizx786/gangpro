import React, { useEffect, useState } from "react";
import { Accordion, Col, FloatingLabel, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import "react-intl-tel-input/dist/main.css";
import Spinner from "../spinner/Spinner";
import styled from "styled-components";
import { StyledAccordionHeader, StyledForm } from "./CalculatorForm.styled";
import { COST_PROFIT_SET_VALUES } from "../../store/constants/mortgageConstant";
import { getUserCleanUpEstimates } from "../../store/actions/mortgage_calculator/mortgage_calculator.actions";

const StyledSpinner = styled(Spinner)`
  color: red;
  border: 1px red;
  .lds-dual-ring {
    text-align: center;
    color: red;
  }
`;

const CalculatorCostProfit = ({ bidAmount }) => {
  const values = useSelector((state) => state.costProfitValues);
  const { loading: bidAmountLaborLoader } = useSelector(
    (state) => state.bidAmountPricing
  );
  const {
    loading: stateLaborLoader,
    one_day_work,
    average_labor_rate,
  } = useSelector((state) => state.stateLaborPricing);
  const [selectedKey, setSelectedKey] = useState(true);
  const selectedName = selectedKey ? "Advanced" : "Simple";
  const dispatch = useDispatch();

  const handleChange = (evt) => {
    const { name, value: newValue } = evt.target;

    dispatch({ type: COST_PROFIT_SET_VALUES, payload: { [name]: newValue } });
  };
  const accurateDaysOnSite = values?.accurate_days_on_site;

  const noOfDaysExpected = (bidAmount / one_day_work).toFixed(1);
  const numberOfDaysToUse = values.use_accurate_days_on_site
    ? accurateDaysOnSite
    : values?.noOfDaysExpected;

  const projectLaborCost =
    values?.laborers_on_site *
    values?.hours_crew_works_daily *
    numberOfDaysToUse *
    average_labor_rate;

  const jobOverHeadAmount = values?.job_costs_over_head * bidAmount;
  // const projectProfitAmount =
  //   Number(bidAmount) - (Number(projectLaborCost) + Number(jobOverHeadAmount));

  const noOfDaysExpectedCal = values.use_number_of_days
    ? Number(values.noOfDaysExpected)
    : Number(noOfDaysExpected);

  const supplyCost = (5 / 100) * parseFloat(bidAmount);

  const noOfDaysExpectedCalToUse = values.use_accurate_days_on_site
    ? accurateDaysOnSite
    : noOfDaysExpectedCal;

  const mobilizationCost =
    10 * Number(values?.laborers_on_site) * noOfDaysExpectedCalToUse;

  const totalCost =
    parseFloat(projectLaborCost) +
    parseFloat(supplyCost) +
    parseFloat(mobilizationCost) +
    parseFloat(jobOverHeadAmount);

  const projectProfitAmount = parseFloat(bidAmount) - parseFloat(totalCost);

  const profitMargin = (projectProfitAmount / bidAmount) * 100;
  const dailyMobilizationCost = Math.round(
    mobilizationCost / noOfDaysExpectedCalToUse
  );

  useEffect(() => {
    dispatch({
      type: COST_PROFIT_SET_VALUES,
      payload: { hourly_labor_rate: average_labor_rate },
    });
  }, [average_labor_rate, dispatch]);

  const handleAccurateNumberOfDays = (evt) => {
    const { value: newValue } = evt.target;
    dispatch({
      type: COST_PROFIT_SET_VALUES,
      payload: { accurate_days_on_site: newValue },
    });
  };

  const handleUseAccurateNumberOfDays = (evt) => {
    const { name } = evt.target;
    dispatch({
      type: COST_PROFIT_SET_VALUES,
      payload: { [name]: evt.target.checked },
    });

    if (!evt.target.checked) {
      dispatch({
        type: COST_PROFIT_SET_VALUES,
        payload: { accurate_days_on_site: 0 },
      });
    }
  };

  return (
    <StyledForm className="">
      <p className="text-start">Edit square foot price & price per unit rate</p>
      <Row className="my-5">
        <Form.Group as={Col} controlId="laborersonsite">
          <FloatingLabel
            controlId="laborersonsite"
            label=" Employees on site"
            className="mb-3"
          >
            <Form.Control
              name="laborers_on_site"
              type="number"
              className="form-control mt-n3"
              value={values?.laborers_on_site}
              onChange={handleChange}
            />
          </FloatingLabel>
        </Form.Group>
      </Row>
      <Row className="my-5">
        <Form.Group as={Col} controlId="hourCrewWorksDaily">
          <FloatingLabel
            controlId="hoursCrewWorksDaily"
            label="Hours worked by each employee"
            className="mb-3"
          >
            <Form.Control
              name="hours_crew_works_daily"
              type="number"
              max="12"
              min="1"
              className="form-control mt-n3"
              value={values?.hours_crew_works_daily}
              onChange={handleChange}
            />
          </FloatingLabel>
        </Form.Group>
      </Row>
      {bidAmountLaborLoader || stateLaborLoader ? (
        <div className="text-center">
          <StyledSpinner />
        </div>
      ) : (
        <>
          <Row className="my-5">
            <Form.Group as={Col} controlId="hourlyLaborRate">
              <FloatingLabel
                controlId="hourlyLaborRate"
                label="Hourly employee rate"
                className="mb-3"
              >
                <Form.Control
                  name="hourly_labor_rate"
                  type="number"
                  className="form-control mt-n3"
                  value={values?.hourly_labor_rate}
                  onChange={handleChange}
                />
              </FloatingLabel>
            </Form.Group>
          </Row>
          <Row className="my-5">
            <Form.Group as={Col} controlId="noOfDaysExpected">
              <FloatingLabel
                controlId="noOfDaysExpected"
                label="Ganarpro estimated days working"
                className="mb-3"
              >
                <Form.Control
                  name="noOfDaysExpected"
                  type="number"
                  className="form-control mt-n3"
                  value={
                    values?.use_number_of_days
                      ? values?.noOfDaysExpected
                      : noOfDaysExpected
                  }
                  readOnly
                />
              </FloatingLabel>
            </Form.Group>
            <Form.Group as={Col} controlId="daily_mobilization_cost" md={6}>
              <FloatingLabel
                controlId="daily_mobilization_cost"
                label="Daily mobilization cost"
                className="mb-3"
              >
                <Form.Control
                  name="daily_mobilization_cost"
                  type="number"
                  className="form-control mt-n3"
                  value={dailyMobilizationCost}
                  readOnly
                />
              </FloatingLabel>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group
              as={Col}
              md={6}
              className="mb-3 checkbox m-0"
              controlId="use_accurate_days_on_site"
            >
              <Form.Check
                type="checkbox"
                name="use_accurate_days_on_site"
                label="I know number of days"
                className="mb-4"
                checked={values?.use_accurate_days_on_site}
                onChange={handleUseAccurateNumberOfDays}
              />
            </Form.Group>
            {values?.use_accurate_days_on_site && (
              <Form.Group as={Col} controlId="noOfDaysExpected" md={6}>
                <FloatingLabel
                  controlId="accurate_days_on_site"
                  label="My estimate of days working"
                  className="mb-3"
                >
                  <Form.Control
                    name="accurate_days_on_site"
                    type="text"
                    className="form-control mt-n3"
                    value={values?.accurate_days_on_site}
                    onChange={handleAccurateNumberOfDays}
                  />
                </FloatingLabel>
              </Form.Group>
            )}
          </Row>
          {/* <Row className="my-5">
            <Form.Group as={Col} controlId="profitMargin">
              <FloatingLabel
                controlId="profitMargin"
                label="Profit margin %"
                className="mb-3"
              >
                <Form.Control
                  name="profit_margin"
                  type="number"
                  className="form-control mt-n3"
                  value={profitMargin.toFixed(0)}
                  readOnly
                />
              </FloatingLabel>
            </Form.Group>
          </Row> */}
        </>
      )}

      <Accordion
        onSelect={(e) => {
          setSelectedKey(!selectedKey);
        }}
      >
        <Accordion.Item className="bg-white border-0" eventKey="0">
          <StyledAccordionHeader className="fs-1 col-md-3">
            {selectedName}
          </StyledAccordionHeader>
          <Accordion.Body>
            <Row className="my-5">
              <Form.Group as={Col} controlId="jobOverHead">
                <FloatingLabel
                  controlId="jobCostsOverHead"
                  label="job costs overhead %"
                  className="mb-3"
                >
                  <Form.Control
                    name="job_costs_over_head"
                    type="number"
                    required
                    value={values?.job_costs_over_head}
                    onChange={handleChange}
                  />
                </FloatingLabel>
              </Form.Group>
            </Row>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </StyledForm>
  );
};
export default CalculatorCostProfit;
