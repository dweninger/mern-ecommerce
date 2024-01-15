import React from 'react';
import NewModal from '../../../components/UI/Modal';
import { Col, Row } from 'react-bootstrap';

const DeleteCategoryModal = (props) => {
    const {
        show,
        handleClose,
        handleHide,
        modalTitle,
        checkedArray,
        deleteCategories,

    } = props;

    return (
        <NewModal
            modalTitle={modalTitle}
            show={show}
            handleClose={handleClose}
            handleHide={handleHide}
            buttons={[
                {
                    label: 'No',
                    color: 'primary',
                    onClick: handleHide,
                },
                {
                    label: 'Yes',
                    color: 'danger',
                    onClick: deleteCategories,
                }
            ]}
        >
            <h5>Delete:</h5>
            {
                checkedArray.map((item, index) => <span key={index}>{item.name}<br></br></span>)
            }
        </NewModal>
    );
}

export default DeleteCategoryModal