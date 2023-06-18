import Address from "@/component/login/Address";
import { UserContext } from "@/component/login/AuthContext";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  OutlinedInput,
} from "@mui/material";
import React, { useContext, useState } from "react";
import AddHomeIcon from "@mui/icons-material/AddHome";
import { setup } from "@/config/setup";
import { createAddressApi } from "@/pages/api/AddressApi";
import { setOpen } from "@/feature/Alert";
import { useAppDispatch } from "@/feature/Hooks";

export default function AddNewAddress() {
  const { user, userBackend } = useContext(UserContext);
  const [openPopup, setOpenPopup] = useState<any>(false);
  const [address, setAddress] = useState<any>(null);
  const [street, setStreet] = useState<any>("");
  const dispatch = useAppDispatch();
  const handleChange = (value: any) => {
    setStreet(value);
  };
  const handleAddNewAddress = async () => {
    const response = await createAddressApi(
      `Địa chỉ: ${street}, ${address}`,
      userBackend.userId
    );
    if (response) {
      dispatch(
        setOpen({
          open: true,
          message: "Adding success",
          severity: "success",
        })
      );
    } else {
      dispatch(
        setOpen({
          open: true,
          message: "Adding fail",
          severity: "error",
        })
      );
    }
    setOpenPopup(false);
  };
  return (
    <>
      <Dialog
        open={openPopup}
        onClose={() => {
          setOpenPopup(false);
        }}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Thêm địa chỉ mới</DialogTitle>
        <DialogContent>
          <Address setAddress={setAddress} />
          <div style={{ marginTop: "1rem" }}></div>
          <label htmlFor="address">* Số nhà tên đường</label>
          <OutlinedInput
            placeholder="Địa chỉ"
            size="small"
            sx={{
              width: "100%",
            }}
            onChange={(e) => {
              handleChange(e.target.value);
            }}
            endAdornment={<AddHomeIcon />}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              marginTop: "1.5rem",
              float: "right",
              backgroundColor: setup.navigationColor,
              color: "black",
            }}
            onClick={handleAddNewAddress}
          >
            Submit
          </Button>
        </DialogContent>
      </Dialog>
      <Button
        onClick={() => {
          setOpenPopup(true);
        }}
        variant="contained"
        sx={{
          marginBottom: "1rem",
          color: "white",
          float: "right",
        }}
      >
        New Address
      </Button>
    </>
  );
}
