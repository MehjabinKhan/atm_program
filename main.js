#!usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let myBalance = 10000; //Dollar
let myPin = 1222;
console.log(chalk.blueBright("\n \tWelcome To ATM"));
let pinAnswer = await inquirer.prompt([
    {
        name: "pin",
        message: "enter your pin",
        type: "number"
    }
]);
if (pinAnswer.pin === myPin) {
    console.log(chalk.green("\n \tCorrect Pin Code!"));
    let operationAns = await inquirer.prompt([
        {
            name: "operation",
            message: "please select option",
            type: "list",
            choices: ["Withdraw", "check balance"]
        }
    ]);
    console.log(operationAns);
    if (operationAns.operation === "Withdraw") {
        let withdramAns = await inquirer.prompt([
            {
                name: "withdrawMethod",
                type: "list",
                message: "select a withdrawal method:",
                choices: ["Fast Cash", "Enter Amount"]
            }
        ]);
        if (withdramAns.withdrawMethod === "Fast Cash") {
            let fastCashAns = await inquirer.prompt([
                {
                    name: "fastCash",
                    type: "list",
                    message: "select amount",
                    choices: [1000, 2000, 3000, 4000, 5000, 6000]
                }
            ]);
            if (fastCashAns.fastCash > myBalance) {
                console.log(chalk.red("Insufficient Balance"));
            }
            else {
                myBalance -= fastCashAns.fastCash;
                console.log(chalk.yellow(`${fastCashAns.fastCash} withdraw Successfully`));
                console.log(chalk.magenta(`Your remaining balance is : ${myBalance}`));
            }
        }
        else if (withdramAns.withdrawMethod === "Enter Amount") {
            let amountAns = await inquirer.prompt([
                {
                    name: "amount",
                    message: "enter your amount",
                    type: "number",
                }
            ]);
            if (amountAns.amount > myBalance) {
                console.log("Insufficient Balance");
            }
            else {
                myBalance -= amountAns.amount;
                console.log(chalk.underline(`your remaining balance is: ${myBalance}`));
            }
        }
    }
    else if (operationAns.operation === "check balance") {
        console.log(`your current balance is: ${myBalance}`);
    }
}
else {
    console.log(chalk.bold("Incorrect Pin Code!"));
}
