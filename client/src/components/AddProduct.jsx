import { useState, useEffect, useRef } from "react";
import api from "../services/api";

const AddProduct = ({ editProduct, clearEdit }) => {
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    price: "",
    description: "",
    category: "Men",
    countInStock: "",
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editProduct) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setEditId(editProduct._id);

      setFormData({
        name: editProduct.name,
        brand: editProduct.brand,
        price: editProduct.price,
        description: editProduct.description,
        category: editProduct.category,
        countInStock: editProduct.countInStock,
      });
    }
  }, [editProduct]);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = new FormData();

      data.append("name", formData.name);
      data.append("brand", formData.brand);
      data.append("price", formData.price);
      data.append("description", formData.description);
      data.append("category", formData.category);
      data.append("countInStock", formData.countInStock);

      if (image) {
        data.append("image", image);
      }

      if (editId) {
        await api.put(`/products/${editId}`, data);
        alert("Product Updated Successfully ✅");
      } else {
        if (!image) {
          alert("Please Select Image");
          setLoading(false);
          return;
        }

        await api.post("/products", data);
        alert("Product Added Successfully ✅");
      }

      setFormData({
  name: "",
  brand: "",
  price: "",
  description: "",
  category: "Men",
  countInStock: "",
});

setImage(null);

if (fileInputRef.current) {
  fileInputRef.current.value = "";
}

setEditId(null);

if (clearEdit) clearEdit();
    } catch (error) {
  console.log(error);
  console.log(error.response?.data);

  alert(error.response?.data?.message || "Something Went Wrong");

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-lg p-6 md:p-8">

      <h2 className="text-3xl font-serif text-center mb-8">
        {editId ? "Update Product" : "Add New Product"}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >

        <input
          type="text"
          name="name"
          placeholder="Perfume Name"
          value={formData.name}
          onChange={handleChange}
          className="border rounded-xl px-4 py-2.5 outline-none focus:border-[#C9A96E]"
        />

        <input
          type="text"
          name="brand"
          placeholder="Brand"
          value={formData.brand}
          onChange={handleChange}
          className="border rounded-xl px-4 py-2.5 outline-none focus:border-[#C9A96E]"
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="border rounded-xl px-4 py-2.5 outline-none focus:border-[#C9A96E]"
        />

        <input
          type="number"
          name="countInStock"
          placeholder="Stock"
          value={formData.countInStock}
          onChange={handleChange}
          className="border rounded-xl px-4 py-2.5 outline-none focus:border-[#C9A96E]"
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="border rounded-xl px-4 py-2.5 outline-none focus:border-[#C9A96E]"
        >
          <option>Men</option>
          <option>Women</option>
        </select>

       <input
  type="file"
  ref={fileInputRef}
  onChange={(e) => setImage(e.target.files[0])}
  className="w-full border rounded-xl px-4 py-2.5"
/>
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          rows="3"
          className="md:col-span-2 border rounded-xl px-4 py-3 outline-none resize-none focus:border-[#C9A96E]"
        />

       <button
  type="submit"
  disabled={loading}
  className="md:col-span-2 justify-self-center w-56 bg-black text-white py-3 rounded-xl hover:bg-[#C9A96E] duration-300"
>
  {loading
    ? editId
      ? "Updating..."
      : "Adding..."
    : editId
    ? "Update Product"
    : "Add Product"}
</button>

      </form>

    </div>
  );
};

export default AddProduct;