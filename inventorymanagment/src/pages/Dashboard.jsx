import React, { useEffect, useState } from "react";
import { Switch, Layout } from "antd";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../redux/slices/productSlice";
import StatsCard from "../components/StatsCard";
import ProductTable from "../components/ProductTable";

const { Header } = Layout;

function Dashboard() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    axios
      .get("https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory")
      .then((response) => {
        dispatch(setProducts(response.data));
      })
      .catch((error) => {
        alert(`There was an error fetching data ${error}`);
      });
  }, [dispatch]);
  const totalProducts = products.length;
  const totalValue = products.reduce(
    (acc, product) => acc + parseFloat(product.value.replace("$", "")),
    0
  );
  const outOfStock = products.filter(
    (product) => product.quantity === 0
  ).length;
  const categories = [...new Set(products.map((product) => product.category))]
    .length;
  const handleSwitchChange = (checked) => {
    setIsAdmin(checked);
  };
  return (
    <>
      <Layout>
        <Header className="bg-green-800 flex justify-between">
          <div className="w-1/3 text-white text-xl p-4">
            Inventory Dashboard
          </div>
          <div className="flex justify-end w-1/3 p-4">
            <Switch
              checked={isAdmin}
              onChange={handleSwitchChange}
              checkedChildren="Admin"
              unCheckedChildren="User"
            />
          </div>
        </Header>
      </Layout>
      <div className="container m-2 p-4 mx-8">
        <div className="flex gap-4 mb-4">
          <StatsCard title="Total Products" value={totalProducts} />
          <StatsCard title="Total Store Value" value={`$${totalValue}`} />
          <StatsCard title="Out Of Stock" value={outOfStock} />
          <StatsCard title="Number of Catergories" value={categories} />
        </div>
        <ProductTable isAdmin={isAdmin} />
      </div>
    </>
  );
}

export default Dashboard;
