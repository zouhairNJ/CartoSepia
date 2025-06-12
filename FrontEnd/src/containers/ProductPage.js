import React from "react";
import Layout from "../components/Layout";
import { useSelector } from "react-redux";

function Products() {
  const { loading, user } = useSelector((state) => state.user);
  return (
    <Layout title="Cartosepia | Porduct Page" content="Product Page">
      {loading ? (
        <div class="d-flex justify-content-center">
          <div class="spinner-border text-success" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <h1>Product List</h1>
      )}
    </Layout>
  );
}

export default Products;
