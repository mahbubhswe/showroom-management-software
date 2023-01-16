import React from "react";
import LoginForm from "../../components/LoginForm";
import AuthLayout from "../../components/AuthLayout";
import Loading from "../../components/Loading";
import axios from "axios";
import useSWR from "swr";
const getShopName = (url) => axios.get(url).then((res) => res.data);
export default function Index() {
  const { data } = useSWR(`/api/shopSetup/read`, getShopName);
  if (!data) {
    return <Loading />
  }
  return (
    <AuthLayout pageTitle="User Login">
      <LoginForm data={data} />
    </AuthLayout>
  );
}
