import React, { useEffect } from 'react'
import './style.css';
import { generatePublicUrl } from '../../urlConfig';

/**
 * @author
 * @function HeaderBanner
 */

const HeaderBanner = (
    {
        title,
        viewUrl,
    }
) => {
    return (
        <div className="header-banner">
            <div className="banner-content">
                <span className="banner-title">{title}</span>
                <a className="view-all" href={viewUrl}>View All</a>
            </div>
            <img className="triangle-cutout" src={generatePublicUrl("ribbon.png")} />
        </div>
    )
}

export default HeaderBanner