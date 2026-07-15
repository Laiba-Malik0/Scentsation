import { useEffect, useState } from "react";
import api from "../services/api";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data } = await api.get("/orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
      alert("Failed to load orders");
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-4xl font-serif mb-8">
        Customer Orders
      </h2>

      {orders.length === 0 ? (
        <div className="bg-white rounded-3xl shadow p-10 text-center">
          <h3 className="text-2xl font-serif">
            No Orders Yet
          </h3>
        </div>
      ) : (
        <div className="space-y-8">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-3xl shadow-lg border border-gray-200 p-6"
            >
              {/* Customer Info */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-2xl font-serif mb-4">
                    {order.customerName}
                  </h3>

                  <p>
                    <b>Email:</b> {order.email}
                  </p>

                  <p className="mt-2">
                    <b>Address:</b> {order.shippingAddress}
                  </p>

                  <p className="mt-2">
                    <b>Payment:</b> {order.paymentMethod}
                  </p>

                  <p className="mt-2">
                    <b>Status:</b>{" "}
                    <span
                      className={
                        order.isPaid
                          ? "text-green-600 font-bold"
                          : "text-red-600 font-bold"
                      }
                    >
                      {order.isPaid ? "Paid" : "Pending"}
                    </span>
                  </p>
                </div>

                <div className="md:text-right">
                  <h3 className="text-3xl font-bold text-[#C9A96E]">
                    Rs {order.totalPrice}
                  </h3>

                  <p className="text-gray-500 mt-3">
                    Order Date & Time
                  </p>

                  <p className="font-semibold">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>

              <hr className="my-6" />

              <h4 className="text-xl font-semibold mb-4">
                Ordered Products
              </h4>

              <div className="space-y-4">
                {order.orderItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-gray-50 rounded-2xl p-4"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={item.productId?.image}
                        alt={item.productId?.name}
                        className="w-20 h-20 rounded-xl object-cover border"
                      />

                      <div>
                        <h4 className="font-semibold text-lg">
                          {item.productId?.name}
                        </h4>

                        <p className="text-gray-500">
                          Qty : {item.quantity}
                        </p>

                        <p className="text-[#C9A96E] font-bold">
                          Rs {item.productId?.price}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="font-semibold">
                        Total
                      </p>

                      <p className="text-xl font-bold">
                        Rs {item.productId?.price * item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;