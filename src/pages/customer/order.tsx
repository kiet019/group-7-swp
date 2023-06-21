import UserLayout from "@/layout/CustomerLayout";
import React, { useContext, useState } from "react";
import { Grid, Paper, Typography, Button } from "@mui/material";
import { UserContext } from "@/component/login/AuthContext";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import PreOrderTable from "@/component/customer-component/order/PreOrderTable";
import PreOrderAddress from "@/component/customer-component/order/PreOrderAddress";
import OrderPayment from "@/component/customer-component/order/OrderPayment";
import { OrderContext } from "@/component/customer-component/order/OrderContext";

export default function Order() {
  const [selectAddress, setSelectAddress] = useState<any>(null);
  const [selectPayment, setSelectPayment] = useState<any>(null);
  const { register, handleSubmit } = useForm();
  const {userBackend} = useContext(UserContext)
  const { createOrder } = useContext(OrderContext)
  const router = useRouter();
  const onSubmit = async (data: any) => {
    // console.log(selectAddress)
    // console.log(selectPayment)
    // console.log(typeof orderIds)
    // console.log(userBackend.userId)
    createOrder(userBackend.userId, orderIds.split(","), selectAddress.addressId, selectPayment.paymentId, +total + 30000)
  };
  const { orderIds, total } = router.query as {
    orderIds: string;
    total: string;
  };
  return (
    <UserLayout>
      <form onSubmit={handleSubmit(onSubmit)}>
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
            <PreOrderTable orderIds={orderIds} />
            <PreOrderAddress selectAddress={selectAddress} setSelectAddress={setSelectAddress}/>
          </Grid>
          <Grid item xs={4}>
            <Paper
              sx={{
                padding: "1rem",
              }}
            >
              <OrderPayment selectPayment={selectPayment} setSelectPayment={setSelectPayment}/>
              <div
                style={{
                  paddingTop: "1rem",
                  marginTop: "2.6rem",
                  borderTop: "1px solid gray",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    marginBottom: "1rem",
                    fontWeight: "700",
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
                    Phí vận chuyển
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
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    margin: "1rem 0rem 1rem",
                    paddingTop: "1rem",
                    borderTop: "1px solid gray",
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: "600",
                      color: "gray",
                    }}
                  >
                    Tổng cộng
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: "600",
                      color: "gray",
                    }}
                  >
                    {formatNumber(30000 + +total)} VND
                  </Typography>
                </div>
                <Button variant="contained" type="submit" fullWidth disabled={selectAddress !== null && selectPayment !== null ? false : true}>
                  <Typography
                    sx={{
                      fontWeight: "600",
                      color: "white",
                    }}
                  >
                    đặt hàng
                  </Typography>
                </Button>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </form>
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
