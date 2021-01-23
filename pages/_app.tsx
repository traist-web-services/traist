import type { AppProps /*, AppContext */ } from "next/app";
import path from "path";
path.resolve("../content"); // Let's tell Next that we need the content folder

import { useEffect } from "react";
import "../styles/globals.css";
import { TinaCMS, TinaProvider, ModalProvider } from "tinacms";
import { useMemo } from "react";
import { GithubClient } from "react-tinacms-github";
import { NextGithubMediaStore } from "next-tinacms-github";
import { TinacmsGithubProvider } from "react-tinacms-github";

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

  // TODO: #22 Self-host Chatwoot, white label it, and only load the backend widget onclick to reduce bundle size.
  useEffect(() => {
    const d = document;
    const t = "script";
    var BASE_URL = "https://app.chatwoot.com";
    var g = d.createElement(t),
      s = d.getElementsByTagName(t)[0];
    g.src = BASE_URL + "/packs/js/sdk.js";
    s.parentNode.insertBefore(g, s);
    g.onload = function () {
      window.chatwootSDK.run({
        websiteToken: "GoXSXNe3NBNNVW2gVcndEAQG",
        baseUrl: BASE_URL,
      });
    };
  }, []);
  return (
    <>
      <TinaProvider cms={cms}>
        <TinacmsGithubProvider
          onLogin={enterEditMode}
          onLogout={exitEditMode}
          error={pageProps.error}
        >
          <ModalProvider>
            <Component {...pageProps} />
          </ModalProvider>
        </TinacmsGithubProvider>
      </TinaProvider>
    </>
  );
};

export default MyApp;
