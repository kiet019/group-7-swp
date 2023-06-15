import CustomerLayout from "@/layout/CustomerLayout";
import {
  Paper,
  Typography,
  CardMedia,
  Card,
  Button,
  Toolbar,
  Box,
  Checkbox,
} from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { CheckInView } from "@/checkInScreen";
import ChangeQuatityButton from "@/component/customer-component/cart/ChangeQuatityButton";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/component/customer-component/cart/CartContext";
import Loading from "@/component/Loading";
import { deleteCartItemApi } from "../api/CartItemApi";
import { setOpen } from "@/feature/Alert";
import ConfirmPopup from "@/component/ConfirmPopup";
import { useAppDispatch, useAppSelector } from "@/feature/Hooks";

export default function Cart() {
  const [orderList, setOrderList] = useState<String[]>([]);
  const dispatch = useAppDispatch()
  const { cart } = useContext(CartContext);
  const [total, setTotal] = useState<any>(0);
  const [agree, setAgree] = useState<any>(false);
  const [openConfirmPopup, setOpenConfirmPopup] = useState<any>(false);
  const [cartItemDelete, setCartItemDelete] = useState<any>(0);
  const formatNumber = (number: number) => {
    return number.toLocaleString('en-US')
  }
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
      // console.log(orderList)
      // console.log(cart)
      const totalCartItem = cart.productAndCartItemList.filter((cartItem: any) => 
        orderList.includes(cartItem.cartItemId)
      )
      console.log(totalCartItem)
      let total = 0
      for (let index = 0; index < totalCartItem.length; index++) {
        const element = totalCartItem[index];
        total = total + element.quantity * element.product.price
        console.log(total)
      }
      setTotal(total)
    }
  }, [orderList, cart])
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
        {cart !== null ? (
          cart.productAndCartItemList.map((row: any) => (
            <div
              style={{
                borderBottom: "1px solid gray",
                padding: "1rem 4rem 1rem 0.5rem",
                display: "grid",
                gridTemplateColumns: "4.5rem 9rem 18rem 13rem 17rem auto",
              }}
              key={row.cartItemId}
            >
              <Checkbox
              color="success"
                onChange={(event) => {
                  if (event.target.checked) {
                    setOrderList([...orderList, row.cartItemId]);
                  } else {
                    const newOrderList = orderList.filter((cartItemId: any) => row.cartItemId !== cartItemId)
                    setOrderList(newOrderList)
                  }
                }}
              />
              <CardMedia
                component="img"
                sx={{
                  width: "7rem",
                  height: "5rem",
                  paddingRight: "2rem",
                }}
                src={"/assets/images/" + row.product.image}
              />
              <div
                style={{
                  paddingRight: "1rem",
                }}
              >
                <Typography variant="h6">{row.product.productName}</Typography>
              </div>
              <div
                style={{
                  paddingRight: "3rem",
                }}
              >
                <ChangeQuatityButton cartItem={row} productQuantity={row.product.quantity}/>
                <Typography
                  variant="subtitle1"
                  sx={{
                    textAlign: "center",
                  }}
                >
                  Còn lại: {row.product.quantity}
                </Typography>
              </div>
              <div>
                <Typography variant="h6" sx={{
                  display: "flex",
                  alignItems: "flex-end"
                }}>
                  total: {formatNumber(row.product.price * row.quantity)} VND
                </Typography>
                <Typography variant="subtitle2">
                  {row.quantity}x{row.product.price}
                </Typography>
              </div>
              <Button
                color="error"
                variant="contained"
                onClick={() => {
                  handleDelete();
                  setCartItemDelete(row.cartItemId);
                }}
                sx={{
                  margin: "1rem"
                }}
              >
                Xoá
              </Button>
            </div>
          ))
        ) : (
          <Loading />
        )}
      </Paper>
      <CheckInView>
        <Card
          sx={{
            marginTop: "2rem",
            height: "4rem",
            padding: "1rem 2.5rem 1rem",
          }}
        >
          <Toolbar>
            <div></div>
            <Box sx={{ flexGrow: 1 }} />
            <Typography variant="h6">
              Tổng tiền thanh toán:{" "}
              <span style={{ marginLeft: "1rem", marginRight: "5rem" }}>
                {total} VND
              </span>
            </Typography>
            <Button
              sx={{
                height: "4rem",
              }}
              color="success"
              variant="contained"
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
