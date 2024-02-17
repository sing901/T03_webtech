window.addEventListener('DOMContentLoaded', (event) => {
    const displayValueElement = document.getElementById('displayValue');
    let currentInput = '';
    let previousInput = '';
    let operator = '';
    let shouldResetInput = false;
    
    // Update the calculator's display
    function updateDisplay(value) {
        displayValueElement.textContent = value;
    }
    
    // Function to perform calculation
    function calculate(num1, num2, operator) {
        num1 = parseFloat(num1);
        num2 = parseFloat(num2);
        if (isNaN(num1) || isNaN(num2)) return null;
        switch(operator) {
            case '+':
                return num1 + num2;
            case '-':
                return num1 - num2;
            case '×':
                return num1 * num2;
            case '÷':
                if (num2 === 0) {
                    alert('Division by zero is undefined.');
                    return null;
                }
                return num1 / num2;
            default:
                return null;
        }
    }
    
    // Event delegation for number buttons
    document.querySelector('.numbers').addEventListener('click', event => {
        const target = event.target;
        if (target.classList.contains('number')) {
            if (shouldResetInput) {
                currentInput = '';
                shouldResetInput = false;
            }
            currentInput += target.textContent.trim();
            updateDisplay(currentInput);
        }
    });
    
    // Event delegation for operator buttons
    document.querySelector('.operators').addEventListener('click', event => {
        const target = event.target;
        if (target.classList.contains('operator')) {
            if (currentInput && operator && previousInput) {
                const result = calculate(previousInput, currentInput, operator);
                if (result === null) return; // Handle invalid calculations
                updateDisplay(result);
                previousInput = result.toString();
                currentInput = '';
            } else if (currentInput) {
                previousInput = currentInput;
                currentInput = '';
            }
            operator = target.textContent.trim();
            shouldResetInput = true;
        }
    });
    
    // Event listener for equal button
    document.getElementById('equal').addEventListener('click', () => {
        if (previousInput && currentInput && operator) {
            const result = calculate(previousInput, currentInput, operator);
            if (result === null) return; // Handle invalid calculations
            updateDisplay(result);
            previousInput = result.toString();
            currentInput = '';
            operator = '';
            shouldResetInput = true;
        }
    });
    
    // Event listener for the clear button
    document.getElementById('clear').addEventListener('click', () => {
        currentInput = '';
        previousInput = '';
        operator = '';
        updateDisplay('0');
        shouldResetInput = false;
    });
    
    // Event listener for the decimal button
    document.querySelector('.decimal').addEventListener('click', () => {
        if (!currentInput.includes('.')) {
            currentInput += '.';
            updateDisplay(currentInput);
        }
    });
});