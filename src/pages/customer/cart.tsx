import CustomerLayout from "@/layout/CustomerLayout";
import {
  Paper,
  Typography,
  Card,
  Button,
  Toolbar,
  Box,

} from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { CheckInView } from "@/checkInScreen";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/component/customer-component/cart/CartContext";
import { deleteCartItemApi } from "../api/CartItemApi";
import { setOpen } from "@/feature/Alert";
import ConfirmPopup from "@/component/ConfirmPopup";
import { useAppDispatch } from "@/feature/Hooks";
import { useRouter } from "next/router";
import CartTable from "@/component/customer-component/cart/CartTable";

export default function Cart() {
  const [orderList, setOrderList] = useState<String[]>([]);
  const dispatch = useAppDispatch();
  const { cart } = useContext(CartContext);
  const [total, setTotal] = useState<any>(0);
  const [agree, setAgree] = useState<any>(false);
  const [openConfirmPopup, setOpenConfirmPopup] = useState<any>(false);
  const [cartItemDelete, setCartItemDelete] = useState<any>(0);
  const router = useRouter();

  useEffect(() => {
    const deleteCartItem = async () => {
      const response = await deleteCartItemApi(cartItemDelete);
      if (response) {
        dispatch(
          setOpen({
            open: true,
            message: "Delete success",
            severity: "success",
          })
        );
      } else {
        dispatch(
          setOpen({
            open: true,
            message: "Delete fail",
            severity: "error",
          })
        );
      }
    };
    if (agree === true) {
      console.log(cartItemDelete);
      deleteCartItem();
      setAgree(false);
    }
  }, [openConfirmPopup]);
  const handleDelete = () => {
    setOpenConfirmPopup(true);
  };
  useEffect(() => {
    if (cart !== null) {
      const totalCartItem = cart.productAndCartItemList.filter(
        (cartItem: any) => orderList.includes(cartItem.cartItemId)
      );
      let total = 0;
      for (let index = 0; index < totalCartItem.length; index++) {
        const element = totalCartItem[index];
        total = total + element.quantity * element.product.price;
      }
      setTotal(total);
    }
  }, [orderList, cart]);
  return (
    <CustomerLayout>
        <div
          style={{
            display: "flex",
            marginBottom: "1rem",
          }}
        >
          <ShoppingCartOutlinedIcon
            sx={{
              width: "2rem",
              height: "2rem",
              marginRight: "0.5rem",
              marginLeft: "0.5rem",
            }}
          />
          <Typography
            variant="h5"
            sx={{
              fontWeight: "600",
            }}
          >
            Giỏ hàng
          </Typography>
        </div>
        <Paper>
          <CartTable
            cart={cart}
            handleDelete={handleDelete}
            setOrderList={setOrderList}
            orderList={orderList}
            setCartItemDelete={setCartItemDelete}
          />
        </Paper>
        
        <CheckInView>
          <Card
            sx={{
              marginTop: "2rem",
              height: "fit-content",
              padding: "1rem 0.5rem 1rem",
            }}
          >
            <Toolbar>
              <Box sx={{ flexGrow: 1 }} />
              <Typography variant="body1">
                Tổng tiền thanh toán:
                <span style={{ marginLeft: "1rem", marginRight: "5rem" }}>
                  {formatNumber(total)} VND
                </span>
              </Typography>
              <Button
                sx={{
                  height: "4rem",
                }}
                color="success"
                variant="contained"
                disabled={orderList.length == 0}
                type="submit"
                onClick={() => {
                  router.push(`order?orderIds=${orderList}&total=${total}`)
                }}
              >
                Thanh toán
              </Button>
            </Toolbar>
          </Card>
        </CheckInView>
        <ConfirmPopup
          setOpenConfirmPopup={setOpenConfirmPopup}
          openConfirmPopup={openConfirmPopup}
          setAgree={setAgree}
        />
    </CustomerLayout>
  );
}
const formatNumber = (number: number) => {
  return number.toLocaleString("en-US");
};
