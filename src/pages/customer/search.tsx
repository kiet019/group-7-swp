import UserLayout from '@/layout/CustomerLayout'
import React, { useEffect, useState } from 'react'
import { Grid } from "@mui/material"
import { useRouter } from 'next/router'
import Filter from '@/component/customer-component/search/Filter';
import SearchList from '@/component/customer-component/search/SearchList';
import { getProductListApi, getProductListByCategoryApi, getProductListByNameApi } from '@/pages/api/ProductApi';
import { block } from '@/config/setup';
import Loading from '@/component/Loading';

export default function Search() {
    const router = useRouter();
    const { productName, categoryId } = router.query as {productName : string, categoryId : string}
    console.log(productName)
    const [productList, setProductList] = useState<any>(null)
    useEffect(() => {
      const getProductListByName = async () => {
        setProductList(await getProductListByNameApi(block(productName)))
      }
      const getProductListByCategory =async () => {
        setProductList(await getProductListByCategoryApi(categoryId))
      }
      const getProductList = async () => {
        setProductList(await getProductListApi())
      }
      if (productName !== undefined) {
        getProductListByName()
      } else if (categoryId !== undefined) {
        getProductListByCategory()
      } else {
        getProductList()
      }
    }, [productName, categoryId])
  return (
    <UserLayout>
        <Grid container spacing={2}>
            <Grid item xs={3}><Filter/></Grid>
            <Grid item xs={9}>{productList !== null ? (<SearchList productList={productList} productName={productName}/>) : <Loading/>}</Grid>
        </Grid>
    </UserLayout>
  )
}
