import React from 'react';
import Input from '../../../components/UI/Input';
import NewModal from '../../../components/UI/Modal';
import { Col, Row } from 'react-bootstrap';

const AddCategoryModal = (props) => {

    const {
        show,
        handleclose,
        handlehide,
        modaltitle,
        categoryName,
        setCategoryName,
        parentCategoryId,
        setParentCategoryId,
        categoryList,
        handleCategoryImage,
    } = props;

    return (
        <NewModal
            show={show}
            handleClose={handleclose}
            handleHide={handlehide}
            modalTitle={modaltitle}
        >
            <Row>
                <Col>
                    <Input
                        value={categoryName}
                        placeholder={'Category Name'}
                        onChange={(e) => setCategoryName(e.target.value)}
                    />
                </Col>
                <Col>
                    <Input 
                        type="select"
                        value={parentCategoryId}
                        onChange={(e) => setParentCategoryId(e.target.value)}
                        options={categoryList}
                        placeholder="Root Category"
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <input type="file" name="categoryImage" onChange={handleCategoryImage} />
                </Col>
            </Row>
        </NewModal>
    );
}

export default AddCategoryModal;