const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const allClearButton = document.querySelector('[data-all-clear]')
const deleteButton = document.querySelector('[data-delete]')

var calc = {
  currentOperand: "",
  previousOperand: "",
  currentOperandTextElement: document.querySelector('[data-current-operand]'),
  previousOperandTextElement: document.querySelector('[data-previous-operand]'),
  
  clear: () => {
    calc.currentOperand = ''
    calc.previousOperand = ''
    calc.operation = undefined
  },

  delete: () => {
    calc.currentOperand = calc.currentOperand.toString().slice(0, -1)
  },

  appendNumber: (number) => {
    if (number === '.' && calc.currentOperand.includes('.')) return
    calc.currentOperand = calc.currentOperand.toString() + number.toString()
  },

  chooseOperation: (operation) => {
    if (calc.currentOperand === '') return
    if (calc.previousOperand !== '') {
      calc.compute()
    }
    calc.operation = operation
    calc.previousOperand = calc.currentOperand
    calc.currentOperand = ''
  },

  compute: () => {
    let computation
    const prev = parseFloat(calc.previousOperand)
    const current = parseFloat(calc.currentOperand)
    if (isNaN(prev) || isNaN(current)) return
    switch (calc.operation) {
      case '+':
        computation = prev + current
        break
      case '-':
        computation = prev - current
        break
      case '*':
        computation = prev * current
        break
      case '÷':
        computation = prev / current
        break
      default:
        return
    }
    calc.currentOperand = computation
    calc.operation = undefined
    calc.previousOperand = ''
  },

  getDisplayNumber: (number) => {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  },

  updateDisplay: () => {
    calc.currentOperandTextElement.innerText =
      calc.getDisplayNumber(calc.currentOperand)
    if (calc.operation != null) {
      calc.previousOperandTextElement.innerText =
        `${calc.getDisplayNumber(calc.previousOperand)} ${calc.operation}`
    } else {
      calc.previousOperandTextElement.innerText = ''
    }
  }
}
  
numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calc.appendNumber(button.innerText)
    calc.updateDisplay()
  })
})

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calc.chooseOperation(button.innerText)
    calc.updateDisplay()
  })
})

equalsButton.addEventListener('click', button => {
  calc.compute()
  calc.updateDisplay()
})

allClearButton.addEventListener('click', button => {
  calc.clear()
  calc.updateDisplay()
})

deleteButton.addEventListener('click', button => {
  calc.delete()
  calc.updateDisplay()
})