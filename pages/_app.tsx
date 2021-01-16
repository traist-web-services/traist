import type { AppProps /*, AppContext */ } from 'next/app'

import "../styles/globals.css";
import { TinaCMS, TinaProvider } from "tinacms";
import { useMemo } from "react";
import { GithubClient } from "react-tinacms-github";
import { NextGithubMediaStore } from "next-tinacms-github";
import { TinacmsGithubProvider } from "react-tinacms-github";

function MyApp({ Component, pageProps }) {
  console.log(process.env.GITHUB_CLIENT_ID, process.env.REPO_FULL_NAME, process.env.BASE_BRANCH)
  const githubClient = new GithubClient({
    proxy: "/api/proxy-github",
    authCallbackRoute: "/api/create-github-access-token",
    clientId: process.env.GITHUB_CLIENT_ID,
    baseRepoFullName: process.env.REPO_FULL_NAME,
    baseBranch: process.env.BASE_BRANCH
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

  const tinaConfig = {
    enabled: pageProps.preview,
    toolbar: pageProps.preview,
    apis: {
      github: githubClient,
    },
    media: mediaStore,
    sidebar: {
      position: "displace",
    },
  };

  const cms = useMemo(() => new TinaCMS(tinaConfig), []);

  return (
    <TinaProvider cms={cms}>
      <TinacmsGithubProvider
        onLogin={enterEditMode}
        onLogout={exitEditMode}
        error={pageProps.error}
      >
        <Component {...pageProps} />
      </TinacmsGithubProvider>
    </TinaProvider>
  );
}

export default MyApp;
