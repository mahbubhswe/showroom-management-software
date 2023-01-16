import React from "react";
import useSWR from "swr";
import ShopSetupForm from "../../../components/ShopSetupForm";
import Loading from "../../../components/Loading";
import Layout from "../../../components/Layout";
import axios from "axios";
const getShopInfo = (url) => axios.get(url).then((res) => res.data);
export default function Index() {
  const { data } = useSWR(`/api/shopSetup/read`, getShopInfo);
  if (!data) {
    return (
      <Layout pageTitle="Loading...">
        <Loading />;
      </Layout>
    );
  }
  return (
    <Layout pageTitle="Shop Setup">
      <ShopSetupForm  data={data}/>
    </Layout>
  );
}
