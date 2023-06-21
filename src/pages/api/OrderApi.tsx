export const makeOrder = async (
  userId: any,
  cartItemsIdList: any[],
  deliveryAddressId: any,
  paymentId: any,
  totalPayment: any
) => {
  const cartItemsList = cartItemsIdList.map((cartItemsId, index) => {
    return {
      cartId: 0,
      cartItemId: Number.parseInt(cartItemsId),
      productId: 0,
      quantity: 0,
    };
  })
  const response = await fetch("http://localhost:8080/api/order/makeOrder", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      cartItemsList: cartItemsList,
      deliveryAddressId: deliveryAddressId,
      note: "",
      paymentId: paymentId,
      totalPayment: totalPayment,
      userId: userId,
    }),
  });
  if (response.ok) {
    return true;
  } else {
    return false;
  }
};
