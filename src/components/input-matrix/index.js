import Matrix from 'ml-matrix';
import PropTypes from 'prop-types';
import React, {Component} from 'react';

import './style.css';

export class InputMatrix extends Component {

    componentDidUpdate(prevProps) {
        if (prevProps.dimension !== this.props.dimension) {
            const {dimension} = this.props;
            this.setState({
                matrix: this.createNullMatrix(dimension)
            });
        }
    }

    constructor(props) {
        super();
        this.state = {
            matrix: this.createNullMatrix(props.dimension)
        };
    }

    handleChange = ({target}) => {
        const column = +target.getAttribute('data-column');
        const row = +target.getAttribute('data-row');
        const value = !isNaN(target.value) ? target.value : 0;
        this.setState(prevState => ({
            matrix: prevState.matrix.clone().set(row, column, value)
        }));
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.handleInputMatrixSubmit(this.state.matrix);
        this.setState({
            matrix: this.createNullMatrix(this.props.dimension)
        })
    };

    render() {
        const {label} = this.props;
        const {matrix} = this.state;
        return (
            <div className="input-matrix">
                <form onSubmit={this.handleSubmit}>
                    <fieldset>
                        <legend>{label}</legend>
                        {matrix.map((row, i) => (
                            <div
                                key={i}
                                className="input-matrix-row"
                            >
                                {row.map((cell, j) => (
                                    <input
                                        className="input-matrix-cell"
                                        data-row={i}
                                        data-column={j}
                                        key={j}
                                        type="text"
                                        value={cell}
                                        onChange={this.handleChange}
                                    />
                                ))}
                            </div>
                        ))}
                        <button type="submit" className="btn">Відправити</button>
                    </fieldset>
                </form>
            </div>
        );
    }

    createNullMatrix(dimension) {
        return new Matrix(Matrix.zeros(dimension, dimension)
            .map(row => row.map(() => '')))
    }
}

InputMatrix.defaultProps = {
    label: 'Заповніть вхідну матрицю:'
};

InputMatrix.propTypes = {
    dimension: PropTypes.number.isRequired,
    handleInputMatrixSubmit: PropTypes.func.isRequired,
    label: PropTypes.string
};
