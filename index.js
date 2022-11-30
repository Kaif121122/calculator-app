

const sliderBtn = document.querySelector('.slider-btn');
const mainContainer = document.querySelector('.main-container');
const displayNumber = document.querySelector('.calculated-number')
const calculatorKeys = document.querySelectorAll('.keys');
const keypadContainer = document.querySelector('.keypad-buttons-container')

// THEME 1

function go_to_1() {
    sliderBtn.classList.add('horizTranslate1')
    sliderBtn.classList.remove('horizTranslate2')
    sliderBtn.classList.remove('horizTranslate3')
    document.body.classList.remove('theme_2')
    document.body.classList.remove('theme_3')
}

// THEME 2 

function go_to_2() {
    sliderBtn.classList.add('horizTranslate2')
    sliderBtn.classList.remove('horizTranslate1')
    sliderBtn.classList.remove('horizTranslate3')
    document.body.classList.add('theme_2')
    document.body.classList.remove('theme_3')
}

// THEME 3 

function go_to_3() {
    sliderBtn.classList.add('horizTranslate3')
    sliderBtn.classList.remove('horizTranslate2')
    sliderBtn.classList.remove('horizTranslate1')
    document.body.classList.add('theme_3')
}

// CALCULATOR KEY SECTION 

calculatorKeys.forEach((elem) => {

    elem.addEventListener('click', (e) => {


        calculatorKeys.forEach((elem) => {

            elem.classList.remove('opacity')
        })
        e.target.classList.add('opacity')


        let clicked_key = elem.textContent
        let action_key = elem.getAttribute('data-action')
        let previousKeyType = keypadContainer.dataset.previousKeyType
        console.log(previousKeyType)

        if (!action_key) {

            if (displayNumber.textContent === '0') {

                displayNumber.textContent = clicked_key

            } else if (previousKeyType === 'operator') {

                displayNumber.textContent = clicked_key
                keypadContainer.dataset.previousKeyType = 'number'



            } else {

                displayNumber.textContent = displayNumber.textContent + clicked_key
            }
        } else if (action_key === 'delete') {

            displayNumber.textContent = displayNumber.textContent.slice(0, -1)
            if (displayNumber.textContent.length === 0) {
                displayNumber.textContent = 0
                keypadContainer.dataset.firstValue = displayNumber.textContent
            }

        } else if (action_key === 'decimal') {
            if (displayNumber.textContent.includes('.')) {
                console.log('contain decimal')
            } else {

                displayNumber.textContent = displayNumber.textContent + clicked_key
            }

        } else if (action_key === 'equal') {

            const firstValue = keypadContainer.dataset.firstValue
            const operator = keypadContainer.dataset.operator
            const secondValue = displayNumber.textContent
            console.log(operator)

            if (!operator) {

                displayNumber.textContent = 0

            } else {

                displayNumber.textContent = calculate(firstValue, operator, secondValue)
            }
            console.log(displayNumber.textContent)


        } else if (action_key === 'add' || action_key === 'subtract'
            || action_key === 'multiply' || action_key === 'divide') {


            keypadContainer.dataset.previousKeyType = 'operator'
            keypadContainer.dataset.firstValue = displayNumber.textContent
            keypadContainer.dataset.operator = action_key

        } else if (action_key === 'reset') {

            displayNumber.textContent = 0
            keypadContainer.dataset.firstValue = displayNumber.textContent

        }


    })
})

// CALCULATION SECTION 

function calculate(a, operator, b) {

    let result = '';

    if (operator === 'add') {

        result = parseFloat(a) + parseFloat(b)
        console.log(result)

    } else if (operator === 'subtract') {

        result = parseFloat(a) - parseFloat(b)
        console.log(result)

    } else if (operator === 'multiply') {

        result = parseFloat(a) * parseFloat(b)
        console.log(result)

    } else if (operator === 'divide') {

        result = parseFloat(a) / parseFloat(b)
        console.log(result)

    }
    return result.toLocaleString("en-US")
}