import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { setup } from "../../../config/setup";
import { useRouter } from "next/router";
export default function SearchBox() {
  const { handleSubmit, register } = useForm();
  const router = useRouter();
  const onSubmit = (data: any) => {
    router.push(`/customer/search?productName=${data.searchValue}`);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        sx={{
          "& .MuiInputBase-root": {
            border: "1px solid white",
            borderRadius: "1rem",
            backgroundColor: setup.color,
          },
          width: "30rem",
        }}
        InputProps={{
          startAdornment: (
            <SearchIcon
              sx={{
                color: setup.navigationColor,
              }}
            />
          ),
        }}
        size="small"
        defaultValue=""
        {...register("searchValue", { required: true })}
      />
    </form>
  );
}
