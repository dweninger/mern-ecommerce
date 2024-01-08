import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Table } from 'react-bootstrap';
import Input from '../../components/UI/Input';
import { addProduct } from '../../actions';
import MyModal from '../../components/UI/Modal';
import './style.css';
import { generatePublicUrl } from '../../urlConfig';

/**
* @author
* @function Products
**/

const Products = (props) => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [offer, setOffer] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [productPictures, setProductPictures] = useState('');
  const [show, setShow] = useState(false);
  const [productDetailModal, setProductDetailModal] = useState(false);
  const [productDetails, setProductDetails] = useState(null);
  const category = useSelector(state => state.category);
  const product = useSelector(state => state.product);
  const dispatch = useDispatch();

  const handleClose = () => {
    const form = new FormData();
    form.append('name', name);
    form.append('quantity', quantity);
    form.append('price', price);
    form.append('offer', offer);
    form.append('description', description);
    form.append('category', categoryId);

    for (let pic of productPictures) {
      form.append('productPicture', pic);
    }

    dispatch(addProduct(form));

    setShow(false);
  }

  const handleShow = () => setShow(true);
  const handleHide = () => setShow(false);

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({ value: category._id, name: category.name });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    return options;
  }

  const handleProductPictures = (e) => {
    setProductPictures([
      ...productPictures,
      e.target.files[0]
    ]);
  }

  const renderProducts = () => {
    return (
      <Table style={{ fontSize: 12 }} responsive="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {
            product.products.length > 0 ?
              product.products.map(prod =>
                <tr onClick={() => showProductDetailsModal(prod)} key={prod._id}>
                  <td>#</td>
                  <td>{prod.name}</td>
                  <td>{prod.price}</td>
                  <td>{prod.quantity}</td>
                  <td>{prod.category.name}</td>
                </tr>
              ) : null
          }
        </tbody>
      </Table>
    )
  }

  const renderAddProductModal = () => {
    return (
      <MyModal
        show={show}
        handleClose={handleClose}
        handleHide={handleHide}
        modalTitle='Add New Product'
      >
        <Input
          value={name}
          placeholder={'Product Name'}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          value={quantity}
          placeholder={'Quantity'}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <Input
          value={price}
          placeholder={'Price'}
          onChange={(e) => setPrice(e.target.value)}
        />
        <Input
          value={offer}
          placeholder={'Offer'}
          onChange={(e) => setOffer(e.target.value)}
        />
        <Input
          value={description}
          placeholder={'Description'}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select
          className="form-control"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}>
          <option>select category</option>
          {
            createCategoryList(category.categories).map(option =>
              <option key={option.value} value={option.value}>{option.name}</option>)
          }
        </select>

        {
          productPictures.length > 0 ?
            productPictures.map((pic, index) => <div key={index}>{pic.name}</div>) : null
        }

        <input type="file" name="productPicture" onChange={handleProductPictures} />
      </MyModal>
    );
  }

  const handleCloseProductDetailsModal = () => {
    setProductDetailModal(false);
  }

  const showProductDetailsModal = (product) => {
    setProductDetails(product);
    setProductDetailModal(true);
  }

  const renderProductDetailsModal = () => {

    if (!productDetails) {
      return null;
    }

    return (
      <MyModal
        show={productDetailModal}
        handleClose={handleCloseProductDetailsModal}
        handleHide={handleCloseProductDetailsModal}
        modalTitle={'Product Details'}
        size="lg"
      >

        <Row>
          <Col md="6">
            <label className="key">Name</label>
            <p className="value">{productDetails.name}</p>
          </Col>
          <Col md="3">
            <label className="key">Price</label>
            <p className="value">{productDetails.price}</p>
          </Col>
          <Col md="3">
            <label className="key">Offer</label>
            <p className="value">{productDetails.offer}</p>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <label className="key">Quantity</label>
            <p className="value">{productDetails.quantity}</p>
          </Col>
          <Col md="6">
            <label className="key">Category</label>
            <p className="value">{productDetails.category.name}</p>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <label className="key">Description</label>
            <p className="value">{productDetails.description}</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <label className="key">Product Pictures</label>
            <div style={{ display: 'flex' }}>
              {productDetails.productPictures.map(picture =>
                <div className="productImgContainer">
                  <img src={generatePublicUrl(picture.img)} />
                </div>
              )}
            </div>

          </Col>
        </Row>

      </MyModal>
    );
  }

  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h3>Products</h3>
              <button onClick={handleShow}>Add</button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            {renderProducts()}
          </Col>
        </Row>
      </Container>
      {renderAddProductModal()}
      {renderProductDetailsModal()}
    </Layout>
  )

}

export default Products;
