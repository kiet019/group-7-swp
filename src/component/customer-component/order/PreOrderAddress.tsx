import { UserContext } from "@/component/login/AuthContext";
import { getAddressByUserUidApi } from "@/pages/api/AddressApi";
import { Paper, Typography, Box, Checkbox } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";

export default function PreOrderAddress({
  selectAddress,
  setSelectAddress,
}: any) {
  const { user, userBackend } = useContext(UserContext);
  const [userAddressList, setUserAddressList] = useState<any>([]);
  useEffect(() => {
    const getAddress = async () => {
      const addressList = await getAddressByUserUidApi();
      setUserAddressList(addressList);
    };
    getAddress();
  }, [user]);
  return (
    <Paper
      sx={{
        marginTop: "1rem",
        padding: "1rem",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontWeight: "700",
        }}
      >
        Địa chỉ giao hàng
      </Typography>
      {userAddressList.map((userAddress: any, key: any) => (
        <div
          style={{
            marginTop: "1rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            height: "68px",
          }}
          key={key}
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
          <Checkbox
            color="success"
            checked={
              selectAddress !== null
                ? selectAddress.addressId === userAddress.addressId
                  ? true
                  : false
                : false
            }
            onChange={(event, checked) => {
              if (checked === true) {
                setSelectAddress(userAddress);
              } else {
                setSelectAddress(null);
              }
            }}
          />
        </div>
      ))}
    </Paper>
  );
}
