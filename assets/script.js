console.log("Selamat Anda berhasil menggunakan JavaScript pada Website");
alert("Selamat Datang di Web Kalkulator 🧮");

// dom element
const calculatorScreen = document.querySelector(".calculator-screen"); //
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const equalSign = document.querySelector(".equal-sign");
const clearBtn = document.querySelector(".all-clear");
const decimal = document.querySelector(".decimal");
const btnPercent = document.querySelector(".percent");

// variabel
let prevNumber = "";
let calculationOperator = "";
let currentNumber = "0";

// tampilan hitungan
const updateScreen = (number) => {
  calculatorScreen.value = number;
};

// input nomor
numbers.forEach((number) => {
  number.addEventListener("click", (event) => {
    inputNumber(event.target.value);
    updateScreen(currentNumber);
  });
});

const inputNumber = (number) => {
  if (currentNumber === "0") {
    currentNumber = number;
  } else {
    currentNumber += number;
  }
};

const inputOperator = (operator) => {
  if (calculationOperator === "") {
    prevNumber = currentNumber;
  }
  calculationOperator = operator;
  currentNumber = "0";
};

operators.forEach((operator) => {
  operator.addEventListener("click", (event) => {
    inputOperator(event.target.value);
  });
});

// fungsi kalkulasi
equalSign.addEventListener("click", () => {
  calculate();
  updateScreen(currentNumber);
});

// operasi matematika
const calculate = () => {
  let result = "";
  switch (calculationOperator) {
    case "+":
      result = parseFloat(prevNumber) + parseFloat(currentNumber);
      break;
    case "-":
      result = parseFloat(prevNumber) - parseFloat(currentNumber);
      break;
    case "*":
      result = parseFloat(prevNumber) * parseFloat(currentNumber);
      break;
    case "/":
      result = parseFloat(prevNumber) / parseFloat(currentNumber);
      break;
    default:
      return;
  }
  currentNumber = result;
  calculationOperator = "";
  // objek yang akan dikirimkan sebagai argumen fungsi putHistory()
  const history = {
    prevNumber: currentNumber.prevNumber,
    currentNumber: currentNumber.displayNumber,
    operator: currentNumber.operator,
    result: result,
  };
  putHistory(history);
  currentNumber.displayNumber = result;
  renderHistory();
};

// fungsi menghapus
clearBtn.addEventListener("click", () => {
  clearAll();
  updateScreen(currentNumber);
});

const clearAll = () => {
  prevNumber = "";
  calculationOperator = "";
  currentNumber = "0";
};

// fungsi angka desimal
inputDecimal = (dot) => {
  if (currentNumber.includes(".")) {
    return;
  }
  currentNumber += dot;
};
decimal.addEventListener("click", (event) => {
  inputDecimal(event.target.value);
  updateScreen(currentNumber);
});

btnPercent.addEventListener("click", (event) => {
  percent();
});

// fungsi persen
percent = (percent) => {
  if (prevNumber === "") {
    currentNumber = currentNumber / 100;
    updateScreen(currentNumber);
  }
  if (prevNumber !== "") {
    currentNumber = (prevNumber * currentNumber) / 100;
    updateScreen(currentNumber);
  }
};
