/*!

=========================================================
* NextJS Material Dashboard v1.1.0 based on Material Dashboard React v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/nextjs-material-dashboard
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/nextjs-material-dashboard/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import App from "next/app";
import Head from "next/head";
import Router from "next/router";

import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/login.css'
import '../styles/globals.css'
import "react-datepicker/dist/react-datepicker.css";

import PageChange from "components/PageChange/PageChange.js";

import "assets/css/nextjs-material-dashboard.css?v=1.1.0";
import { CookiesProvider } from 'react-cookie';
// import 'react-quill/dist/quill.snow.css';


Router.events.on("routeChangeStart", (url) => {
  console.log(`Loading: ${url}`);
  document.body.classList.add("body-page-transition");
  ReactDOM.render(
    <PageChange path={url} />,
    document.getElementById("page-transition")
  );
});
Router.events.on("routeChangeComplete", () => {
  ReactDOM.unmountComponentAtNode(document.getElementById("page-transition"));
  document.body.classList.remove("body-page-transition");
});
Router.events.on("routeChangeError", () => {
  ReactDOM.unmountComponentAtNode(document.getElementById("page-transition"));
  document.body.classList.remove("body-page-transition");
});

function MyApp({ Component, pageProps }) {
  const Layout = Component.layout || (({ children }) => <>{children}</>);
  return (
    <React.Fragment>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <title>Automation Tool</title>
          <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_KEY_HERE"></script>
        </Head>
        <body>
          <Layout>
            <CookiesProvider>
              <Component {...pageProps} />
            </CookiesProvider>
          </Layout>
        </body>
      </React.Fragment>
  )
}

export default MyApp;

// export default class MyApp extends App {
//   componentDidMount() {
//     let comment = document.createComment(`

// =========================================================
// * * NextJS Material Dashboard v1.1.0 based on Material Dashboard React v1.9.0
// =========================================================

// * Product Page: https://www.creative-tim.com/product/nextjs-material-dashboard
// * Copyright 2021 Creative Tim (https://www.creative-tim.com)
// * Licensed under MIT (https://github.com/creativetimofficial/nextjs-material-dashboard/blob/master/LICENSE.md)

// * Coded by Creative Tim

// =========================================================

// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

// `);
//     document.insertBefore(comment, document.documentElement);
//   }
//   static async getInitialProps({ Component, router, ctx }) {
//     let pageProps = {};

//     if (Component.getInitialProps) {
//       pageProps = await Component.getInitialProps(ctx);
//     }

//     return { pageProps };
//   }
//   render() {
//     const { Component, pageProps } = this.props;

//     const Layout = Component.layout || (({ children }) => <>{children}</>);

//     return (
//       <React.Fragment>
//         <Head>
//           <meta
//             name="viewport"
//             content="width=device-width, initial-scale=1, shrink-to-fit=no"
//           />
//           <title>Automation Tool</title>
//           <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_KEY_HERE"></script>
//         </Head>
//         <Layout>
//           <CookiesProvider>
//             <Component {...pageProps} />
//           </CookiesProvider>
//         </Layout>
//       </React.Fragment>
//     );
//   }
// }
