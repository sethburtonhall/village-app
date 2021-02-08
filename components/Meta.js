import React from 'react';

import Head from 'next/head';
import PropTypes from 'prop-types';

const Meta = ({ title, keywords, description }) => (
  <Head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="keywords" content={keywords} />
    <meta name="description" content={description} />
    <meta charSet="utf-8" />
    <link rel="icon" href="/favicon.ico" />
    <title>
      Village
      {title}
    </title>
  </Head>
);

Meta.defaultProps = {
  keywords: 'sign up forms, community, volunteer',
  description: 'Group signups made easy.',
};

Meta.propTypes = {
  title: PropTypes.string.isRequired,
  keywords: PropTypes.string,
  description: PropTypes.string,
};

export default Meta;
