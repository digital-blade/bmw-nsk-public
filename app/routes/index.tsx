import type { LogtoContext } from "@logto/remix";
import type { LoaderFunction} from "@remix-run/node";
import {json, redirect} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { logto } from "~/services/authentication";

type LoaderResponse = {
  readonly context: LogtoContext;
};

export const loader: LoaderFunction = async ({ request }) => {
  const context = await logto.getContext({ getAccessToken: false })(
      request
  );

  if (!context.isAuthenticated) {
    return redirect("/api/logto/sign-in");
  }

  return json<LoaderResponse>({ context });
};

const Home = () => {
  const data = useLoaderData<LoaderResponse>();

  return <div>Protected Route.</div>;
};
