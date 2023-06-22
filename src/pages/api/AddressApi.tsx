import { auth } from "@/config/firebase";

export const getAddressByUserUidApi = async() => {
    const response = await fetch(`http://localhost:8080/api/address/getAddressByUserUid?userUid=${auth.currentUser?.uid}`)
    if (response.ok) {
        const addressList: any = await response.json()
        return addressList;
    }
    return [];
}
export const deleteAddressApi = async( addressId : any) => {
    const response = await fetch(`http://localhost:8080/api/address/deleteAddress?addressId=${addressId}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
    })
    if (response.ok) {
        return true;
    }
    return false;
}
export const createAddressApi = async(address: any, userId : any) => {
    const response = await fetch("http://localhost:8080/api/address/createAddress", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
            "address": address,
            "addressId": 0,
            "dateCreate": "",
            "dateUpdate": "",
            "userId": userId
          })
    })
    if (response.ok) {
        return true;
    }
    return false;
}