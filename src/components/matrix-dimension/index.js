import PropTypes from 'prop-types';
import React, {Component} from 'react';

import './style.css';

export class MatrixDimension extends Component { //todo::change component name

    constructor(props) {
        super();
        this.state = {
            dimension: props.dimension
        };
    }

    dimensionChangeHandler = (e) => {
        const dimension = parseInt(e.target.value, 10);
        if (dimension && dimension > 0) {
            this.setState({
                dimension
            })
        }
    };

    dimensionSubmitHandler = (e) => {
        e.preventDefault();
        const {dimensionSubmitHandler} = this.props;
        const {dimension} = this.state;
        dimensionSubmitHandler(dimension);
    };

    render() {
        const {dimension} = this.state;
        const {label} = this.props;
        return (
            <form onSubmit={this.dimensionSubmitHandler}>
                <fieldset>
                    <legend>{label}</legend>
                    <input type="number" min="1" value={dimension} onChange={this.dimensionChangeHandler}/>
                    <button type="submit" className="btn">Відправити</button>
                </fieldset>
            </form>
        );
    }
}

MatrixDimension.defaultProps = {
    label: 'Задайте розмірність матриці (мінімум 2):' // todo::change
};

MatrixDimension.propTypes = {
    dimension: PropTypes.number.isRequired,
    dimensionSubmitHandler: PropTypes.func.isRequired,
    label: PropTypes.string
};
