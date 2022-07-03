import classes from "./CartButton.module.css";
import {useSelector, useDispatch} from "react-redux";
import {uiActions} from "../../store/ui-slice";

const CartButton = props => {
  const dispatch = useDispatch();
  const cartBadge = useSelector(state => state.cart.totalQuantity);
  const toggleHandler = () => {
    dispatch(uiActions.toggle());
  };
  return (
    <button className={classes.button} onClick={toggleHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartBadge}</span>
    </button>
  );
};

export default CartButton;
