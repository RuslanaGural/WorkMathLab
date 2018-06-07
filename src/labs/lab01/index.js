import * as _ from 'lodash';
import Matrix from 'ml-matrix';
import React, {Component} from 'react';

import {InputMatrix} from "../../components/input-matrix";
import {MatrixDimension} from '../../components/matrix-dimension';
import {OutputMatrix} from "../../components/output-matrix";
import {StepBlock} from "../../components/step-block";

export class Lab01 extends Component {

    state = {
        dimension: 1,
        inputMatrix: [],
        preferenceMatrix: [],
        maxColValue: null,
        maxIndexes: [],
        maxValue: null
    };

    dimensionSubmitHandler = (dimension) => {
        this.setState({
            dimension: dimension,
            inputMatrix: [],
            preferenceMatrix: [],
            maxColValue: null,
            maxIndexes: [],
            maxValue: null
        });
    };

    handleInputMatrixSubmit = (matrix) => {
        const {dimension} = this.state;

        const preferenceMatrix = Matrix.zeros(dimension, dimension);
        _.forEach(matrix, (row, rowKey) => {
            _.forEach(row, (cell, cellKey) => {
                if (matrix.get(rowKey, cellKey) > matrix.get(cellKey, rowKey)) {
                    preferenceMatrix.set(
                        rowKey,
                        cellKey,
                        Math.round((cell - matrix.get(cellKey, rowKey)) * 1000) / 1000
                    );
                }
            })
        });

        const maxColValue = Matrix.zeros(1, dimension);
        _.forEach(preferenceMatrix.transpose(), (row, rowKey) => {
            maxColValue.set(0, rowKey, Math.round((1 - Math.max(...row)) * 1000) / 1000);
        });

        const maxValue = Math.max(...maxColValue[0]);
        // const maxIndex = maxColValue[0].findIndex(value => value === maxValue);
        const maxIndexes = maxColValue[0]
            .map((value, index) => value === maxValue ? index : null)
            .filter(item => item !== null);

        this.setState({
            inputMatrix: matrix,
            preferenceMatrix,
            maxColValue: maxColValue[0],
            maxIndexes,
            maxValue
        });

    };

    render() {
        const {dimension, inputMatrix, maxColValue, maxIndexes, maxValue, preferenceMatrix} = this.state;
        return (
            <div className="lab-01">

                <StepBlock step="1">
                    <MatrixDimension
                        dimension={dimension}
                        dimensionSubmitHandler={this.dimensionSubmitHandler}
                    />
                </StepBlock>

                {
                    dimension > 1 && (
                        inputMatrix.length > 0 ? (
                            <StepBlock step="2">
                                <div>
                                    <h3>Введіть матрицю нечіткого нестрогого відношення переваги:</h3>
                                    <OutputMatrix
                                        matrix={inputMatrix}
                                    />
                                </div>
                            </StepBlock>
                        ) : (
                            <StepBlock step="2">
                                <InputMatrix
                                    dimension={dimension}
                                    handleInputMatrixSubmit={this.handleInputMatrixSubmit}
                                />
                            </StepBlock>
                        )
                    )
                }

                {
                    preferenceMatrix[0] && (
                        <StepBlock step="3">
                            <div>
                                <h3>Матриця строго відношення переваги:</h3>
                                <OutputMatrix
                                    matrix={preferenceMatrix}
                                />
                            </div>
                        </StepBlock>

                    )
                }

                {
                    maxColValue !== null && (
                        <StepBlock step="4">
                            <div>
                                <h3>Нечітка підмножина недомінованих альтернатив:</h3>
                                <div>{`[${maxColValue.join(', ')}]`}</div>
                            </div>
                        </StepBlock>
                    )
                }

                {
                    maxValue !== null && (
                        <StepBlock step="5">
                            <div>
                                <h3>Множина максимально недомінованих альтернатив:</h3>
                                <div>
                                    {maxValue}
                                    {maxIndexes.length > 0 && ` (${maxIndexes.join(', ')})`}
                                </div>
                            </div>
                        </StepBlock>
                    )
                }

            </div>
        );
    }
}
