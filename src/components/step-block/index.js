import PropTypes from "prop-types";
import React from 'react';

import './style.css';
import {StepIcon} from "../step-icon";

export function StepBlock({children, step}) {
    return (
        <div className="step-block">
            <div className="step">
                <StepIcon step={step}/>
            </div>
            <div className="content">
                {children}
            </div>
        </div>
    );
}

StepBlock.defaultProps = {
    step: null
};

StepBlock.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired,
    step: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ])
};
