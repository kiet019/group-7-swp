import { getCategoryListApi } from "@/pages/api/CategoryApi";
import Footer from "@/component/customer-component/Footer";
import UserNavigation from "@/component/customer-component/Navigation";
import { setup } from "@/config/setup";
import { Container } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function UserLayout({ children }: any) {
  const [categoryList, setCategoryList] = useState();
  const router = useRouter();
  useEffect(() => {
    const getCategoryList = async () => {
      setCategoryList(await getCategoryListApi());
    };
    getCategoryList();
    // console.log(router.asPath)
  }, []);
  return (
    <div>
      <Head>
        <title>{setup.name}</title>
      </Head>
      <UserNavigation categoryList={categoryList} />
      <Container
        maxWidth="lg"
        sx={{
          minHeight: "30rem",
          marginTop: router.asPath !== "/customer" ? "10rem" : "0rem",
          marginBottom: "5rem",
        }}
      >
        {children}
      </Container>
      <Footer />
    </div>
  );
}
