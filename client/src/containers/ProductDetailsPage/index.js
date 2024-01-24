import React, { useEffect } from 'react';
import Layout from '../../components/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetailsById } from '../../actions';
import { useParams } from 'react-router-dom';


/**
 * @author
 * @function ProductDetailsPage
 */

const ProductDetailsPage = (props) => {
    const { productId } = useParams();
    const dispatch = useDispatch();
    const product = useSelector(state => state.product);
    useEffect(() => {
        const payload = {
            params: {
                productId
            }
        }

        dispatch(getProductDetailsById(payload));
    }, []);

    return (
        <Layout>
            <div>{JSON.stringify(product.productDetails)}</div>
        </Layout>
    )

}

export default ProductDetailsPage