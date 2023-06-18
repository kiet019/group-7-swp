import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, CardMedia, Checkbox, Typography } from "@mui/material";
import Loading from "@/component/Loading";
import ChangeQuatityButton from "./ChangeQuatityButton";

export default function CartTable({
  cart,
  handleDelete,
  setOrderList,
  orderList,
  setCartItemDelete,
}: any) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell width={470}>
              <Typography variant="h5">Sản phẩm</Typography>
            </TableCell>
            <TableCell width={120} align="center">
              Đơn giá
            </TableCell>
            <TableCell width={170} align="center">
              Số Lượng
            </TableCell>
            <TableCell align="center">Thành tiền</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cart !== null ? (
            cart.productAndCartItemList.map((row: any) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  <div
                    style={{
                      display: "flex",
                    }}
                  >
                    <Checkbox
                      color="success"
                      onChange={(event) => {
                        if (event.target.checked) {
                          setOrderList([...orderList, row.cartItemId]);
                        } else {
                          const newOrderList = orderList.filter(
                            (cartItemId: any) => row.cartItemId !== cartItemId
                          );
                          setOrderList(newOrderList);
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
                      <Typography variant="h6">
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
                  <ChangeQuatityButton
                    cartItem={row}
                    productQuantity={row.product.quantity}
                  />
                  <Typography
                    variant="subtitle2"
                    sx={{
                      textAlign: "center",
                    }}
                  >
                    Còn lại: {row.product.quantity}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography>
                    {formatNumber(row.product.price * row.quantity)} VND
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Button
                    color="error"
                    variant="contained"
                    onClick={() => {
                      handleDelete();
                      setCartItemDelete(row.cartItemId);
                    }}
                    sx={{
                      margin: "1rem",
                    }}
                  >
                    Xoá
                  </Button>
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
