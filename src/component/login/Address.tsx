import { Grid, Select, MenuItem } from '@mui/material'
import React, { useEffect, useState } from 'react'

export default function Address({setAddress} : any) {
    const [ city, setCity ] = useState<any>(null)
    const [ cityOption, setCityOption] = useState<any>(null)
    const [ district, setDistrict] = useState<any>(null)
    const [ districtOption, setDistrictOption] = useState<any>(null)
    const [ ward, setWard ] = useState<any>(null)
    const [ wardOption, setWardOption] = useState<any>(null)
  
    useEffect(() => {
        const getCityOption = async() => {
          const response = await fetch("https://vn-public-apis.fpo.vn/provinces/getAll?limit=-1")
          const cities = await response.json()
          setCityOption(cities.data.data)
        }
        const getDistrictOption = async(code : any) => {
          const response = await fetch(`https://vn-public-apis.fpo.vn/districts/getByProvince?provinceCode=${code}&limit=-1`)
          const districts = await response.json()
          setDistrictOption(districts.data.data)
        }
        console.log(cityOption)
        cityOption === null ? getCityOption() : null;
        city !== null ? getDistrictOption(city.code) : null;
    
      }, [city])
      useEffect(() => {
        const getWardOption = async(code : any) => {
          const response = await fetch(`https://vn-public-apis.fpo.vn/wards/getByDistrict?districtCode=${code}&limit=-1`)
          const wards = await response.json()
          setWardOption(wards.data.data)
        }
        district !== null ? getWardOption(district.code) : null;
      }, [district])
      useEffect(() => {
       ward !== null ? setAddress(`Phường xã: ${ward.name}, Quận huyện: ${district.name}, Thành phố: ${city.name}`) : null;
      }, [ward])
  return (
    <Grid container spacing={2} sx={{
        marginBottom: "0.5rem"
      }}>
        <Grid item xs={6}>* Tỉnh / Thành phố
        {
          cityOption !== null && cityOption !== undefined ? (
            <Select
          fullWidth
          value={city}
          size="small"
          onChange={(event) => {
            setCity(event.target.value)
          }}
        >
          <MenuItem  key={-1} value={undefined}></MenuItem>
          {cityOption.map((city : any, key : any) => (
            <MenuItem  key={key} value={city}>{city.name}</MenuItem>
          ))}
        </Select>
          ) : <Select fullWidth disabled={true} size="small"/>
        }
         </Grid>
        <Grid item xs={6}>* Quận / Huyện 
        {
          districtOption !== null && districtOption !== undefined ? (
            <Select
          fullWidth
          value={district}
          size="small"
          onChange={(event) => {
            console.log(event.target)
            setDistrict(event.target.value)
          }}
        >
          <MenuItem  key={-1} value={undefined}></MenuItem>
          {districtOption.map((district : any, key: any) => (
            <MenuItem  key={key} value={district}>{district.name}</MenuItem>
          ))}
        </Select>
          ) : <Select fullWidth disabled={true} size="small"/>
        }</Grid>
        <Grid item xs={6}>* Phường / Xã 
        {
          wardOption !== null ? (
            <Select
          fullWidth
          value={ward}
          size="small"
          onChange={(event) => {
            setWard(event.target.value)
          }}
        >
          <MenuItem  key={-1} value={undefined}></MenuItem>
          {wardOption.map((ward : any, key : any) => (
            <MenuItem  key={key} value={ward}>{ward.name}</MenuItem>
          ))}
        </Select>
          ) : <Select fullWidth disabled={true} size="small"/>
        }</Grid>
      </Grid>
  )
}

