const { createRoot } = ReactDOM;
const { useState } = React;

const numbersData = [
    {
        id: "one",
        sign: "1"
    },
    {

        id: "two",
        sign: "2"
    },
    {

        id: "three",
        sign: "3"
    },
    {

        id: "four",
        sign: "4"
    },
    {

        id: "five",
        sign: "5"
    },
    {

        id: "six",
        sign: "6"
    },
    {

        id: "seven",
        sign: "7"
    },
    {

        id: "eight",
        sign: "8"
    },
    {

        id: "nine",
        sign: "9"
    },
    {
        id: "zeroZero",
        sign: "00"
    },
    {
        id: "zero",
        sign: "0"
    },
    {
        id: "decimal",
        sign: "."
    },
]

const operatorsData = [
    {
        id: "add",
        sign: "+"
    },
    {
        id: "subtract",
        sign: "-"
    },
    {
        id: "divide",
        sign: "/"
    },
    {
        id: "multiply",
        sign: "x"
    },
]

const calculator = (prevNum, operator, nextNum) => {
    switch (operator) {
        case "x":
            return prevNum * nextNum;
        case "/":
            return prevNum / nextNum;
        case "+":
            return prevNum + nextNum;
        case "-":
            return prevNum - nextNum;
        default:
            return "not valid operators"
    }
};

const operatorSelector = (opr, form) => {
    for (let i = 0; i < form.length; i++) {
        if (form[i] === opr) {
          const calculatedValue = calculator(form[i - 1], form[i], form[i + 1]);
          return [...form.slice(0, i -1), calculatedValue, ...form.slice(i + 2)];
        }
    }
    return [...form]
};

const calculations = (formula) => {
    if (formula.length <= 1) {
        return formula
    } else {
        const mult = operatorSelector("x" || "/", formula);
        const div = operatorSelector("/", mult);
        const minus = operatorSelector("-", div);
        const plus = operatorSelector("+" || "-", minus);
        return calculations(plus);
    }
};

const Calculator = ({ onNumCLick, onOprCLick, onAcClick, display, formula, onEqualsClick }) => {

    const numbers = numbersData.map(num => {
        return (
            <button 
                key={num.id}
                type="button" 
                className="number btn" 
                onClick={onNumCLick} 
                id={num.id}
                value={num.sign}
            >
                {num.sign}
            </button>  
        )
    });

    const operators = operatorsData.map(opr => {
        return (
            <button 
                key={opr.id}
                type="button" 
                className="number btn" 
                onClick={onOprCLick} 
                id={opr.id}
                value={opr.sign}
            >
                {opr.sign}
            </button>  
        )
    });

    return (
        <div id="calculator">
            <div id="screen">
                <div id="formula">{formula}</div>
                <div id="display">{display}</div>
            </div>
            <button 
                type="button" 
                className="btn" 
                id="clear" 
                onClick={onAcClick}
            >
                AC
            </button>
            <div id="main">
                <div id="numbers">
                    {numbers}
                </div>
                <div id="operators">
                    {operators}
                </div>
            </div>
            <button 
                type="button" 
                className="btn" 
                id="equals" 
                value="="
                onClick={onEqualsClick} 
            >
                =
            </button>
        </div>
    )
};

const App = () => {

    const [formula, setFormula] = useState([]);
    const [display, setDisplay] = useState([0]);

    //result logic => Handle Equal button
    let result;
    if (formula[formula.length - 1] == "=") {
        result = calculations(formula.slice(0, formula.length - 1));
        setDisplay(result)
        setFormula([...formula.slice(0, formula.length - 1)])
    }

    const handleNumberCLick = (e) => {
        const value = e.target.value;
        if (value == ".") {
            setDisplay((d) => {
                if ([...d].indexOf('.') > 0) {
                    return [...d];
                }  else {
                    return [...d, "."];
                }
            })
        } else {
            if (display.length == 1 && display[0] == 0) {
                setDisplay((d) => [parseFloat(value)]);
            } else {
                setDisplay((d) => [...d, parseFloat(value)]);
            }
        }
    };

    const handleOperatorClick = (e) => {
        const operator = e.target.value;
        const displayNumber = parseFloat(display.join(""));
        if (display == "-") {
            if (operator == "-") {
                setDisplay(["-"])
            } else {
                setFormula(f => {
                    const removeLastItem = [...f];
                    removeLastItem.pop();
                    return [
                        ...removeLastItem,
                        operator
                    ]
                })
                setDisplay([0]);
            }
        } else if (display == "0") {
            if (operator == "-") {
                setDisplay(["-"])
            } else {
                setFormula(f => {
                    const removeLastItem = [...f];
                    removeLastItem.pop();
                    return [
                        ...removeLastItem,
                        operator
                    ]
                })
                setDisplay([0]);
            }
        } else {
            setFormula((f) => {
                //handle result and continue colculation
                if (typeof f[f.length - 1] == "number") {
                    return [
                        displayNumber,
                        operator
                    ]
                } else {
                    return [
                        ...f,
                        displayNumber,
                        operator
                    ]
                }
            });
            setDisplay([0]);
        }
    };

    const handleAcClick = () => {
        setDisplay([0]);
        setFormula([]);
    };

    console.log(display)
    console.log(formula)

    let removeZeroDisplay = display.join('')
    return (
        <Calculator
            onNumCLick={handleNumberCLick}
            onOprCLick={handleOperatorClick}
            onAcClick={handleAcClick}
            onEqualsClick={handleOperatorClick}
            display={display.join('')}
            formula={formula}
        />
    )
};

//Render
const app = document.getElementById('root');
const root = createRoot(app);
root.render(<App/>);