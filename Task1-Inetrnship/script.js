document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    const clearButton = document.getElementById('clear');
    const equalButton = document.getElementById('equal');
    const themeToggleButton = document.getElementById('theme-toggle');
    let currentInput = '';
    let operation = '';
    let firstValue = '';
    let secondValue = '';

    function updateDisplay(value) {
        display.textContent = value;
    }

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.getAttribute('data-value');

            if (button.classList.contains('operator')) {
                if (currentInput && firstValue) {
                    secondValue = currentInput;
                    currentInput = calculate();
                    firstValue = currentInput;
                    secondValue = '';
                }
                operation = value;
                firstValue = currentInput;
                currentInput = '';
            } else {
                currentInput += value;
            }

            updateDisplay(currentInput);
        });
    });

    clearButton.addEventListener('click', () => {
        currentInput = '';
        operation = '';
        firstValue = '';
        secondValue = '';
        updateDisplay('0');
    });

    equalButton.addEventListener('click', () => {
        if (firstValue && currentInput) {
            secondValue = currentInput;
            currentInput = calculate();
            updateDisplay(currentInput);
            firstValue = currentInput;
            secondValue = '';
        }
    });

    themeToggleButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });

    function calculate() {
        switch (operation) {
            case '+':
                return (parseFloat(firstValue) + parseFloat(secondValue)).toString();
            case '-':
                return (parseFloat(firstValue) - parseFloat(secondValue)).toString();
            case '*':
                return (parseFloat(firstValue) * parseFloat(secondValue)).toString();
            case '/':
                return (parseFloat(firstValue) / parseFloat(secondValue)).toString();
            default:
                return currentInput;
        }
    }

    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
    }
});
