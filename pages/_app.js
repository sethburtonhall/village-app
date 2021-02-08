/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import { ThemeProvider } from 'next-themes';
import PropTypes from 'prop-types';

import { Toaster } from 'react-hot-toast';

import Layout from '../components/Layout';
import { AuthProvider } from '../state/AuthContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class">
      <AuthProvider>
        <Layout>
          <Toaster position="top-right" />
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </ThemeProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.node.isRequired,
  pageProps: PropTypes.isRequired,
};

export default MyApp;
