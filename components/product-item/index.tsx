import { addToCart } from "components/product-single/content";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { ProductType } from "types";

const ProductItem = ({ product }: { product: ProductType }) => {
  console.log(product);
  const [isHoverEnabled, setIsHoverEnabled] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  return (
    <div
      onMouseOver={() => setIsHoverEnabled(true)}
      onMouseOut={() => setIsHoverEnabled(false)}
      className="product-item transition ease-in-out hover:drop-shadow-glow"
    >
      {isHoverEnabled && (
        <>
          <button
            type="button"
            onClick={() => addToCart(dispatch, product, 1)}
            className="z-40 absolute left-[50%] top-[55%] -mt-[60px] w-28 -ml-[56px] bg-[#FBB03B] text-white rounded-full p-2"
          >
            Add to cart
          </button>
          <button
            type="button"
            onClick={() => {
              router.push(`/product/${product?.Url}`);
            }}
            className="z-40 absolute left-[50%] top-[35%] -mt-[60px] w-28 -ml-[56px] bg-[#FBB03B] text-white rounded-full p-2"
          >
            See Details
          </button>
        </>
      )}
      <Link href={`/product/${product?.Url}`}>
        <div className="product__image">
          <img
            src={product?.Thumb}
            alt="product"
            className={`transition ease-in-out ${
              isHoverEnabled && "blur-[2px]"
            }`}
          />
          {product?.Discount != 0 && (
            <span className="product__discount">{product?.Discount}%</span>
          )}
        </div>
        <div className="product__description">
          <h3>{product?.ProgramName}</h3>
          <span className="text-white text-sm mb-2">
            {product?.Devices + " / " + product?.Years}
          </span>
          <div
            className={
              "product__price " +
              (product?.Discount ? "product__price--discount" : "")
            }
          >
            <h4>
              {"$ " + (product?.Price - (product?.Discount ?? 0)).toFixed(2)}
            </h4>

            {product?.Discount != 0 && (
              <del>
                <span>${product?.Price}</span>
              </del>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductItem;
