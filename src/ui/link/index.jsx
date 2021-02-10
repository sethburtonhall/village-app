import React from 'react';
import PropTypes from 'prop-types';

import NextLink from 'next/link';
import { useRouter } from 'next/router';

import styles from './styles.module.css';

export default function Link({ href, className, children, ...props }) {
  const router = useRouter();

  return (
    <NextLink href={href}>
      <a
        className={`${styles.link} ${
          className === 'nav-link' && styles['nav-link']
        } ${router.asPath === href && styles.active}`}
      >
        {children}
      </a>
    </NextLink>
  );
}

Link.propTypes = {
  href: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
