import React from 'react';
import './style.css';

const HomeInfoCard = (props) => {

    return (
        <div className="info-card-container">
            <div className="info-card-icon">{props.icon}</div>
            <div className="info-card-title">{props.title}</div>
            <div className="info-card-body">{props.body}</div>
        </div>
    );
};

export default HomeInfoCard;
