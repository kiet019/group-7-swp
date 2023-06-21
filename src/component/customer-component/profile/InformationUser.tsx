import {
  Paper,
  Avatar,
  Typography,
  TextField,
  InputAdornment,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import AddNewAddress from "./AddNewAddress";
import {
  deleteAddressApi,
  getAddressByUserUidApi,
} from "@/pages/api/AddressApi";
import { useAppDispatch, useAppSelector } from "@/feature/Hooks";
import { setOpen } from "@/feature/Alert";
import ConfirmPopup from "@/component/ConfirmPopup";
import Loading from "@/component/Loading";
export default function InformationUser({ user, userBackend }: any) {
  const [userAddressList, setUserAddressList] = useState<any>([]);
  const dispatch = useAppDispatch();
  const alert = useAppSelector((state) => state.alert);
  const [openConfirmPopup, setOpenConfirmPopup] = useState<any>(false)
  const [ agree, setAgree] = useState<any>(false)
  const [ deleteAddress, setDeleteAddress] = useState<any>(null)
  useEffect(() => {
    if (agree == true) {
      handleDeleteAddress(deleteAddress)
    }
    setDeleteAddress(null)
    setAgree(false)
  },[agree])
  useEffect(() => {
    const getAddress = async () => {
      const addressList = await getAddressByUserUidApi();
      setUserAddressList(addressList);
      console.log(addressList)
    };
    getAddress();
  }, [user, alert]);
  const handleDeleteAddress = async (addressId: any) => {
    const response = await deleteAddressApi(addressId);
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
  return (
    <>
      {user !== null && userBackend !== null ? (
        <Paper
          sx={{
            padding: "1rem",
          }}
        >
          <div
            style={{
              margin: "1rem",
              display: "flex",
              marginBottom: "2rem",
            }}
          >
            <Avatar
              alt=""
              src=""
              sx={{
                marginRight: "2rem",
                width: 105,
                height: 105,
              }}
            />
            <div>
              <Typography
                sx={{
                  marginBottom: "1rem",
                }}
              >
                Name: {userBackend.userName}
              </Typography>
              <Typography
                sx={{
                  marginBottom: "1rem",
                }}
              >
                Email: {user.email}
              </Typography>
              <Typography
                sx={{
                  marginBottom: "1rem",
                }}
              >
                Phone: {userBackend.phoneNumber}
              </Typography>
            </div>
          </div>
          <AddNewAddress />
          <div
            style={{
              margin: "1rem 1rem 0rem 1rem",
            }}
          >
            {userAddressList.map((userAddress: any, key: any) => (
              <TextField
                key={key}
                defaultValue={userAddress.address}
                fullWidth
                label={`Address ${key + 1}`}
                disabled
                sx={{
                  marginBottom: "1rem",
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      position="end"
                      onClick={() => {
                        setDeleteAddress(userAddress.addressId)
                        setOpenConfirmPopup(true)
                      }}
                    >
                      <ClearIcon
                        color="error"
                        sx={{
                          cursor: "pointer",
                        }}
                      />
                    </InputAdornment>
                  ),
                }}
              />
            ))}
          </div>
          <ConfirmPopup setOpenConfirmPopup={setOpenConfirmPopup} openConfirmPopup={openConfirmPopup} setAgree={setAgree}/>
        </Paper>
      ) : <Loading/>}
    </>
  );
}
