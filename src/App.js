import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Notification from "./components/UI/Notification";
import { fetchCartData, sendData } from "./store/cart-actions";

let isInitial = true

const App = () => {
  const dispatch = useDispatch()
  const showCart = useSelector(state => state.ui.cartVisible);
  const cart = useSelector(state => state.cart);
  const notification = useSelector(state => state.ui.notification);

  useEffect(() => {
    dispatch(fetchCartData())
  }, [dispatch])

  useEffect(() => {
    if (isInitial) {
      isInitial = false
    }
    if (cart.changed) {

      dispatch(sendData(cart))
    }

  }, [cart, dispatch]);

  return (
    <>
      {
        !isInitial && notification && <Notification title={notification?.title} message={notification?.message} status={notification?.status} />
      }
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </>
  );
};

export default App;
