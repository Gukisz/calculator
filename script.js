/* Constants used in HTML onclick */
const NUMBER = 3;
const OPERATOR_APPEND = 1;

const inputTypes = {
	clearScreen: 0,
	operator: 1,
	numberSignal: 2,
	number: 3,
	evaluation: 4,
};

let inputArray = [inputTypes.clearScreen];
let curExprIsFrac = false;

/* History */
let history = [];

/* ── Display ── */

function updateScreen(text) {
	let screen = document.getElementById('screen');
	screen.innerText = text;
	screen.scrollLeft = screen.scrollWidth;
}

/* ── Clear / Delete ── */

function clearScreen() {
	inputArray = [inputTypes.clearScreen];
	updateScreen('0');
}

function deleteLast() {
	let screenText = document.getElementById('screen').innerText;

	if (inputArray.length > 0) inputArray.pop();

	if (screenText.length > 1) {
		if (screenText[screenText.length - 1] === '.') curExprIsFrac = false;
		updateScreen(screenText.slice(0, -1));
	} else {
		clearScreen();
	}
}

/* ── Append Data ── */

function appendData(type, string) {
	let screenInnerText = document.getElementById('screen').innerText;
	if (type >= inputTypes.evaluation || type <= inputTypes.clearScreen) return;

	if (inputArray[inputArray.length - 1] === inputTypes.operator)
		screenInnerText += ' ';

	if (!(type === inputTypes.number && string === '.') && (inputArray[inputArray.length - 1] === inputTypes.clearScreen || (inputArray[inputArray.length - 1] === inputTypes.evaluation && screenInnerText === '0'))) {
		inputArray[inputArray.length - 1] = inputTypes.clearScreen;
		screenInnerText = '';
	}

	if (type === inputTypes.operator) {
		if (inputArray[inputArray.length - 1] === inputTypes.operator || inputArray[inputArray.length - 1] === inputTypes.clearScreen) {
			if ((string !== '+' && string !== '-')) return;
			type = inputTypes.numberSignal;
			updateScreen(screenInnerText + string);
		} else if (inputArray[inputArray.length - 1] !== inputTypes.numberSignal) {
			updateScreen(screenInnerText + ' ' + string + ' ');
		} else {
			return;
		}

		curExprIsFrac = false;
		inputArray.push(type);
		return;
	}

	if (type === inputTypes.number && string === '.') {
		if (curExprIsFrac) return;
		curExprIsFrac = true;
	}

	inputArray.push(type);
	updateScreen(screenInnerText + string);
}

/* ── Toggle Sign (+/-) ── */

function toggleSign() {
	let text = document.getElementById('screen').innerText;
	if (text === '0') return;

	if (text.startsWith('-')) {
		text = text.slice(1);
	} else {
		text = '-' + text;
	}
	updateScreen(text);
}

/* ── Square Root ── */

function squareRoot() {
	let text = document.getElementById('screen').innerText;
	let num = parseFloat(text);
	if (isNaN(num) || num < 0) return;

	let result = Math.sqrt(num);
	inputArray = [inputTypes.evaluation];
	if (result % 1 !== 0) {
		updateScreen(String(result.toFixed(4)));
		curExprIsFrac = true;
	} else {
		updateScreen(String(result));
	}
}

/* ── PostFix Engine ── */

class PostFixExpression {
	constructor(expression) {
		this.stack = [];
		const precedence = {'+': 1, '-': 1, '*': 2, '/': 2, '%': 2};
		const tokens = expression.split(' ').filter(item => item);
		const operatorStack = [];

		for (let i = 0; i < tokens.length; ++i) {
			if (/\d/.test(tokens[i])) {
				this.stack.push(tokens[i]);
			} else {
				while (operatorStack.length > 0 && precedence[operatorStack[operatorStack.length - 1]] >= precedence[tokens[i]])
					this.stack.push(operatorStack.pop());
				operatorStack.push(tokens[i]);
			}
		}

		while (operatorStack.length > 0)
			this.stack.push(operatorStack.pop());
	}

	solve() {
		const stack = [];

		for (let i = 0; i < this.stack.length; ++i) {
			if (/\d/.test(this.stack[i])) {
				stack.push(Number(this.stack[i]));
			} else {
				const b = stack.pop();
				const a = stack.pop();

				switch (this.stack[i]) {
				case '+':
					stack.push(a + b); break;
				case '-':
					stack.push(a - b); break;
				case '*':
					stack.push(a * b); break;
				case '/':
					stack.push(a / b); break;
				case '%':
					stack.push(a % b); break;
				}
			}
		}

		return stack.pop();
	}
}

/* ── Evaluate ── */

function evaluateExpression() {
	if (inputArray[inputArray.length - 1] === inputTypes.operator || inputArray[inputArray.length - 1] === inputTypes.numberSignal) return;

	let expression = document.getElementById('screen').innerText;
	let postFix = new PostFixExpression(expression);
	let result = postFix.solve();

	/* Save to history */
	history.push({ expression, result });
	renderHistory();

	inputArray = [inputTypes.evaluation];
	if (result % 1 !== 0) {
		updateScreen(String(result.toFixed(2)));
		curExprIsFrac = true;
	} else {
		updateScreen(String(result));
	}
}

/* ── History ── */

function toggleHistory() {
	document.getElementById('historyPanel').classList.toggle('open');
}

function renderHistory() {
	let panel = document.getElementById('historyPanel');
	if (history.length === 0) {
		panel.innerHTML = '<div class="history-empty">Nenhuma operação ainda</div>';
		return;
	}
	panel.innerHTML = history.toReversed().map(item =>
		`<div class="history-item">
			<div class="history-expr">${item.expression} =</div>
			<div class="history-result">${item.result % 1 !== 0 ? Number(item.result.toFixed(2)) : item.result}</div>
		</div>`
	).join('');
}

/* ── Theme ── */

function toggleTheme() {
	document.body.classList.toggle('dark');
	let icon = document.getElementById('themeIcon');
	if (document.body.classList.contains('dark')) {
		icon.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>';
	} else {
		icon.innerHTML = '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>';
	}
}

/* ── Palettes ── */

function setPalette(name) {
	document.body.classList.remove('palette-green', 'palette-blue', 'palette-purple', 'palette-orange', 'palette-pink');
	document.body.classList.add('palette-' + name);
}

/* ── Keyboard ── */

const keyMap = {
	'0': () => appendData(inputTypes.number, '0'),
	'1': () => appendData(inputTypes.number, '1'),
	'2': () => appendData(inputTypes.number, '2'),
	'3': () => appendData(inputTypes.number, '3'),
	'4': () => appendData(inputTypes.number, '4'),
	'5': () => appendData(inputTypes.number, '5'),
	'6': () => appendData(inputTypes.number, '6'),
	'7': () => appendData(inputTypes.number, '7'),
	'8': () => appendData(inputTypes.number, '8'),
	'9': () => appendData(inputTypes.number, '9'),
	'/': () => appendData(inputTypes.operator, '/'),
	'*': () => appendData(inputTypes.operator, '*'),
	'+': () => appendData(inputTypes.operator, '+'),
	'-': () => appendData(inputTypes.operator, '-'),
	'.': () => appendData(inputTypes.number, '.'),
	'Enter': () => evaluateExpression(),
	'=': () => evaluateExpression(),
	'Delete': () => deleteLast(),
	'Backspace': () => deleteLast(),
	'c': () => clearScreen(),
	'C': () => clearScreen(),
	'%': () => appendData(inputTypes.operator, '%'),
};

const keyDisplayMap = {
	'0': '0', '1': '1', '2': '2', '3': '3', '4': '4',
	'5': '5', '6': '6', '7': '7', '8': '8', '9': '9',
	'/': '÷', '*': '×', '+': '+', '-': '−',
	'.': '.', 'Enter': '=', '=': '=',
	'Delete': '←', 'Backspace': '←',
	'c': 'C', 'C': 'C', '%': '%',
};

function treatKeyboardInput(event) {
	if (keyMap[event.key]) {
		keyMap[event.key]();
		highlightKey(event.key);
		event.preventDefault();
	}
}

function highlightKey(key) {
	let display = keyDisplayMap[key];
	if (!display) return;

	let buttons = document.querySelectorAll('.calc-button');
	for (let btn of buttons) {
		if (btn.textContent.trim() === display) {
			btn.classList.add('pressed');
			setTimeout(() => btn.classList.remove('pressed'), 150);
			break;
		}
	}
}

document.addEventListener('keydown', treatKeyboardInput);

/* Prevent buttons from capturing focus */
document.addEventListener('DOMContentLoaded', function () {
	let elements = Array.from(document.querySelectorAll('.calc-buttons, .calc-button'));
	for (let el of elements) {
		el.addEventListener('keydown', function (event) { event.preventDefault(); });
	}
	renderHistory();
});
