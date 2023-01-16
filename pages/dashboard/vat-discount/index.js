import React from "react";
import useSWR from "swr";
import SetVatAndDiscountForm from "../../../components/SetVatAndDiscountForm";
import Loading from "../../../components/Loading";
import Layout from "../../../components/Layout";
import axios from "axios";
const getVatAndDiscount = (url) => axios.get(url).then((res) => res.data);
export default function Index() {
  const { data } = useSWR(`/api/setVatAndDiscount/read`, getVatAndDiscount);
  if (!data) {
    return (
      <Layout pageTitle="Loading...">
        <Loading />;
      </Layout>
    );
  }
  return (
    <Layout pageTitle="Vat and Discount">
      <SetVatAndDiscountForm data={data} />
    </Layout>
  );
}
