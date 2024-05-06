import { useState } from "react";
// import productsColors from "./../../../utils/data/products-colors";
// import productsSizes from "./../../../utils/data/products-sizes";
// import CheckboxColor from "./../../products-filter/form-builder/checkbox-color";
import { useDispatch } from "react-redux";
import { addProduct } from "store/reducers/cart";
import { ProductType, ProductStoreType } from "types";
import { CircularProgress } from "@mui/material";
import { Dispatch } from "redux";
type ProductContent = {
  product: ProductType;
};
export const addToCart = (
  dispatch: Dispatch<any>,
  product: ProductType,
  count: number
) => {
  const productToSave: ProductStoreType = {
    id: product?.id,
    name: product?.ProgramName,
    image: product?.Thumb,
    price: (product?.Price - (product?.Discount ?? 0)).toFixed(2),
    count: count,
  };

  const productStore = {
    count,
    product: productToSave,
  };

  dispatch(addProduct(productStore));
};
const Content = ({ product }: ProductContent) => {
  const dispatch = useDispatch();
  const [count, setCount] = useState<number>(1);

  return (
    <section className="product-content">
      {product ? (
        <div className="product-content__intro">
          {/* <h5 className="product__id">
          Product ID:<br></br>
          {product?.id}
        </h5> */}
          {!product?.Price && <span className="product-on-sale">Sale</span>}
          <h2 className="product__name">{product?.ProgramName}</h2>
          <div className="product__prices">
            <h4>${(product?.Price - (product?.Discount ?? 0)).toFixed(2)}</h4>
            {product?.Discount != 0 && (
              <span className="line-through">${product?.Price}</span>
            )}
          </div>
        </div>
      ) : (
        <CircularProgress />
      )}

      <div className="product-content__filters">
        <div className="product-filter-item">
          <h5 className="text-white">Quantity:</h5>
          <div className="quantity-buttons">
            <div className="quantity-button">
              <button
                type="button"
                onClick={() => {
                  count >= 2 && setCount(count - 1);
                }}
                className="quantity-button__btn"
              >
                -
              </button>
              <span className="!text-white">{count}</span>
              <button
                type="button"
                onClick={() => {
                  count <= 8 && setCount(count + 1);
                }}
                className="quantity-button__btn"
              >
                +
              </button>
            </div>

            <button
              type="submit"
              onClick={() => addToCart(dispatch, product, count)}
              className="btn btn--rounded btn--yellow"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Content;
