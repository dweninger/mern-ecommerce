import React from 'react';
import Input from '../../../components/UI/Input';
import NewModal from '../../../components/UI/Modal';
import { Col, Row } from 'react-bootstrap';

const UpdateCategoriesModal = (props) => {

    const {
        show,
        size,
        handleclose,
        handlehide,
        modaltitle,
        expandedArray,
        checkedArray,
        handleCategoryInput,
        categoryList
    } = props;

    const typeOptions = [
        {name: "Store", value: "store"},
        {name: "Product", value: "product"},
        {name: "Page", value: "page"},
    ]

    return (
        <NewModal
            show={show}
            handleClose={handleclose}
            handleHide={handlehide}
            modalTitle={modaltitle}
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
                            <Input
                                type="select"
                                value={item.parentId}
                                onChange={(e) => handleCategoryInput('parentId', e.target.value, index, 'expanded')}
                                options={categoryList}
                                placeholder="Root Category"
                            />
                        </Col>
                        <Col>
                            <Input
                                type="select"
                                value={item.type}
                                onChange={(e) => handleCategoryInput('type', e.target.value, index, 'expanded')}
                                options={typeOptions}
                                placeholder="Select Type"
                            />
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
                            <Input
                                type="select"
                                value={item.parentId}
                                onChange={(e) => handleCategoryInput('parentId', e.target.value, index, 'checked')}
                                options={categoryList}
                                placeholder="Root Category"
                            />
                        </Col>
                        <Col>
                        <Input
                                type="select"
                                value={item.type}
                                onChange={(e) => handleCategoryInput('type', e.target.value, index, 'checked')}
                                options={typeOptions}
                                placeholder="Select Type"
                            />
                        </Col>
                    </Row>
                )
            }
        </NewModal>
    );
}

export default UpdateCategoriesModal;