import React from 'react';
import Input from '../../../components/UI/Input';
import NewModal from '../../../components/UI/Modal';
import { Col, Row } from 'react-bootstrap';

const UpdateCategoriesModal = (props) => {

    const {
        show,
        size,
        handleClose,
        handleHide,
        modalTitle,
        expandedArray,
        checkedArray,
        handleCategoryInput,
        categoryList
    } = props;

    return (
        <NewModal
            show={show}
            handleClose={handleClose}
            handleHide={handleHide}
            modalTitle={modalTitle}
            size={size}
        >
            <Row>
                <Col>
                    <h6>Expanded</h6>
                </Col>
            </Row>
            {
                expandedArray.length > 0 &&
                expandedArray.map((item, index) =>
                    <Row>
                        <Col>
                            <Input
                                value={item.name}
                                placeholder={'Category Name'}
                                onChange={(e) => handleCategoryInput('name', e.target.value, index, 'expanded')}
                            />
                        </Col>
                        <Col>
                            <select
                                className="form-control"
                                value={item.parentId}
                                onChange={(e) => handleCategoryInput('parentId', e.target.value, index, 'expanded')}>
                                <option>Root Category</option>
                                {
                                    categoryList.map(option =>
                                        <option key={option.value} value={option.value}>{option.name}</option>)
                                }
                            </select>
                        </Col>
                        <Col>
                            <select className="form-control">
                                <option value="">Select Type</option>
                                <option value="store">Store</option>
                                <option value="product">Product</option>
                                <option value="page">page</option>
                            </select>
                        </Col>
                    </Row>
                )
            }
            <h6>Checked</h6>
            {
                checkedArray.length > 0 &&
                checkedArray.map((item, index) =>
                    <Row>
                        <Col>
                            <Input
                                value={item.name}
                                placeholder={'Category Name'}
                                onChange={(e) => handleCategoryInput('name', e.target.value, index, 'checked')}
                            />
                        </Col>
                        <Col>
                            <select
                                className="form-control"
                                value={item.parentId}
                                onChange={(e) => handleCategoryInput('parentId', e.target.value, index, 'checked')}>
                                <option>Select Parent Category</option>
                                {
                                    categoryList.map(option =>
                                        <option key={option.value} value={option.value}>{option.name}</option>)
                                }
                            </select>
                        </Col>
                        <Col>
                            <select className="form-control">
                                <option value="">Select Type</option>
                                <option value="store">Store</option>
                                <option value="product">Product</option>
                                <option value="page">page</option>
                            </select>
                        </Col>
                    </Row>
                )
            }
        </NewModal>
    );
}

export default UpdateCategoriesModal;