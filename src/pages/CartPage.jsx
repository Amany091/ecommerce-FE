import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CartItems from '../components/componentPages/cart/CartItems';
import OrderSummary from '../components/componentPages/cart/OrderSummary';
import { cartActions, fetchCartData} from '../features/cartSlice';
import Pagination from "../../src/components/componentPages/dashboard/Pagination"
import BreadCrumb from '../components/ui/BreadCrumb';

const CartPage = () => {
  const dispatch = useDispatch()
  const data = useSelector((state) => state.cart)
  const pagination = data?.data?.pagination ?? {}
  const [page, setPage] = useState(1)

  useEffect(()=>{
    dispatch(fetchCartData({params: {page , limit: pagination?.limit}}))
  },[dispatch])

  const handleChangePage = (newPage)=>{
    setPage(newPage);
    dispatch(cartActions.setFilters({key: 'page', value: newPage}))
    dispatch(fetchCartData({params: {...data?.filters, page: newPage, limit: pagination?.limit}}))
  }
  
  return (
    <div className="container pb-20">
      <BreadCrumb/>
      <div>
        <h2 className="text-3xl font-bold mb-4">Your cart</h2>
        <div className="grid sm:grid-cols-1 lg:grid-cols-[2fr_1fr] gap-5">
          <CartItems/>
          <OrderSummary/>
        </div>
      </div>
      <Pagination
          onPageChange={handleChangePage}
          currentPage={page}
          totalPages={pagination?.totalPages}
      />
    </div>
    
  );
};

export default CartPage;
