import React from 'react';
import PropTypes from 'prop-types';

import Head from 'next/head';

const Meta = ({ title, keywords, description }) => (
  <Head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="keywords" content={keywords} />
    <meta name="description" content={description} />
    <meta charSet="utf-8" />
    <link rel="icon" href="/favicon.ico" />
    <title>
      Village |
      {' '}
      {title}
    </title>
  </Head>
);

Meta.defaultProps = {
  title: 'Village App',
  keywords: 'sign up forms, community, volunteer',
  description: 'Group signups made easy.',
};

Meta.propTypes = {
  title: PropTypes.string,
  keywords: PropTypes.string,
  description: PropTypes.string,
};

export default Meta;
