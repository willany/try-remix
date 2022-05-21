import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export interface User {
  login: string;
  avatar_url: string;
  html_url: string;
  bio: string;
}

export interface LoaderData {
  user: User;
}

export const loader: LoaderFunction = async ({ params }) => {
  const response = await fetch(
    `https://api.github.com/users/${params.username}`,
    {
      headers: {
        accept: "application/vnd.github.v3+json",
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
      },
    }
  );

  return {
    user: await response.json(),
  };
};

export default function () {
  const { user } = useLoaderData<LoaderData>();

  return (
    <>
      <h1>{user.login}</h1>
      <blockquote>{user.bio}</blockquote>
    </>
  );
}
