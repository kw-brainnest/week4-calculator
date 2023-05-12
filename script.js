const key =
	{one:[1,2,3,'+',4,5,6,'-',7,8,9,'*', 0,'C','=','/']
	,seven:[7,8,9,'+',4,5,6,'-',1,2,3,'*', 0,'C','=','/']
	,pad:'one'
	,values:''
	}

const calc = {operation:'', calculation:'', num1:'', num2:'', result:0}

function DisplayKeys()
{
	document.getElementById('display-number').value = '' 
	document.getElementById('calculation').value = ''
	document.getElementById('keypad').innerHTML = ''
	key.values = key[key.pad]

	for (let value of key.values)
	{
		let button = document.createElement('button')
		button.textContent = value
		button.classList.add('key')

		if (typeof value === "string") 
		{
			button.setAttribute('onclick', 'Input(`' + value + '`)')
		}
		else
		{
			button.setAttribute('onclick', 'Input(' + value + ')')
		}

		let keypad = document.getElementById('keypad')
		keypad.appendChild(button)
	}

}

function Input(value)
{

	switch (value)
	{
		case '+':
		case '-':
		case '*':
		case '/':
			if (calc.result != 0)
			{
				calc.num1 = calc.result
			}

                        if (calc.num1 === '')
			{
				document.getElementById('calculation').value = 'Calculation Invalid' 
			}
			else if (calc.num2 === '')
			{
				calc.operation = value
				document.getElementById('calculation').value = calc.num1 + value
			}
			else
			{
				document.getElementById('calculation').value = calc.num1 + value + calc.num2

			}
			break
		case 'C':
                        calc.num1 = ''
			calc.num2 = ''
			calc.calculation = ''
			calc.operation = ''
			result = 0
			document.getElementById('display-number').value = '' 
			document.getElementById('calculation').value = ''
			break
		case '=':
			if (calc.num1 === '')
			{
				document.getElementById('calculation').value = 'Calcualtion invalid, enter a number'
			}
			else if (calc.num2 === '' )
			{
				alert('Enter a number')
			}
			else
			{
				calc.num1 = parseInt(calc.num1)
				calc.num2 = parseInt(calc.num2)
        	                switch (calc.operation)
				{
					case '+': calc.result = (calc.num1 + calc.num2);break;
					case '-': calc.result = (calc.num1 - calc.num2);break;
					case '*': calc.result = (calc.num1 * calc.num2);break;
					case '/': calc.result = (calc.num1 / calc.num2);break;
					default : calc.result = 0;break; 
				}
				document.getElementById('display-number').value = calc.result
				calc.operation = ''
				calc.num2 = ''
				calc.num1 = ''
			}
			break
		default:
			if (calc.operation === '')
			{
				if (calc.num1 === '')
				{
					calc.num1 = value
					calc.result = 0
					document.getElementById('display-number').value = ''
				}
				else
				{
					calc.num1 += '' + value
				}

				document.getElementById('calculation').value = calc.num1
			}
			else
			{
				calc.num2 += '' + value
				document.getElementById('calculation').value = calc.num1 + calc.operation + calc.num2
			}

	}
}

function Change()
{

	(key.pad === 'one') ? key.pad = 'seven' : key.pad = 'one'

	DisplayKeys()
}