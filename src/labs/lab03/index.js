import * as _ from "lodash";
import Matrix from 'ml-matrix';
import React, {Component} from 'react';

import {InputMatrix} from "../../components/input-matrix";
import {MatrixDimension} from '../../components/matrix-dimension';
import {OutputMatrix} from "../../components/output-matrix";
import {StepBlock} from "../../components/step-block";
import {InputVector} from "../../components/input-vector";

export class Lab03 extends Component {

    state = {
        countMatrix: 1,
        dimension: 1,
        matrix: [],
        vector: [],
        matrixQ1: [],
        preferenceMatrixQ1: [],
        maxColValMatrixQ1: [],
        matrixQ2: [],
        preferenceMatrixQ2: [],
        maxColValMatrixQ2: [],
        minColVal: [],
        maxIndexes: [],
        maxVal: null
    };

    countMatrixSubmitHandler = (count) => {
        this.setState({
            countMatrix: count,
            dimension: 1,
            matrix: [],
            vector: [],
            matrixQ1: [],
            preferenceMatrixQ1: [],
            maxColValMatrixQ1: [],
            matrixQ2: [],
            preferenceMatrixQ2: [],
            maxColValMatrixQ2: [],
            minColVal: [],
            maxIndexes: [],
            maxVal: null
        })
    };

    dimensionSubmitHandler = (dimension) => {
        this.setState({
            dimension: dimension
        });
    };

    handleInputMatrixSubmit = (oneMatrix) => {
        this.setState(prevState => ({
            matrix: [...prevState.matrix, oneMatrix]
        }))
    };

    handleInputVectorSubmit = (vector) => {
        this.setState(prevState => {
            const {
                dimension,
                matrix,
            } = prevState;

            const matrixQ1 = matrix.reduce((res, next) => Matrix.min(res, next));
            const preferenceMatrixQ1 = Matrix.zeros(dimension, dimension);
            _.forEach(matrixQ1, (row, rowKey) => {
                _.forEach(row, (cell, cellKey) => {
                    if (matrixQ1.get(rowKey, cellKey) > matrixQ1.get(cellKey, rowKey)) {
                        preferenceMatrixQ1.set(
                            rowKey,
                            cellKey,
                            Math.round((cell - matrixQ1.get(cellKey, rowKey)) * 1000) / 1000
                        );
                    }
                })
            });
            const maxColValMatrixQ1 = Matrix.zeros(1, dimension);
            _.forEach(preferenceMatrixQ1.transpose(), (row, rowKey) => {
                maxColValMatrixQ1.set(0, rowKey, Math.round((1 - Math.max(...row)) * 1000) / 1000);
            });

            const matrixQ2 = vector[0]
                .map((value, i) => Matrix.mul(matrix[i], +value))
                .reduce((res, next) => Matrix.add(res, next));
            const preferenceMatrixQ2 = Matrix.zeros(dimension, dimension);
            _.forEach(matrixQ2, (row, rowKey) => {
                _.forEach(row, (cell, cellKey) => {
                    if (matrixQ2.get(rowKey, cellKey) > matrixQ2.get(cellKey, rowKey)) {
                        preferenceMatrixQ2.set(
                            rowKey,
                            cellKey,
                            Math.round((cell - matrixQ2.get(cellKey, rowKey)) * 1000) / 1000
                        );
                    }
                })
            });
            const maxColValMatrixQ2 = Matrix.zeros(1, dimension);
            _.forEach(preferenceMatrixQ2.transpose(), (row, rowKey) => {
                maxColValMatrixQ2.set(0, rowKey, Math.round((1 - Math.max(...row)) * 1000) / 1000);
            });

            const minColVal = Matrix.min(maxColValMatrixQ1, maxColValMatrixQ2);

            const maxVal = Math.max(...minColVal[0]);
            const maxIndexes = minColVal[0]
                .map((value, index) => value === maxVal ? index : null)
                .filter(item => item !== null);

            return {
                vector,
                matrixQ1,
                preferenceMatrixQ1,
                maxColValMatrixQ1,
                matrixQ2: matrixQ2.map(row => row.map(cell => Math.round(cell * 1000) / 1000)),
                preferenceMatrixQ2,
                maxColValMatrixQ2,
                minColVal,
                maxIndexes,
                maxVal
            };
        })
    };


    render() {
        const {
            countMatrix,
            dimension,
            matrix,
            vector,
            matrixQ1,
            preferenceMatrixQ1,
            maxColValMatrixQ1,
            matrixQ2,
            preferenceMatrixQ2,
            maxColValMatrixQ2,
            minColVal,
            maxIndexes,
            maxVal
        } = this.state;
        let step = 1;

        return (
            <div className="lab-03">

                <StepBlock step={step++}>
                    <MatrixDimension
                        dimension={countMatrix}
                        dimensionSubmitHandler={this.countMatrixSubmitHandler}
                        label="Введіть кількість матриць (min 2):"
                    />
                </StepBlock>

                {
                    countMatrix > 1 && (
                        <StepBlock step={step++}>
                            <MatrixDimension
                                dimension={dimension}
                                dimensionSubmitHandler={this.dimensionSubmitHandler}
                            />
                        </StepBlock>
                    )
                }

                {
                    dimension > 1 && matrix.map((m, index) => (
                        <StepBlock step={step++} key={index}>
                            <div>
                                <h3>Матриця відношеня ({index + 1}):</h3>
                                <OutputMatrix
                                    matrix={m}
                                />
                            </div>
                        </StepBlock>
                    ))
                }


                {
                    dimension > 1 && matrix.length < countMatrix && (
                        <StepBlock step={step++}>
                            <InputMatrix
                                dimension={dimension}
                                handleInputMatrixSubmit={this.handleInputMatrixSubmit}
                                label={`Заповніть матрицю відношення (${matrix.length + 1}):`}
                            />
                        </StepBlock>
                    )
                }

                {
                    dimension > 1 && matrix.length === countMatrix && (
                        vector.length > 0 ? (
                            <StepBlock step={step++}>
                                <div>
                                    <h3>Ваговий вектор:</h3>
                                    <div>{`[${vector.join(', ')}]`}</div>
                                </div>
                            </StepBlock>
                        ) : (
                            <StepBlock step={step++}>
                                <InputVector
                                    dimension={countMatrix}
                                    handleInputVectorSubmit={this.handleInputVectorSubmit}
                                    label={'Заповніть ваговий вектор:'}
                                />
                            </StepBlock>
                        )
                    )
                }

                {
                    matrixQ1.length > 0 && (
                        <StepBlock step={step++}>
                            <div>
                                <h3>Матриця Q1:</h3>
                                <OutputMatrix
                                    matrix={matrixQ1}
                                />
                            </div>
                        </StepBlock>
                    )
                }

                {
                    preferenceMatrixQ1.length > 0 && (
                        <StepBlock step={step++}>
                            <div>
                                <h3>Матриця строгої переваги  Q1:</h3>
                                <OutputMatrix
                                    matrix={preferenceMatrixQ1}
                                />
                            </div>
                        </StepBlock>
                    )
                }

                {
                    maxColValMatrixQ1.length > 0 && (
                        <StepBlock step={step++}>
                            <div>
                                <h3>Множина недомінованих альтернатив Q1:</h3>
                                <div>{`[${maxColValMatrixQ1.join(', ')}]`}</div>
                            </div>
                        </StepBlock>
                    )
                }

                {
                    matrixQ2.length > 0 && (
                        <StepBlock step={step++}>
                            <div>
                                <h3>Матриця Q2:</h3>
                                <OutputMatrix
                                    matrix={matrixQ2}
                                />
                            </div>
                        </StepBlock>
                    )
                }

                {
                    preferenceMatrixQ2.length > 0 && (
                        <StepBlock step={step++}>
                            <div>
                                <h3>Матриця строгої переваги Q2:</h3>
                                <OutputMatrix
                                    matrix={preferenceMatrixQ2}
                                />
                            </div>
                        </StepBlock>
                    )
                }

                {
                    maxColValMatrixQ2.length > 0 && (
                        <StepBlock step={step++}>
                            <div>
                                <h3>Множина недомінованих альтернатив Q2:</h3>
                                <div>{`[${maxColValMatrixQ2.join(', ')}]`}</div>
                            </div>
                        </StepBlock>
                    )
                }

                {
                    minColVal.length > 0 && (
                        <StepBlock step={step++}>
                            <div>
                                <h3>Перетин Q1 i Q2:</h3>
                                <div>{`[${minColVal.join(', ')}]`}</div>
                            </div>
                        </StepBlock>
                    )
                }

                {
                    maxVal !== null && (
                        <StepBlock step="5">
                            <div>
                                <h3>Множина найкращтх альтернатив:</h3>
                                <div>
                                    {maxVal}
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
