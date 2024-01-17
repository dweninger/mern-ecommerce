import React, { useEffect } from 'react';
import './style.css';
import { useSelector, useDispatch } from 'react-redux';
import { getAllCategories } from '../../../actions';

/**
 * @author
 * @function MenuHeader 
 */

const MenuHeader = (props) => {

  const category = useSelector(state => state.category);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategories());
  }, []);

  const renderCategories = (categories) => {

    let categoriesList = [];
    for (let category of categories) {
      categoriesList.push(
        <li key={category.name}>
          {
            <a href={category.slug}>{category.name}</a>
          }
          {category.children.length > 0 ? (<ul><div className="dropdownContainer">.</div>{renderCategories(category.children)}</ul>) : null}
        </li>
      );
    }
    return categoriesList;
  }

  return (
    <div className="menuHeader">
      <ul>
        {category.categories.length > 0 ? renderCategories(category.categories) : null}
      </ul>
    </div>
  )
}

export default MenuHeader
