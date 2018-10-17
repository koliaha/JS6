let startBtn = document.getElementById('start'),
    budgetVal = document.getElementsByClassName('budget-value')[0],
    daybudgetVal = document.getElementsByClassName('daybudget-value')[0],
    levelVal = document.getElementsByClassName('level-value')[0],
    expensesVal = document.getElementsByClassName('expenses-value')[0],
    optionalExpensesVal = document.getElementsByClassName('optionalexpenses-value')[0],
    incomeVal = document.getElementsByClassName('income-value')[0],
    monthSavingsVal = document.getElementsByClassName('monthsavings-value')[0],
    yearSavingsVal = document.getElementsByClassName('yearsavings-value')[0],

    expensesItem = document.getElementsByClassName('expenses-item'),
    expensesBtn = document.getElementsByTagName('button')[0],
    optionalexpensesBtn = document.getElementsByTagName('button')[1],
    countBtn = document.getElementsByTagName('button')[2],
    optionalExpensesItem = document.querySelectorAll('.optionalexpenses-item'),
    chooseIncome = document.querySelector('.choose-income'),
    checkSave = document.querySelector('#savings'),
    sumValue = document.querySelector('.choose-sum'),
    percentVal = document.querySelector('.choose-percent'),
    yearValue = document.querySelector('.year-value'),
    monthValue = document.querySelector('.month-value'),
    dayValue = document.querySelector('.day-value');

    let money, time;
    startBtn.addEventListener('click', function() {
        time = prompt("Введите дату в формате YYYY-MM-DD",'');
        money = +prompt("Ваш бюджет на месяц?",'');
        
        while(isNaN(money) || money == "" || money == null){
            money = +prompt("Ваш бюджет на месяц?",'');
        }
        appData.budget = money;
        appData.timeData = time;
        budgetVal.textContent = money.toFixed();
        yearValue.value = new Date(Date.parse(time)).getFullYear();
        monthValue.value = new Date(Date.parse(time)).getDay() +1;
        dayValue.value = new Date(Date.parse(time)).getDate();
    });


expensesBtn.addEventListener('click', function(){
    let sum = 0;

    for (let i = 0; i < expensesItem.length; i++) {
        let a = expensesItem[i].value,
            b = expensesItem[++i].value;
        
        if ((typeof(a))==="string" && (typeof(a))!= null && (typeof(b))!= null
            && a != '' && b != '' && a.length < 50){
                console.log("okey");
                appData.expenses[a] = b;
                sum += +b;
            }
            else{
                i = i - 1;
            }
    }
    expensesVal.textContent = sum;
});

optionalexpensesBtn.addEventListener('click', function() {
    for (let i = 0; i < optionalExpensesItem.length; i++) {
        let arr = optionalExpensesItem[i].value;  
        if ((typeof(arr))!= null && arr != '') {
            appData.optionalExpenses[i] = arr; 
            optionalExpensesVal.textContent += appData.optionalExpenses[i] + ' '; 
        }else {
            optionalexpensesBtn.disabled();
        }  
       }
});

countBtn.addEventListener('click', function() {
    if (appData.budget != undefined) {
            appData.moneyPerDay = (appData.budget / 30).toFixed();
            daybudgetVal.textContent = appData.moneyPerDay;  

        if (appData.moneyPerDay < 100){
            levelVal.textContent = "Мин ур достатка";
        } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000){
            levelVal.textContent = "Сред ур достатка";
        } else if (appData.moneyPerDay > 2000){
            levelVal.textContent = "Высокий ур достатка";
        } else levelVal.textContent = "Ошибка";
    }   else {
        daybudgetVal.textContent = "Ошибка! Введите данные";
    }
});

chooseIncome.addEventListener('input', function() {
    let items = chooseIncome.value;
    appData.income = items.split(', ');
    incomeVal.textContent = appData.income;
});

checkSave.addEventListener('click', function() {
    if (appData.savings == true) {
        appData.savings = false;   
    } else {
        appData.savings = true;
    }
});

sumValue.addEventListener('input', function() {
    if (appData.savings == true) {
        let sum = +sumValue.value,
            percent = +percentVal.value;
        appData.monthIncome = sum/100/12*percent;
        appData.yearIncome = sum/100*percent;

        monthSavingsVal.textContent = appData.monthIncome.toFixed(1);
        yearSavingsVal.textContent = appData.monthIncome.toFixed(1);
    }
});

percentVal.addEventListener('input', function() {
    if (appData.savings == true) {
        let sum = +sumValue.value,
            percent = +percentVal.value;
        appData.monthIncome = sum/100/12*percent;
        appData.yearIncome = sum/100*percent;

        monthSavingsVal.textContent = appData.monthIncome.toFixed(1);
        yearSavingsVal.textContent = appData.monthIncome.toFixed(1);
    }
});

    let appData = {
        budget: money,
        timeData: time,
        expenses: {},
        optionalExpenses: {},
        income: [],
        savings: false
    };

