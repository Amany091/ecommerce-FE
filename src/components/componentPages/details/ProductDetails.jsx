import { useEffect, useState } from "react";
import MainSize from "../../ui/MainSize";
import MainReviews from "../../ui/MainReviews";
import Color from "../../ui/Color";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { addItemtoCart } from "../../../features/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../../../features/authSlice";
import toast from "react-hot-toast";

const ProductDetails = () => {
  const data = useSelector((state) => state.products);
  const cart = useSelector((state) => state.cart);
  const product = data?.item?.data ?? {};
  const dispatch = useDispatch()
  const [count, setCount] = useState(1); // order quantity
  const [selectedColor, setSelectedColor] = useState('')
  const [selectedSize, setSelectedSize] = useState('')
  const user = useSelector((state)=> state.user)
  const currentUser = user?.data?.data || {}
  const [loading, setLoading] = useState(false)

  async function handleAddToCart() {
    setLoading(true)
    const body = { orderItems:[{product: product?._id, quantity: count}], user: currentUser?._id, status: 'pending' };
    await dispatch(addItemtoCart(body)).unwrap()
    .catch(()=>{
      toast.error(cart?.error.details[0].msg || "Failed to add to cart")
    })
    .finally(()=> setLoading(false))
  }

  useEffect(()=>{
    dispatch(getCurrentUser())
  },[])

  return (
    <div className="flex flex-col gap-y-3">
      <h3 className="font-cairo font-bold">{product?.title}</h3>
      <p className="text-descriptionColor dark:text-slate-300">{product?.description}</p>
     
      <div className="flex gap-2 items-center">
        <MainReviews rate={product?.ratingsAverage} />
        <h4> {product?.priceAfterDiscount}$ </h4>
        <h4 className="text-gray-400 line-through"> {product?.price}$ </h4>
        <small className="bg-discountBackground text-discountColor rounded-buttonRadius p-1">
          -40%
        </small>
      </div>
      <hr className="text-descriptionColor" />

      { product?.type !== "accessories" && (
        <div>
          <p className="text-descriptionColor mb-4 dark:text-white">select colors</p>
          <Color colors={product?.colors} selectedColor={selectedColor} setSelectedColor={setSelectedColor} />
        </div>
      )}
      { product?.type !== "accessories" && <hr className="text-descriptionColor" />}

      { product?.type !== "accessories" && <div>
        <p className="mb-4 text-descriptionColor dark:text-white">choose sizes</p>
        <MainSize
          sizes={[product?.size]}
          className={`rounded-buttonRadius p-sizeSm lg:p-sizeLg `}
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
        />
      </div>}


      <div className="flex gap-3 my-6 flex-row  md:flex-row lg:flex-row items-center">
        <div
          className={`flex items-center gap-5 `}
        >
          <button
            onClick={() => setCount((pre) => pre + 1)}
            className=" p-2 flex justify-center items-center rounded-[50%] bg-black text-white "
          >
            <FaPlus className="cursor-pointer" />
          </button>

          <span>{count}</span>
          <button onClick={() => count !== 1 && setCount((pre) => pre - 1)}
            className="p-2 flex justify-center items-center rounded-[50%] border border-black "
          >
            <FaMinus className="cursor-pointer" />
          </button>
        </div>
        
        <button
          className="lg:w-[400px] md:w-[200px] w-[236px] bg-forground p-3 hover:bg-black/50  hover:text-white text-white  rounded-buttonRadius"
          onClick={() => handleAddToCart()}
        >
          {loading ? "Adding..." : "Add To Cart"}
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
