import PropTypes from 'prop-types';
import React from 'react';

import './stype.css';

export function OutputMatrix({matrix}) {
    return (
        <div className="output-matrix">
            {matrix.map((row, rowKey) => (
                <div key={rowKey} className="output-matrix-row">
                    {row.map((cell, cellKey) => (
                        <span key={cellKey} className="output-matrix-cell">{cell}</span>
                    ))}
                </div>
            ))}
        </div>
    );
}

OutputMatrix.propTypes = {
    matrix: PropTypes.array.isRequired
};
