import Loading from "@/component/Loading";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Typography,
  TableBody,
  CardMedia,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "@/component/customer-component/cart/CartContext";
import { UserContext } from "@/component/login/AuthContext";

export default function PreOrderTable({ orderIds }: any) {
  const { cart } = useContext(CartContext);
  const [orderList, setOrderList] = useState<any>([]);
  const { user } = useContext(UserContext);
  useEffect(() => {
    const newOrderList = cart.productAndCartItemList.filter((cartItem: any) =>
      orderIds.includes(cartItem.cartItemId)
    );
    setOrderList(newOrderList);
  }, [user]);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell width={350}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "700",
                }}
              >
                Sản phẩm
              </Typography>
            </TableCell>
            <TableCell
              width={80}
              align="center"
              sx={{
                fontWeight: "700",
              }}
            >
              Đơn giá
            </TableCell>
            <TableCell
              sx={{
                fontWeight: "700",
              }}
              width={80}
              align="center"
            >
              Số Lượng
            </TableCell>
            <TableCell
              align="center"
              sx={{
                fontWeight: "700",
              }}
            >
              Thành tiền
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cart !== null ? (
            orderList.map((row: any, index: any) => (
              <TableRow key={index}>
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
  );
}
const formatNumber = (number: number) => {
  return number.toLocaleString("en-US");
};
