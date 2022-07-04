import {cartActions} from "./cart-slice";
import {uiActions} from "./ui-slice";

export const fetchCartData = () => {
  return async dispatch => {
    const fetchData = async () => {
      const res = await fetch(
        "https://react-request-974a4-default-rtdb.firebaseio.com/cart.json"
      );
      if (!res.ok) {
        throw new Error("something went wrong");
      }
      const data = await res.json();
      return data;
    };
    try {
      const cartData = await fetchData();
      dispatch(
        cartActions.replaceCart({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity || 0,
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error",
          message: "fetching cart data failed",
        })
      );
    }
  };
};

export const sendData = cart => {
  return async dispatch => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "sending data",
        message: "sending cart data",
      })
    );

    const sendRequest = async () => {
      const res = await fetch(
        "https://react-request-974a4-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,
          }),
        }
      );
    };
    try {
      await sendRequest();
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Data sent",
          message: "data sent successfully",
        })
      );
    } catch {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error",
          message: "sending cart data failed",
        })
      );
    }
  };
};
