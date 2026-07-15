import { useEffect, useState } from "react";
import api from "../services/api";
import { FaEdit, FaTrash } from "react-icons/fa";

const ProductList = ({ onEdit }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await api.get("/products");
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/products/${id}`);

      alert("Product Deleted Successfully ✅");

      setProducts((prev) =>
        prev.filter((item) => item._id !== id)
      );
    } catch (error) {
      console.log(error);
      alert("Delete Failed");
    }
  };

  return (
    <div className="max-w-5xl mx-auto">

      <h2 className="text-3xl font-serif mb-8 text-center">
        All Products
      </h2>

      {products.length === 0 ? (
        <div className="bg-white rounded-3xl p-10 shadow text-center">
          No Products Found
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center">

          {products.map((product) => (

            <div
              key={product._id}
              className="w-[320px] bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl duration-300"
            >

              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-52 object-cover"
              />

              <div className="p-5">

                <h3 className="text-2xl font-serif">
                  {product.name}
                </h3>

                <p className="text-[#C9A96E] text-xl mt-2">
                   Rs {product.price}
                </p>

                <p className="text-gray-500 mt-1">
                  {product.category}
                </p>

                <div className="flex gap-3 mt-6">

                  <button
                    onClick={() => onEdit(product)}
                    className="flex-1 bg-[#C9A96E] text-white py-3 rounded-xl hover:bg-black duration-300 flex items-center justify-center gap-2"
                  >
                    <FaEdit />
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(product._id)}
                    className="flex-1 bg-red-500 text-white py-3 rounded-xl hover:bg-red-700 duration-300 flex items-center justify-center gap-2"
                  >
                    <FaTrash />
                    Delete
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>
      )}

    </div>
  );
};

export default ProductList;