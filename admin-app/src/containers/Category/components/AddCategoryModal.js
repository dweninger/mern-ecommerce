import React from 'react';
import Input from '../../../components/UI/Input';
import NewModal from '../../../components/UI/Modal';
import { Col, Row } from 'react-bootstrap';

const AddCategoryModal = (props) => {

    const {
        show,
        handleClose,
        handleHide,
        modalTitle,
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
            handleClose={handleClose}
            handleHide={handleHide}
            modalTitle={modalTitle}
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
                    <select
                        className="form-control"
                        value={parentCategoryId}
                        onChange={(e) => setParentCategoryId(e.target.value)}>
                        <option>Root Category</option>
                        {
                            categoryList.map(option =>
                                <option key={option.value} value={option.value}>{option.name}</option>)
                        }
                    </select>
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