import { Paper, Typography, MenuItem } from "@mui/material";
import React from "react";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import PersonIcon from "@mui/icons-material/Person";
import { useRouter } from "next/router";
export default function NavLeft() {
  const router = useRouter()
  return (
    <Paper
      sx={{
        padding: "1rem",
      }}
    >
      <Typography
        sx={{
          paddingBottom: "0.5rem",
          marginBottom: "0.5rem",
          borderBottom: "1px solid gray",
        }}
      >
        Dashboard
      </Typography>
      <MenuItem onClick={() => router.push("/customer/order")}>
        <ShoppingBagIcon
          sx={{
            marginRight: "1rem",
          }}
        />
        Order
      </MenuItem>
      <MenuItem onClick={() => router.push("/customer/profile")}>
        <PersonIcon
          sx={{
            marginRight: "1rem",
          }}
        />
        Profile
      </MenuItem>
    </Paper>
  );
}
