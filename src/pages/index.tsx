import React from "react";
import { GetStaticProps } from "next";
import Layout from "../components/layout";

export const getStaticProps: GetStaticProps = async () => {
  const feed = [
    {
      id: 1,
      title: "Prisma is the perfect ORM for Next.js",
      content:
        "[Prisma](https://github.com/prisma/prisma) and Next.js go _great_ together!",
      published: false,
      author: {
        name: "Nikolas Burk",
        email: "burk@prisma.io",
      },
    },
  ];
  return { props: { feed } };
};

type Props = {
  // feed: PostProps[]
};

const Blog: React.FC<Props> = (props) => {
  return (
    <Layout>
      <h1>Coming soon...</h1>
    </Layout>
  );
};

export default Blog;
