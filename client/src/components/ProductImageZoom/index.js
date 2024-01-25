// ReactImageZoom.js
import React, { useEffect, useState } from 'react';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

const ProductImageZoom = ({ imageSrc }) => {
  return (
    <Zoom overlayBgColorEnd="rgba(255, 255, 255, 0.95)" zoomMargin={0}>
      <img
        id="zoom-image"
        className="zoom-image"
        src={imageSrc}
        alt="Product"
        width="100%"
      />
    </Zoom>
  );
};

export default ProductImageZoom;
