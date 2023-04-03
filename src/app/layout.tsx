"use client";

import { Flip, ToastContainer } from "react-toastify";

import StyledComponentsRegistry from "@src/lib/registry";
import Provider from "@src/providers/MyProvider";
import Layout from "@src/layout/Layout";

import "react-toastify/dist/ReactToastify.css";
import "@src/css/react-toastify.css";

/** 2023/03/24 - Root Layout - by 1-blue */
const RootLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <html lang="ko">
      <head>
        {/* 기본 설정 */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* favicon */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </head>

      <body>
        <StyledComponentsRegistry>
          <ToastContainer
            theme="dark"
            hideProgressBar
            autoClose={1500}
            position="top-center"
            transition={Flip}
            pauseOnFocusLoss={false}
          />

          <Provider>
            <Layout>{children}</Layout>
          </Provider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
};

export default RootLayout;
