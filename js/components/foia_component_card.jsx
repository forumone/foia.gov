import React from 'react';
import PropTypes from 'prop-types';

/**
 * @param {import('prop-types').InferProps<typeof Card>} props
 */
function Card({ card }) {
  const {
    tag, title, url, onClick, subtitle, confidenceScore, alt,
  } = card;

  return (
    <a className={`foia-component-card ${alt ? 'foia-component-card--alt' : ''}`} href={url} onClick={onClick}>
      <span className="foia-component-card__tag">{tag}</span>
      <h2 className="foia-component-card__title">{title}</h2>
      {subtitle && <span className="foia-component-card__subtitle">{subtitle}</span>}
      {confidenceScore && (
        <span className="foia-component-card__score">
          Score:
          {' '}
          {confidenceScore}
        </span>
      )}
    </a>
  );
}

Card.propTypes = {
  card: PropTypes.shape({
    tag: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    url: PropTypes.string.isRequired,
    confidenceScore: PropTypes.string,
    alt: PropTypes.string,
    onClick: PropTypes.func,
  }).isRequired,
};

export default Card;
