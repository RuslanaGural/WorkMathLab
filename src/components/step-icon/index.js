import PropTypes from "prop-types";
import React from 'react';

import './style.css';

export function StepIcon({step}) {
    return (
        <div className="step-icon">{step}</div>
    );
}

StepIcon.defaultProps = {
    step: null
};

StepIcon.propTypes = {
    step: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ])
};
