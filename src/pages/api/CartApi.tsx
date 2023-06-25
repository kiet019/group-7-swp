import { auth } from "@/config/firebase"
export const getCartProductByUserUidApi =async () => {
    const response = await fetch(`http://localhost:8080/api/cart/getCartProductByUserUid?userUid=${auth.currentUser?.uid}`)
    if (response.ok) {
        const cart = await response.json()
        return cart
    } else {
        return null
    }
}