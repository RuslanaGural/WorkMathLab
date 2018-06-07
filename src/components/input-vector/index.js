import Matrix from 'ml-matrix';
import PropTypes from 'prop-types';
import React, {Component} from 'react';

import './style.css';

export class InputVector extends Component {

    componentDidUpdate(prevProps) {
        if (prevProps.dimension !== this.props.dimension) {
            const {dimension} = this.props;
            this.setState({
                vector: this.createNullVector(dimension)
            });
        }
    }

    constructor(props) {
        super();
        this.state = {
            vector: this.createNullVector(props.dimension)
        };
    }

    handleChange = ({target}) => {
        const column = +target.getAttribute('data-column');
        const value = !isNaN(target.value) ? target.value : 0;
        this.setState(prevState => ({
            vector: prevState.vector.clone().set(0, column, value)
        }));
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.handleInputVectorSubmit(this.state.vector);
        this.setState({
            vector: this.createNullVector(this.props.dimension)
        })
    };

    render() {
        const {label} = this.props;
        const {vector} = this.state;
        return (
            <div className="input-vector">
                <form onSubmit={this.handleSubmit}>
                    <fieldset>
                        <legend>{label}</legend>
                        {vector.map((row, i) => (
                            <div
                                key={i}
                                className="input-vector-row"
                            >
                                {row.map((cell, j) => (
                                    <input
                                        className="input-vector-cell"
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

    createNullVector(dimension) {
        return new Matrix(Matrix.zeros(1, dimension)
            .map(row => row.map(() => '')))
    }
}

InputVector.defaultProps = {
    label: 'Заповніть вхідний вектор:'
};

InputVector.propTypes = {
    dimension: PropTypes.number.isRequired,
    handleInputVectorSubmit: PropTypes.func.isRequired,
    label: PropTypes.string
};
