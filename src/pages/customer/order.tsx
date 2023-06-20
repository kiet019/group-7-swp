import UserLayout from "@/layout/CustomerLayout";
import React, { useContext, useEffect, useState } from "react";
import { getAddressByUserUidApi } from "../api/AddressApi";
import {
  Grid,
  Paper,
  Typography,
  Box,
  Checkbox,
  Toolbar,
  CardMedia,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { UserContext } from "@/component/login/AuthContext";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { CartContext } from "@/component/customer-component/cart/CartContext";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import Loading from "@/component/Loading";

export default function Order() {
  const [selectAddress, setSelectAddress] = useState<any>(0);
  const [userAddressList, setUserAddressList] = useState<any>([]);
  const { user, userBackend } = useContext(UserContext);
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const { cart } = useContext(CartContext);
  const [ orderList, setOrderList ] = useState<any>([])
  const { orderIds, total } = router.query as {
    orderIds: string[];
    total: string;
  };
  useEffect(() => {
    const getAddress = async () => {
      const addressList = await getAddressByUserUidApi();
      setUserAddressList(addressList);
    };
    const newOrderList = cart.productAndCartItemList.filter(
        (cartItem: any) => orderIds.includes(cartItem.cartItemId)
      );
    setOrderList(newOrderList)
    console.log(orderIds);
    getAddress();
  }, [user]);
  return (
    <UserLayout>
      <div
        style={{
          display: "flex",
          marginBottom: "1rem",
        }}
      >
        <ShoppingBagIcon
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
          Thanh toán
        </Typography>
      </div>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell width={400}>
                    <Typography variant="h5" sx={{
                        fontWeight: "700"
                    }}>Sản phẩm</Typography>
                  </TableCell>
                  <TableCell width={60} align="center" sx={{
                        fontWeight: "700"
                    }}>
                    Đơn giá
                  </TableCell>
                  <TableCell sx={{
                        fontWeight: "700"
                    }} width={80} align="center">
                    Số Lượng
                  </TableCell>
                  <TableCell align="center" sx={{
                        fontWeight: "700"
                    }}>Thành tiền</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cart !== null ? (
                  orderList.map((row: any) => (
                    <TableRow key={row.name}>
                      <TableCell component="th" scope="row">
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <CardMedia
                            component="img"
                            sx={{
                              width: "5rem",
                              height: "4rem",
                              paddingRight: "2rem",
                            }}
                            src={"/assets/images/" + row.product.image}
                          />
                          <div
                            style={{
                              paddingRight: "1rem",
                            }}
                          >
                            <Typography variant="body1">
                              {row.product.productName}
                            </Typography>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="subtitle1"
                          sx={{
                            textAlign: "center",
                          }}
                        >
                          {row.product.price}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography
                          variant="subtitle2"
                          sx={{
                            textAlign: "center",
                          }}
                        >
                          {row.quantity}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography>
                          {formatNumber(row.product.price * row.quantity)} VND
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <Loading />
                )}
              </TableBody>
            </Table>
          </TableContainer>
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
                  height: "68px",
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
                <Checkbox color="success" />
              </div>
            ))}
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper
            sx={{
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
                <Checkbox color="success" />
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
                <Checkbox color="success" />
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
                  {formatNumber(Number.parseInt(total))} VND
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
    </UserLayout>
  );
}
const formatNumber = (number: number) => {
  return number.toLocaleString("en-US");
};

{
  /* <div
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
</div>; */
}
