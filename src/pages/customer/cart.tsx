import CustomerLayout from "@/layout/CustomerLayout";
import {
  Paper,
  Typography,
  Card,
  Button,
  Toolbar,
  Box,
  TextField,
  Grid,
  CardMedia,
  Checkbox,
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
import { useForm } from "react-hook-form";
import { getAddressByUserUidApi } from "../api/AddressApi";
import { UserContext } from "@/component/login/AuthContext";
import { setup } from "@/config/setup";
import { forEachChild } from "typescript";

export default function Cart() {
  const [orderList, setOrderList] = useState<String[]>([]);
  const dispatch = useAppDispatch();
  const { cart } = useContext(CartContext);
  const { user, userBackend } = useContext(UserContext);
  const [total, setTotal] = useState<any>(0);
  const [agree, setAgree] = useState<any>(false);
  const [openConfirmPopup, setOpenConfirmPopup] = useState<any>(false);
  const [cartItemDelete, setCartItemDelete] = useState<any>(0);
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const [userAddressList, setUserAddressList] = useState<any>([]);
  const [selectAddress, setSelectAddress] = useState<any>(0);
  const onSubmit = (data: any) => console.log(data);
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
  useEffect(() => {
    const getAddress = async () => {
      const addressList = await getAddressByUserUidApi();
      setUserAddressList(addressList);
    };
    getAddress();
  }, [user]);
  return (
    <CustomerLayout>
      <form onSubmit={handleSubmit(onSubmit)}>
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
        <Grid container spacing={10}>
          <Grid item xs={6}>
            <Paper
              sx={{
                marginTop: "2rem",
                padding: "1rem",
              }}
            >
              <Typography variant="h5">Địa chỉ giao hàng</Typography>
              {userAddressList.map((userAddress: any, key: any) => (
                <div
                  style={{
                    marginTop: "1rem",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    height: "68px"
                  }}
                >
                  <div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "1rem",
                          padding: "0rem 1rem 0rem 0rem",
                          fontWeight: "700",
                        }}
                      >
                        {userBackend.userName}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "1rem",
                          padding: "0rem 1rem 0rem 1rem",
                          borderLeft: "1px solid gray",
                          color: "gray",
                        }}
                      >
                        {userBackend.phoneNumber}
                      </Typography>
                    </div>
                    <Typography
                      sx={{
                        fontSize: "1rem",
                        color: "gray",
                      }}
                    >
                      {userAddress.address}
                    </Typography>
                  </div>
                  <Box flexGrow={1}></Box>
                  <Checkbox />
                </div>
              ))}
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper
              sx={{
                marginTop: "2rem",
                padding: "1rem",
              }}
            >
              <Typography variant="h5">Phương thức thanh toán</Typography>
              <div
                style={{
                  border: "2px solid #1a9cb7",
                  borderRadius: "4px",
                  marginTop: "1rem",
                }}
              >
                <Toolbar>
                  <CardMedia
                    component="img"
                    src="/assets/images/VNPAY.jpg"
                    sx={{
                      width: "3rem",
                      height: "3rem",
                      marginRight: "1rem",
                    }}
                  />
                  <Typography
                    sx={{
                      fontWeight: "700",
                    }}
                  >
                    Thanh toán qua VN PAY
                  </Typography>
                  <Box flexGrow={1}></Box>
                  <Checkbox />
                </Toolbar>
              </div>
              <div
                style={{
                  border: "2px solid #1a9cb7",
                  borderRadius: "4px",
                  marginTop: "1rem",
                }}
              >
                <Toolbar>
                  <CardMedia
                    component="img"
                    src="/assets/images/COD.jpg"
                    sx={{
                      width: "3rem",
                      height: "3rem",
                      marginRight: "1rem",
                    }}
                  />
                  <Typography
                    sx={{
                      fontWeight: "700",
                    }}
                  >
                    Thanh toán khi nhận hàng
                  </Typography>
                  <Box flexGrow={1}></Box>
                  <Checkbox />
                </Toolbar>
              </div>
              <div
                style={{
                  paddingTop: "1rem",
                  marginTop: "1rem",
                  borderTop: "1px solid gray",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    marginBottom: "1rem",
                  }}
                >
                  Thông tin đơn hàng
                </Typography>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: "600",
                      color: "gray",
                    }}
                  >
                    Tạm tính{" "}
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: "600",
                      color: "gray",
                    }}
                  >
                    {formatNumber(total)} VND
                  </Typography>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: "600",
                      color: "gray",
                    }}
                  >
                    Phí vận chuyển{" "}
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: "600",
                      color: "gray",
                    }}
                  >
                    {formatNumber(30000)} VND
                  </Typography>
                </div>
              </div>
            </Paper>
          </Grid>
        </Grid>
        <CheckInView>
          <Card
            sx={{
              marginTop: "2rem",
              height: "fit-content",
              padding: "1rem 0.5rem 1rem",
            }}
          >
            <Toolbar>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    marginRight: "2rem",
                  }}
                >
                  Lời nhắn:
                </Typography>
                <TextField
                  sx={{
                    width: "400px",
                  }}
                  size="small"
                  id="note"
                  {...register("note", {
                    required: false,
                  })}
                />
              </div>
              <Box sx={{ flexGrow: 1 }} />
              <Typography variant="body1">
                Tổng tiền thanh toán:
                <span style={{ marginLeft: "1rem", marginRight: "5rem" }}>
                  {formatNumber(total + 30000)} VND
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
      </form>
    </CustomerLayout>
  );
}
const formatNumber = (number: number) => {
  return number.toLocaleString("en-US");
};
