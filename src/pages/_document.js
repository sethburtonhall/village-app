import React from 'react';
import Document, {
  Html, Head, Main, NextScript,
} from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="UTF-8" />
          <meta name="description" content="Village" />
          <meta name="keywords" content="Group Sign Ups" />
          <meta name="author" content="Seth Hall" />
          <link rel="icon" href="/favicon.ico" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Dosis:wght@700&family=Roboto+Slab:wght@300;400&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body className="bg-gray-100 dark:bg-gray-800">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
