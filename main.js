// Investment Accounts Assignment Start Code

// HTML Variables
let containerEl = document.getElementById("container");
let outputEl = document.getElementById("output");
let goBtnEl = document.getElementById("go");
let menuEl = document.getElementById("menu");
let inputEl = document.getElementById("addAcnt");

// Global Variable
let accounts = [];
for (let n = 1; n <= 200; n++) {
  accounts.push(Math.random() * 5000);
}
let maxAmount = 5000; // account values should be b/t 0 and max
let x = 0;

// Display Data
drawArray();

function drawArray() {
  let outputStr = "";
  let divHeight;
  for (let i = 0; i < accounts.length; i++) {
    divHeight = (accounts[i] / maxAmount) * 600; // Scale accounts to fit in array visualizer container
    outputStr += `<div style="height:${divHeight}px"></div>`;
  }
  containerEl.innerHTML = outputStr;
}

// Main Menu & Go Button
goBtnEl.addEventListener("click", mainMenu);

function showinput() {
  if (x == 0) {
    inputEl.style.display = "block";
    x ++;
  } else {
    console.log("yes");
    addAccount();
  }
} 

function mainMenu() {
  // Get value of menu select element
  let selection = menuEl.value;

  // Take action based on menu selection
  if (selection === "count-range") {
    countRange();
  } else if (selection === "donor") {
    generousDonor();
  } else if (selection === "hacker") {
    hackerAttack();
  } else if (selection === "stats") {
    investmentStats();
  } else if (selection === "add") {
    showinput();
  } else if (selection === "remove-low") {
    removeLow();
  } else if (selection === "robin-hood") {
    robinHood();
  }

  // Redraw array to show any changes
  drawArray();
}

// ******************************************************
// MENU SELECTION FUNCTIONS
// ******************************************************
function countRange() {
  // Output the number of accounts with amounts between $2,000 and $4,000, inclusive
  let count = 0;
  for (let i = 0; i < accounts.length; i++) {
    if (accounts[i] < 4000 && accounts[i] > 2000) {
      count ++;
    }
  }
  outputEl.innerHTML = "Count Range" + `<br />` + "Number of accounts with amounts between $2,000 and $4,000 is " + count;
}

function generousDonor() {
  // A generous donor has decided to give $500 to every investment
  // account that has less than $2000. 
  // Modify the investment account array to apply this donation.
  // Output the total amount of money that was donated.
  let donated = 0;
  for (let i = 0; i < accounts.length; i++) {
    if (accounts[i] < 2000) {
      accounts[i] += 500;
      donated += 500;
    }
  }
  outputEl.innerHTML = "Generous Donor" + `<br />` + "A generous donor donated $" + donated;
}

function hackerAttack() {
  // A hacker steals 5% from every account.
  // Modify the investment account array to apply this theft.
  // Output the total amount that was stolen.
  let total = 0;
  for (let i = 0; i < accounts.length; i++) {
    accounts[i] -= accounts[i] * 0.05;
    total += accounts[i] * 0.05;
  }
  outputEl.innerHTML = "Hacker Attack" + `<br />` + "total amount that was stolen is $" + total;
}

function investmentStats() {
  // Output the minimum account amount, the maximum account amount
  // and the average account amount.
  let maxNum = Math.max(...accounts);
  let minNum = Math.min(...accounts);
  let totalNum = 0;
  for (let i = 0; i < accounts.length; i++) {
    totalNum += accounts[i];
  }
  let AveNum = totalNum / accounts.length;
  outputEl.innerHTML = "Investment Stats" + `<br />` + "Maximum account amount: $" + maxNum + `<br />` + "Minimum account amount: $" + minNum + `<br />` + "Average account amount: $" + AveNum;
}

function addAccount() {
  // Prompt for a new account amount and add this to the invesment account
  // array. Output a confirmation that a new account was added with an
  // opening amount of _______.
  let addAct = inputEl.value;
  outputEl.innerHTML = "Add Account"
  if (addAct > 0) {
    if (addAct > 5000) {
      addAct = 5000;
    }
    accounts.push(addAct);
    outputEl.innerHTML = "Add Account" + `<br />` + "A new account was added with an opening amount of $" + addAct;
  }  
}

function removeLow() {
  // Remove all accounts that are below $500.
  // Output how many accounts were removed.
  let count = 0;
  for (let i = 0; i < accounts.length; i++) {
    if (accounts[i] < 500) {
      accounts.splice(i, 1);
      i -= 1; 
      count ++;
    }
  }
  outputEl.innerHTML = "Remove Low Accounts" + `<br />` + "Number of removed accounts is: " + count;
}

function robinHood() {
  // Steal from the rich and give to the poor.
  // Take $400 from every account that has over $4000.
  // Then evenly distribute the total amount taken between all the
  // accounts that have less than $1000.
  // Output how many accounts received money and 
  // how much each account received.
  let steal = 0;
  let numPoor = 0;
  for (let i = 0; i < accounts.length; i++) {
    if (accounts[i] > 4000) {
      accounts[i] -= 400;
      steal += 400;
    }
  }
  for (let i = 0; i < accounts.length; i++) {
    if (accounts[i] < 1000) {
      numPoor ++;
    }
  }
  let give = steal / numPoor;
  for (let i = 0; i < accounts.length; i++) {
    if (accounts[i] < 1000) {
      accounts[i] += give;
    }
  }
  outputEl.innerHTML = "Robin Hood" + `<br />` + numPoor + "of accounts received $" + give;
}