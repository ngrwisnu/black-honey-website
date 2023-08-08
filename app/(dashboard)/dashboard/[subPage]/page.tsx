import React from "react";

const SubPage = ({ params }: { params: { subPage: string } }) => {
  return <h1>SubPage: {params.subPage}</h1>;
};

export default SubPage;
