class Calc{

    //생성자를 통해서 초기화를 하고 컨텐츠를 비우고 clear함수를 통해 남아있는 데이터를 소멸한다.
    constructor(displayElement){
        this.displayElement = displayElement
        this.displayContent = ''
        this.clear()
    }

    // 숫자 입력이 들어오면 displayContent에 추가를 한다.
    appendNumber(number){
        this.displayContent += number
    }

    // 연산자 입력이 들어오면 displayContent에 추가를 한다.
    appendOperator(operator){
        this.displayContent += operator
    }
    
    // displayElement에 input객체의 value값에 업데이트를 한다.
    updateDisplay(){
        this.displayElement.value = this.displayContent
    }

    // ac 버튼 또는 초기실행시 전부를 비워준다.
    clear(){
        this.displayContent = ''
        this.displayElement.value = 0
    }

    // displayContent에서 연산기호를 발견하면 글자 치환을 다음 eval 함수를 실행한다.
    // displayContent에 eval 함수를 통해서 채워진 수식과 숫자를 연산을 해준다.
    // 참고자료 : https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/eval
    com(){
        this.displayContent = eval(this.displayContent
            .replace('\u00D7', '*')
            .replace('\u00F7', '/')
        )
    }
}

// querySelectorAll 메서드를 통해 html내부에 button 객체들을 리스트로 받아온다.
const buttons = document.querySelectorAll('button')

// querySelector를 통해 input를 가져온다. ( input박스는 1개만 선언 되어있기 때문 )
const displayElement = document.querySelector('input')

const calculator = new Calc(displayElement) // 버튼들 리스트를 생상자 매개변수로 초기화 시킨다.

buttons.forEach(button => { // buttons 리스트에서 전부 반복문을 돌리며 리스트 하나씩 button에 로드되고
    // 로드된 버튼에서 이벤트리스너에서 click이 감지 된다.
    button.addEventListener('click',() => { 
        switch (button.dataset.type) { // 리스너에서 눌러진 버튼의 dataset 인자값을 가져와서 switch
            // "operator" 스위치를 타고 들어올시 해당 button객체의 innerText에 value값(연산자기호)를 가져온다.
            case 'operator': calculator.appendOperator(button.innerText); calculator.updateDisplay(); break
            case 'ac': calculator.clear(); break
            case 'equals': calculator.com(); calculator.updateDisplay(); break
            default: calculator.appendNumber(button.innerText); calculator.updateDisplay(); break
        }
    })
})