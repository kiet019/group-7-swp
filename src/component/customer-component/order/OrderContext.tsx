import { UserContext } from "@/component/login/AuthContext";
import { setOpen } from "@/feature/Alert";
import { useAppDispatch, useAppSelector } from "@/feature/Hooks";
import { makeOrder } from "@/pages/api/OrderApi";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";

const orderInit = {
  order: null as any,
  getOrder: () => {},
  createOrder: async (
    userId: any,
    cartIdList: any[],
    deliveryAddressId: any,
    paymentId: any,
    totalPayment: any
  ) => {},
};

export const OrderContext = createContext(orderInit);
export default function OrderProvider({ children }: any) {
  const [currentOrder, setCurrentOrder] = useState<any>(null);
  const { userBackend } = useContext(UserContext);
  const alert = useAppSelector((state) => state.alert);
  const dispatch = useAppDispatch();
  const order = currentOrder;
  const router = useRouter()
  const getOrder = async () => {
    // const response = await getOrderProductByUserUidApi();
    // setCurrentOrder(response);
  };
  const createOrder = async (
    userId: any,
    cartIdList: any[],
    deliveryAddressId: any,
    paymentId: any,
    totalPayment: any
  ) => {
    const response = await makeOrder(
      userId,
      cartIdList,
      deliveryAddressId,
      paymentId,
      totalPayment
    );
    if (response) {
      dispatch(
        setOpen({
          open: true,
          message: "Create success",
          severity: "success",
        })
      );
      router.push("/customer")
    } else {
      dispatch(
        setOpen({
          open: true,
          message: "Create fail",
          severity: "error",
        })
      );
    }
  };
  useEffect(() => {
    userBackend === null ? setCurrentOrder(null) : getOrder();
  }, [userBackend, alert]);
  return (
    <OrderContext.Provider value={{ order, getOrder, createOrder }}>
      {children}
    </OrderContext.Provider>
  );
}
