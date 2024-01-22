import React, { useEffect } from 'react'
import './style.css';
import { Form } from 'react-bootstrap';
import { MdGridView, MdOutlineViewList } from "react-icons/md";

/**
 * @author
 * @function SortBar
 */

const SortBar = (props) => {

  return (
    <div className="sort-bar-container">
      <div className="sort-view"> 
        <span>View As</span>
        <button className="grid-view-button"><MdGridView /></button>
        <button className="list-view-button"><MdOutlineViewList /></button>
      </div>
      <div className="sort-by">
        <span className="sort-by-text">Sort By</span>
        <Form.Group className="sort-dropdown">
          <select
            className="form-select"
            value={props.value}
            onChange={props.onChange}
          >
            <option selected value="featured">Featured</option>
            <option value="price-low-high">Price, low to high</option>
            <option value="price-high-low">Price, high to low</option>
            <option value="alpha-a-z">A-Z</option>
            <option value="alpha-z-a">Z-A</option>
            <option value="date-old-new">Date, old to new</option>
            <option value="date-new-old">Date, new to old</option>
            <option value="best-selling">Best selling</option>
          </select>
        </Form.Group>
      </div>
    </div>

  )
}

export default SortBar
