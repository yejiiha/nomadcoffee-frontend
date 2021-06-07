import React from "react";
import { Helmet } from "react-helmet-async";

function PageTitle({ title }: any) {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
}

export default PageTitle;

type PageTitleProps = {
  title: string;
};
