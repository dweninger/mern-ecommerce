import React, { useState } from 'react'
import Layout from '../../components/Layout';
import { Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
    addCategory,
    getAllCategories,
    updateCategories,
    deleteCategories as deleteCategoriesAction,
} from '../../actions';
import NewModal from '../../components/UI/Modal';
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import {
    IoCheckmarkCircleOutline,
    IoCheckmarkCircle,
    IoChevronForward,
    IoChevronDown,
    IoAdd,
    IoTrash,
    IoPencil,
} from "react-icons/io5";
import UpdateCategoriesModal from './components/UpdateCategoriesModal';
import AddCategoryModal from './components/AddCategoryModal';
import './style.css';
import DeleteCategoryModal from './components/DeleteCategoryModal';

/**
* @author
* @function Category
**/

const Category = (props) => {
    const category = useSelector(state => state.category);
    const [categoryName, setCategoryName] = useState('');
    const [parentCategoryId, setParentCategoryId] = useState('');
    const [categoryImage, setCategoryImage] = useState('');
    const [show, setShow] = useState(false);
    const [checked, setChecked] = useState([]);
    const [expanded, setExpanded] = useState([]);
    const [checkedArray, setCheckedArray] = useState([]);
    const [expandedArray, setExpandedArray] = useState([]);
    const [updateCategoryModal, setUpdateCategoryModal] = useState(false);
    const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);
    const dispatch = useDispatch();

    const handleClose = () => {

        const form = new FormData();

        if (categoryName === "") {
            alert('Category name is required');
            return;
        }

        form.append('name', categoryName);
        form.append('parentId', parentCategoryId);
        form.append('categoryImage', categoryImage);
        dispatch(addCategory(form));
        setCategoryName('');
        setParentCategoryId('');
        setShow(false);
    }

    const handleShow = () => setShow(true);
    const handleHide = () => setShow(false);
    const handleUpdateHide = () => setUpdateCategoryModal(false);
    const handleDeleteHide = () => setDeleteCategoryModal(false);

    const renderCategories = (categories) => {

        let categoriesList = [];
        for (let category of categories) {
            categoriesList.push(
                {
                    label: category.name,
                    value: category._id,
                    children: category.children.length > 0 && renderCategories(category.children),
                }
            );
        }
        return categoriesList;
    }

    const createCategoryList = (categories, options = []) => {
        for (let category of categories) {
            options.push({ value: category._id, name: category.name, parentId: category.parentId });
            if (category.children.length > 0) {
                createCategoryList(category.children, options);
            }
        }
        return options;
    }

    const handleCategoryImage = (e) => {
        setCategoryImage(e.target.files[0]);
    }

    const updateCategory = () => {
        updateCheckedAndExpandedCategories();
        setUpdateCategoryModal(true);

    }

    const updateCheckedAndExpandedCategories = () => {
        const categories = createCategoryList(category.categories);
        const checkedArray = [];
        const expandedArray = [];
        checked.length > 0 && checked.forEach((categoryId, index) => {
            const category = categories.find((category, _index) => categoryId == category.value);
            category && checkedArray.push(category);
        })
        expanded.length > 0 && expanded.forEach((categoryId, index) => {
            const category = categories.find((category, _index) => categoryId == category.value);
            category && expandedArray.push(category);
        })
        setCheckedArray(checkedArray);
        setExpandedArray(expandedArray);
    }

    const handleCategoryInput = (key, value, index, type) => {
        if (type == 'checked') {
            const updatedCheckedArray = checkedArray.map((item, _index) => index == _index ? { ...item, [key]: value } : item);
            setCheckedArray(updatedCheckedArray);
        } else if (type == 'expanded') {
            const updatedExpandedArray = expandedArray.map((item, _index) => index == _index ? { ...item, [key]: value } : item);
            setExpandedArray(updatedExpandedArray);
        }
    }

    const updateCategoriesForm = () => {
        const form = new FormData();

        expandedArray.forEach((item, index) => {
            form.append('_id', item.value);
            form.append('name', item.name);
            form.append('parentId', item.parentId ? item.parentId : "");
            form.append('type', item.type);
        });
        checkedArray.forEach((item, index) => {
            form.append('_id', item.value);
            form.append('name', item.name);
            form.append('parentId', item.parentId ? item.parentId : "");
            form.append('type', item.type);
        });

        dispatch(updateCategories(form));
        setUpdateCategoryModal(false);
    }

    const deleteCategory = () => {
        updateCheckedAndExpandedCategories();
        setDeleteCategoryModal(true);
    }

    const deleteCategories = () => {
        const checkedIdsArray = checkedArray.map((item, index) => ({ _id: item.value }));

        if (checkedIdsArray.length > 0) {
            dispatch(deleteCategoriesAction(checkedIdsArray))
                .then(result => {
                    if (result) {
                        dispatch(getAllCategories());
                        setDeleteCategoryModal(false);
                    }
                });
        }
    }

    const categoryList = createCategoryList(category.categories);

    return (
        <Layout sidebar>
            <Container>
                <Row>
                    <Col md={12}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h3>Category</h3>
                            <div className="categoryActionBtnContainer">
                                <span>Actions: </span>
                                <button className="btn btn-dark" onClick={handleShow}><IoAdd /><span> Add</span></button>
                                <button className="btn btn-dark" onClick={deleteCategory}><IoTrash /><span> Delete</span></button>
                                <button className="btn btn-dark" onClick={updateCategory}><IoPencil /><span> Edit</span></button>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <CheckboxTree
                            nodes={renderCategories(category.categories)}
                            checked={checked}
                            expanded={expanded}
                            onCheck={checked => setChecked(checked)}
                            onExpand={expanded => setExpanded(expanded)}
                            icons={{
                                check: <IoCheckmarkCircle />,
                                uncheck: <IoCheckmarkCircleOutline />,
                                halfCheck: <IoCheckmarkCircleOutline />,
                                expandClose: <IoChevronForward />,
                                expandOpen: <IoChevronDown />,
                                expandAll: <span />,
                                collapseAll: <span />,
                                parentClose: <span />,
                                parentOpen: <span />,
                                leaf: <span />,
                            }}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>

                    </Col>
                </Row>
            </Container>
            <AddCategoryModal
                show={show}
                handleClose={handleClose}
                handleHide={handleHide}
                modalTitle={'Add New Category'}
                categoryName={categoryName}
                setCategoryName={setCategoryName}
                parentCategoryId={parentCategoryId}
                setParentCategoryId={setParentCategoryId}
                categoryList={categoryList}
                handleCategoryImage={handleCategoryImage}
            />
            <UpdateCategoriesModal
                show={updateCategoryModal}
                handleClose={updateCategoriesForm}
                handleHide={handleUpdateHide}
                modalTitle={'Update Categories'}
                size="lg"
                expandedArray={expandedArray}
                checkedArray={checkedArray}
                handleCategoryInput={handleCategoryInput}
                categoryList={categoryList}
            />
            <DeleteCategoryModal 
                show={deleteCategoryModal}
                handleClose={() => setDeleteCategoryModal(false)}
                handleHide={handleDeleteHide}
                modalTitle="Confirm Deleted Categories"
                expandedArray={expandedArray}
                checkedArray={checkedArray}
                deleteCategories={deleteCategories}
            />

        </Layout>
    )

}

export default Category