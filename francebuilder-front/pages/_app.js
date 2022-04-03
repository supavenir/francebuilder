import React from 'react';
import Layout from './layout';

const MyApp = ({ Component, pageProps }) => {

  const isSpecificPage = (pageName) => {
    const specificPages = ["SignIn", "SignUp"];
    return specificPages.includes(pageName);
  }

  return (
    <>
      {isSpecificPage(Component.name)
        ? <Component {...pageProps} />
        : <Layout>
            <Component {...pageProps} />
          </Layout>
      }
    </>
  )
} 
export default MyApp;