import React from "react";
import { GetStaticProps } from "next";
import Link from "next/link";
import Layout from "../components/layout";
import { useSession } from "next-auth/client";
import AuthRenderer from "../components/authRenderer";
import SignIn from "../signIn";

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

const IndexPage: React.FC<Props> = (props) => {
  const renderLayout = () => (
    <Layout>
      <ul>
        <li>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href="/signIn">
            <a>SignIn</a>
          </Link>
        </li>
        <li>
          <Link href="/dashboard">
            <a>Dashboard</a>
          </Link>
        </li>
      </ul>
    </Layout>
  );

  return (
    <AuthRenderer
      protectedComponent={renderLayout()}
      fallBackComponent={<SignIn />}
    />
  );
};

export default IndexPage;
