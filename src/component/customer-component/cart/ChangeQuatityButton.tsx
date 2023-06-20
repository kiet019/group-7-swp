import { Grid, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React, { useContext } from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import { useState, useEffect } from "react";
import { updateCartItemsQuantityApi } from "@/pages/api/CartItemApi";
import { setOpen } from "@/feature/Alert";
import { useAppDispatch } from "@/feature/Hooks";
import { CartContext } from "./CartContext";
export default function ChangeQuatityButton({ cartItem, productQuantity }: any) {
  const dispatch = useAppDispatch();
  const updateCartItemsQuantity = async (updateQuantity: any) => {
    if( updateQuantity < 1 || updateQuantity > productQuantity) {
      dispatch(
        setOpen({
          open: true,
          message: "Invalid number",
          severity: "error",
        })
      );
    } else {
      const response = await updateCartItemsQuantityApi(
        cartItem.cartItemId,
        updateQuantity
      );
      if (response) {
        dispatch(
          setOpen({
            open: true,
            message: "Changing success",
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
    }
  };
  return (
    <Grid
      container
      spacing={0}
      sx={{
        "& .MuiInputBase-root": {
          borderRadius: "0px",
        },
        "& .MuiOutlinedInput-notchedOutline": {
          border: "0px",
        },
        border: "1px solid black",
        borderRadius: "1rem",
      }}
    >
      <Grid
        item
        xs={4}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          cursor: "pointer",
        }}
        onClick={() => {
          updateCartItemsQuantity(cartItem.quantity-1)
        }}
      >
        <>
          <RemoveIcon />
        </>
      </Grid>
      <Grid item xs={4}>
        <TextField
          sx={{
            borderRadius: "0px",
          }}
          type="number"
          color="success"
          size="small"
          value={cartItem.quantity}
        />
      </Grid>
      <Grid
        item
        xs={4}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          cursor: "pointer",
        }}
        onClick={() => {
            updateCartItemsQuantity(cartItem.quantity+1)
        }}
      >
        <AddIcon />
      </Grid>
    </Grid>
  );
}
