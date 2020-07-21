import React, { useState } from 'react'
import './square.less';


function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

function Board(props) {
    const { squares } = props;

    const renderSqare = (i) => {
        return (
            <Square
                value={props.squares[i]}
                onClick={() => { props.onClick(i) }}
            ></Square>
        )
    }

    return (
        <div>
            {
                [0, 1, 2].map((row, i) => {
                    return <div className="board-row">
                        {
                            [0, 1, 2].map((col, j) => {
                                return renderSqare(row * 3 + col)
                            })
                        }
                    </div>
                })
            }
        </div>
    )
}


function Game(props) {
    let [data, setData] = useState({
        history: [
            {
                // default is empty
                squares: Array(9).fill(null)
            }
        ],
        stepNumber: 0,
        // first step to fill X
        xIsNext: true
    });

    const jumpTo = (step) => {
        setData((prev) => {
            return {
                ...prev,
                stepNumber: step,
                xIsNext: (step % 2) === 0
            }
        });
    }

    const handleClick = (i) => {
        const history = data.history.slice(0, data.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = data.xIsNext ? "X" : "O";

        setData({
            history: history.concat([
                {
                    squares: squares
                }
            ]),
            stepNumber: history.length,
            xIsNext: !data.xIsNext
        });
    }


    const history = data.history;
    const current = history[data.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
        const desc = move ?
            'Go to move #' + move :
            'Go to game start';
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{desc}</button>
            </li>
        );
    });

    let status;
    if (winner) {
        status = "Winner: " + winner;
    } else {
        status = "Next player: " + (data.xIsNext ? "X" : "O");
    }

    return (
        <div className="game">
            <div className="game-board">
                <Board squares={current.squares} onClick={i => handleClick(i)}></Board>
            </div>
            <div className="game-info">
                <div>{status}</div>
                <ol>{moves}</ol>
            </div>
        </div>
    )
}



function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}


export default Game;
