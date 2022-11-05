import { GetServerSideProps } from "next";
import React from "react";
import { getUserProfileData } from "../api/getUserProfile/[username]";

const CategoryPage = () => {
  return <div>CategoryPage</div>;
};

export const getServerSideProps: GetServerSideProps = async ({
  query: urlQuery,
}) => {
  const { username } = urlQuery;
  const data = await getUserProfileData(username);

  if ("notFound" in data) {
    return { notFound: true };
  }

  return {
    props: data,
  };
};

export default CategoryPage;
