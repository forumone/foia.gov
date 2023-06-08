import React from 'react';
import PropTypes from 'prop-types';
import Pill from './wizard_component_pill';

/**
 * @param {Object} props
 * @param {WizardTopic[]} props.topics
 * @param {(topic: WizardTopic) => boolean} props.isTopicSelected
 * @param {(topic: WizardTopic) => void} props.onClickTopicButton
 * @returns {React.ReactNode}
 */
function PillGroup({
  label,
  topics,
  isTopicSelected,
  onClickTopicButton,
}) {
  if (topics && topics.length) {
    return (
      <div className="c-pill-group">
        {label && (
          <div className="c-pill-group__label">{label}</div>
        )}
        <ul className="c-pill-group__list">
          {topics.map((topic) => (
            <Pill
              key={topic.tid}
              data-selected={Number(isTopicSelected(topic))}
              onClick={() => onClickTopicButton(topic)}
            >
              {topic.title}
            </Pill>
          ))}
        </ul>
      </div>
    );
  }

  return null;
}

PillGroup.propTypes = {
  label: PropTypes.string,
  topics: PropTypes.array.isRequired,
  isTopicSelected: PropTypes.func.isRequired,
  onClickTopicButton: PropTypes.func.isRequired,
};

export default PillGroup;