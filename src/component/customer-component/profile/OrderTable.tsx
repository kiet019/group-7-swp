import Loading from "@/component/Loading";
import order from "@/pages/admin/order";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  styled,
} from "@mui/material";
import React from "react";
const StyledTableHead = styled(Typography)(() => ({
  fontWeight: 700,
}));

export default function OrderTable({ order }: any) {
  return (
    <TableContainer
      component={Paper}
      sx={{
        "& .MuiTableCell-root": {
          border: "1px solid #feAFA2",
        },
      }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              <StyledTableHead>Mã</StyledTableHead>
            </TableCell>
            <TableCell width={350}>
              <StyledTableHead>Sản phẩm</StyledTableHead>
            </TableCell>
            <TableCell>
              <StyledTableHead width={100}>Thanh toán</StyledTableHead>
            </TableCell>
            <TableCell>
              <StyledTableHead>Địa chỉ</StyledTableHead>
            </TableCell>
            <TableCell>
              <StyledTableHead>Tổng giá</StyledTableHead>
            </TableCell>
            <TableCell>
              <StyledTableHead width={100}>Trạng thái</StyledTableHead>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {order !== null ? (
            order.map((row: any) => (
              <TableRow key={row.orderId}>
                <TableCell>{row.orderId}</TableCell>
                <TableCell>
                    {row.productAndOrderItemList.map((item : any) => (
                        <Typography>{item.quantity} x {item.product.productName}</Typography>
                    ))}
                </TableCell>
                <TableCell>{row.payment.paymentType}</TableCell>
                <TableCell>{row.delivery.address}</TableCell>
                <TableCell>{row.totalPayment} VND</TableCell>
                <TableCell>{row.orderStatus.status}</TableCell>
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
