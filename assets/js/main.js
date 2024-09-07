$(document).ready(() => {
  // select data:
  const billInput = $(".bill-input input");
  const tipPercentBtns = [];
  const numberOfPeople = $(".people-input input");
  const resetBtn = $(".reset-values");

  //show resault:
  const tipEachPerson = $("#tipEachPerson");
  const totalEachPerson = $("#totalEachPerson");
  const errorMassage = $(".error-msg");

  //push btn to array:
  Object.values($(".tip-percent")).forEach((button, i) => {
    if (button.type === "button" || button.type === "number") {
      tipPercentBtns.push(button);
    }
  });

  // how to calc tip:
  // --> create function tip-calc:
  const tipCalc = (tipValue = 0) => {
    if (numberOfPeople.val() < 1) {
      errorMassage.text("Can't be zero");
    } else {
      errorMassage.text("");
      const billValue = +billInput.val();
      const numberOfPeopleValue = +numberOfPeople.val();
      const tipPerson = (billValue * (tipValue / 100)) / numberOfPeopleValue;
      const totalPerson = billValue + tipPerson * numberOfPeopleValue;
      tipEachPerson.text(`$${tipPerson.toFixed(2)}`);
      totalEachPerson.text(`$${(totalPerson / numberOfPeopleValue).toFixed(2)}`);
    }
  };

  //Events:
  tipPercentBtns.forEach((button, index) => {
    if (button.type === "button") {
      $(button).on("click", () => {
        const tip = +$(button).val();
        tipCalc(tip);
      });
    } else {
      $(button).on("keyup", () => {
        const tip = +$(button).val();
        tipCalc(tip);
      });
    }
  });

  resetBtn.on("click", () => {
    tipEachPerson.text("$0.00");
    totalEachPerson.text("$0.00");
    errorMassage.text("");
  });
});
