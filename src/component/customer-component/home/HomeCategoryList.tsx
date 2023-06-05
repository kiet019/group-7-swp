import React from "react";
import { Container, Grid, Typography } from "@mui/material";
import ProductCard from "../ProductCard";
import { useRouter } from "next/router";
import { setup } from "@/config/setup";
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
export default function HomeCategoryList({ categoryAndProduct }: any) {
  const router = useRouter();
  return (
    <div
      style={{
        marginTop: "4rem",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "1rem",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          {categoryAndProduct.categoryName.toUpperCase()}
        </Typography>
        <Typography
          sx={{
            cursor: "pointer",
            display: "flex"
          }}
          onClick={() => {
            router.push(`/customer/search?categoryId=${categoryAndProduct.categoryId}`);
          }}
        >
          xem thêm<TrendingFlatIcon/>
        </Typography>
      </div>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <ProductCard
              product={categoryAndProduct.productList[0]}
            />
          </Grid>
          <Grid item xs={3}>
            <ProductCard
              product={categoryAndProduct.productList[1]}
            />
          </Grid>
          <Grid item xs={3}>
            <ProductCard
              product={categoryAndProduct.productList[2]}
            />
          </Grid>
          <Grid item xs={3}>
            <ProductCard
              product={categoryAndProduct.productList[3]}
            />
          </Grid>
        </Grid>
    </div>
  );
}
