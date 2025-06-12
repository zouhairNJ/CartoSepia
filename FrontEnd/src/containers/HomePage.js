import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

const HomePage = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        // const token =
        //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcsImV4cCI6MTcwMjI0MzY1MywiaWF0IjoxNzAyMjQwMDUzfQ._K2efWU3qdcBbkegId-F48LvYfE7pTv_fXNIOJ_X05o";
        const token = localStorage.getItem("jwt");
        const response = await axios.get("/api/user", {
          headers: {
            authorization: token,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
        // console.log(response.data);
        let datauser = [];
        datauser.push(response.data);
        setUsers(datauser);
      } catch (error) {
        console.log(error);
        navigate("/");
      }
    };
    fetchData();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  const UserId = async (userId) => {
    try {
      // Make a DELETE request to your API endpoint
      await axios.delete(`/api/users/${userId}/`);
      // Fetch data again to update the table
      const response = await axios.get("/api/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const logout = async () => {
    await fetch("/api/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    localStorage.removeItem("jwt");

    // Cookies.remove("jwt");
  };

  return (
    <Layout title="Cartosepia | Home Page" content="Home Page">
      <h3>Home Page</h3>
    </Layout>
  );
};

export default HomePage;
