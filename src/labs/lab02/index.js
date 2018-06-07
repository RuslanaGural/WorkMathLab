import Matrix from 'ml-matrix';
import React, {Component} from 'react';

import {InputMatrix} from "../../components/input-matrix";
import {MatrixDimension} from '../../components/matrix-dimension';
import {OutputMatrix} from "../../components/output-matrix";
import {StepBlock} from "../../components/step-block";

export class Lab02 extends Component {

    state = {
        dimension: 1,
        matrixA: [],
        supplementMatrixA: [],
        matrixB: [],
        supplementMatrixB: [],
        maxMatrix: [],
        minMatrix: [],
        subMatrixAB: [],
        subMatrixBA: [],
    };

    dimensionSubmitHandler = (dimension) => {
        this.setState({
            dimension: dimension,
            matrixA: [],
            supplementMatrixA: [],
            matrixB: [],
            supplementMatrixB: [],
            maxMatrix: [],
            minMatrix: [],
            subMatrixAB: [],
            subMatrixBA: [],
        });
    };

    handleInputMatrixASubmit = (matrix) => {
        this.setState(prevState => {
            const {dimension} = prevState;
            return {
                matrixA: matrix,
                supplementMatrixA: Matrix.sub(Matrix.ones(dimension, dimension), matrix)
                    .map(row => row.map(cell => Math.round(cell * 1000) / 1000)),
            };
        });
    };

    handleInputMatrixBSubmit = (matrix) => {
        this.setState(prevState => {
            const {dimension, matrixA, supplementMatrixA} = prevState;
            const supplementMatrixB = Matrix.sub(Matrix.ones(dimension, dimension), matrix)
                .map(row => row.map(cell => Math.round(cell * 1000) / 1000));
            return {
                matrixB: matrix,
                supplementMatrixB,
                maxMatrix: Matrix.max(matrixA, matrix),
                minMatrix: Matrix.min(matrixA, matrix),
                subMatrixAB: Matrix.min(matrixA, supplementMatrixB),
                subMatrixBA: Matrix.min(matrix, supplementMatrixA)
            };
        });
    };

    render() {
        const {
            dimension,
            matrixA,
            matrixB,
            maxMatrix,
            minMatrix,
            supplementMatrixA,
            supplementMatrixB,
            subMatrixAB,
            subMatrixBA
        } = this.state;
        return (
            <div className="lab-02">

                <StepBlock step="1">
                    <MatrixDimension
                        dimension={dimension}
                        dimensionSubmitHandler={this.dimensionSubmitHandler}
                    />
                </StepBlock>

                {
                    dimension > 1 && (
                        matrixA.length > 0 ? (
                            <StepBlock step="2">
                                <div>
                                    <h3>Введіть патрицю (A):</h3>
                                    <OutputMatrix
                                        matrix={matrixA}
                                    />
                                </div>
                            </StepBlock>
                        ) : (
                            <StepBlock step="2">
                                <InputMatrix
                                    dimension={dimension}
                                    handleInputMatrixSubmit={this.handleInputMatrixASubmit}
                                    label="Заповніть матрицю (A):"
                                />
                            </StepBlock>
                        )
                    )
                }

                {
                    supplementMatrixA.length > 0 && (
                        <StepBlock step="3">
                            <div>
                                <h3>Доповнення до матриці (A):</h3>
                                <OutputMatrix
                                    matrix={supplementMatrixA}
                                />
                            </div>
                        </StepBlock>
                    )
                }

                {
                    matrixA.length > 0 && (
                        matrixB.length > 0 ? (
                            <StepBlock step="4">
                                <div>
                                    <h3>Введіть патрицю  (B):</h3>
                                    <OutputMatrix
                                        matrix={matrixB}
                                    />
                                </div>
                            </StepBlock>
                        ) : (
                            <StepBlock step="3">
                                <InputMatrix
                                    dimension={dimension}
                                    handleInputMatrixSubmit={this.handleInputMatrixBSubmit}
                                    label="Заповніть матрицю (B):"
                                />
                            </StepBlock>
                        )
                    )
                }

                {
                    supplementMatrixB.length > 0 && (
                        <StepBlock step="5">
                            <div>
                                <h3>Доповнення до матриці (B):</h3>
                                <OutputMatrix
                                    matrix={supplementMatrixB}
                                />
                            </div>
                        </StepBlock>
                    )
                }

                {
                    maxMatrix.length > 0 && (
                        <StepBlock step="6">
                            <div>
                                <h3>Об'єднання матриць:</h3>
                                <OutputMatrix
                                    matrix={maxMatrix}
                                />
                            </div>
                        </StepBlock>
                    )
                }

                {
                    minMatrix.length > 0 && (
                        <StepBlock step="7">
                            <div>
                                <h3>Перетин матриць:</h3>
                                <OutputMatrix
                                    matrix={minMatrix}
                                />
                            </div>
                        </StepBlock>
                    )
                }

                {
                    subMatrixAB.length > 0 && (
                        <StepBlock step="8">
                            <div>
                                <h3>Різниця матриць A\B:</h3>
                                <OutputMatrix
                                    matrix={subMatrixAB}
                                />
                            </div>
                        </StepBlock>
                    )
                }

                {
                    subMatrixBA.length > 0 && (
                        <StepBlock step="8">
                            <div>
                                <h3>Різниця матриць B\A:</h3>
                                <OutputMatrix
                                    matrix={subMatrixBA}
                                />
                            </div>
                        </StepBlock>
                    )
                }

            </div>
        );
    }
}
