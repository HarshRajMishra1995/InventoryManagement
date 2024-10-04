import React, { useState } from "react";
import { Table, Button, Modal, Input } from "antd";
import { EyeOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  updateProduct,
  deleteProduct,
  setProducts,
} from "../redux/slices/productSlice";

function ProductTable({ isAdmin }) {
  const products = useSelector((state) => state.products.products);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleEdit = (product) => {
    console.log("Record ----> ", product);
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    console.log(editingProduct);
    dispatch(
      updateProduct({ name: editingProduct.name, updatedData: editingProduct })
    );
    setProducts(products);
    setIsModalOpen(false);
  };

  const handleDelete = (name) => {
    dispatch(deleteProduct(name));
    setProducts(products);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => {
        return (
          <>
            <Button
              icon={<EditOutlined />}
              onClick={() => handleEdit(record)}
              disabled={!isAdmin}
            />
            <Button
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(record.name)}
              style={{ marginLeft: "10px" }}
              disabled={!isAdmin}
            />
          </>
        );
      },
    },
  ];

  return (
    <div>
      <Table dataSource={products} columns={columns} rowKey="id" />
      {editingProduct && (
        <Modal
          title="Edit Product"
          open={isModalOpen}
          onOk={handleSave}
          onCancel={() => setIsModalOpen(false)}
        >
          <div className="flex gap-2">
            <Input
              value={editingProduct.name}
              onChange={(e) =>
                setEditingProduct({ ...editingProduct, name: e.target.value })
              }
              placeholder="Name"
            />
            <Input
              value={editingProduct.category}
              onChange={(e) =>
                setEditingProduct({
                  ...editingProduct,
                  category: e.target.value,
                })
              }
              placeholder="Category"
            />
          </div>
          <div className="flex gap-2 mt-2">
            <Input
              value={editingProduct.value}
              onChange={(e) => {
                setEditingProduct({ ...editingProduct, value: e.target.value });
              }}
              placeholder="Value"
            />
            <Input
              value={editingProduct.quantity}
              onChange={(e) =>
                setEditingProduct({
                  ...editingProduct,
                  quantity: e.target.value,
                })
              }
              placeholder="Quantity"
            />
          </div>
          <div className="flex mt-2">
            <Input
              value={editingProduct.price}
              onChange={(e) =>
                setEditingProduct({ ...editingProduct, price: e.target.value })
              }
            />
          </div>
        </Modal>
      )}
    </div>
  );
}

export default ProductTable;
