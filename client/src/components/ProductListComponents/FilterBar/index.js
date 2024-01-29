import React, { useEffect } from 'react'
import './style.css';
import { Accordion } from 'react-bootstrap';

/**
 * @author
 * @function FilterBar
 */

const FilterBar = (props) => {

  return (
    <div className="filter-bar-container">
      <h3>Filters</h3>
      <Accordion className="filter-accordion" defaultActiveKey={['0', '1', '2']} alwaysOpen>
        <Accordion.Item className="filter-accordion-item" eventKey="0">
          <Accordion.Header>Sub Category</Accordion.Header>
          <Accordion.Body>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
              <label className="form-check-label" for="flexCheckDefault">
                Cooperative
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
              <label className="form-check-label" for="flexCheckChecked">
                Family
              </label>
            </div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Players</Accordion.Header>
          <Accordion.Body>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
              <label className="form-check-label" for="flexCheckDefault">
                1 Player
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
              <label className="form-check-label" for="flexCheckChecked">
                2 Players
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
              <label className="form-check-label" for="flexCheckChecked">
                3 Players
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
              <label className="form-check-label" for="flexCheckChecked">
                4 Players
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
              <label className="form-check-label" for="flexCheckChecked">
                5 Players
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
              <label className="form-check-label" for="flexCheckChecked">
                6+ Players
              </label>
            </div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>Age</Accordion.Header>
          <Accordion.Body>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
              <label className="form-check-label" for="flexCheckDefault">
                4+
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
              <label className="form-check-label" for="flexCheckChecked">
                6+
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
              <label className="form-check-label" for="flexCheckChecked">
                8+
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
              <label className="form-check-label" for="flexCheckChecked">
                10+
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
              <label className="form-check-label" for="flexCheckChecked">
                12+
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
              <label className="form-check-label" for="flexCheckChecked">
                14+
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
              <label className="form-check-label" for="flexCheckChecked">
                16+
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
              <label className="form-check-label" for="flexCheckChecked">
                18+
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
              <label className="form-check-label" for="flexCheckChecked">
                21+
              </label>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

    </div>
  );
}

export default FilterBar
