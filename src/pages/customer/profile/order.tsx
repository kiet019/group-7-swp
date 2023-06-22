import Loading from "@/component/Loading";
import { OrderContext } from "@/component/customer-component/order/OrderContext";
import OrderTable from "@/component/customer-component/profile/OrderTable";
import UserLayout from "@/layout/CustomerLayout";

import React, { useContext, useEffect } from "react";
export default function Order() {
  const { order } = useContext(OrderContext);
  useEffect(() => {
    console.log(order);
  }, [order]);

  return (
    <UserLayout>
      <OrderTable order={order} />
    </UserLayout>
  );
}
