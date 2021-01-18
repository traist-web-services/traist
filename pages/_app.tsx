import type { AppProps /*, AppContext */ } from "next/app";
import path from "path";
path.resolve("./content"); // Let's tell Next that we need the content folder

import "../styles/globals.css";
import { TinaCMS, TinaProvider, ModalProvider } from "tinacms";
import { useMemo } from "react";
import { GithubClient } from "react-tinacms-github";
import { NextGithubMediaStore } from "next-tinacms-github";
import { TinacmsGithubProvider } from "react-tinacms-github";
import Head from "next/head";

const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
const baseRepoFullName = process.env.NEXT_PUBLIC_REPO_FULL_NAME;
const baseBranch = process.env.NEXT_PUBLIC_BASE_BRANCH;
const githubClient = new GithubClient({
  proxy: "/api/proxy-github",
  authCallbackRoute: "/api/create-github-access-token",
  clientId,
  baseRepoFullName,
  baseBranch,
});
const mediaStore = new NextGithubMediaStore(githubClient);

const enterEditMode = async () => {
  const token = localStorage.getItem("tinacms-github-token") || null;
  const headers = new Headers();

  if (token) {
    headers.append("Authorization", "Bearer " + token);
  }

  const response = await fetch(`/api/preview`, { headers });
  const data = await response.json();

  if (response.status === 200) {
    window.location.reload();
  } else {
    throw new Error(data.message);
  }
};

const exitEditMode = async () => {
  return fetch(`/api/reset-preview`).then(() => {
    window.location.reload();
  });
};

const MyApp = ({ Component, pageProps }: AppProps) => {
  const tinaConfig = {
    enabled: pageProps.preview,
    toolbar: pageProps.preview,
    sidebar: pageProps.preview,
    apis: {
      github: githubClient,
    },
    media: mediaStore,
  };

  const cms = useMemo(() => new TinaCMS(tinaConfig), []);

  return (
    <TinaProvider cms={cms}>
      <TinacmsGithubProvider
        onLogin={enterEditMode}
        onLogout={exitEditMode}
        error={pageProps.error}
      >
        <ModalProvider>
          <Head>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Component {...pageProps} />
        </ModalProvider>
      </TinacmsGithubProvider>
    </TinaProvider>
  );
};

export default MyApp;
