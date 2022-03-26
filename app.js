//[#] Advice API module
const APICtrl = (function () {
  //fetching advice
  class Advice {
    async fetchAdvice() {
      const resAdvice = await fetch("https://api.adviceslip.com/advice");
      const objAdvice = await resAdvice.json();

      return {
        data: objAdvice,
      };
    }
  }

  //public method
  return {
    //catch the fetched data
    generateAdvice: async function () {
      const advice = new Advice();
      const adviceRes = await advice.fetchAdvice();

      let adviceID = adviceRes.data.slip.id;
      let adviceQuote = adviceRes.data.slip.advice;

      //returning it as new obj
      return {
        id: adviceID,
        quote: adviceQuote,
      };
    },
  };
})();

//[#] UI Controle module
const UICtrl = (function () {
  //collection of all selectors needed
  const UISelectors = {
    btnRandomize: ".btn-randomize",
    advNum: "#adv-num",
    advQuote: "#adv",
  };

  //public method
  return {
    getSelectors: function () {
      return UISelectors;
    },
    //updating UI with new advice data
    updateAdviceUI: function (id, quote) {
      const advID = document.querySelector(UISelectors.advNum),
        advQuote = document.querySelector(UISelectors.advQuote);

      // update Id and quote advice
      advID.textContent = id;
      advQuote.textContent = quote;
    },
  };
})();

//[#] App module
const App = (function (APICtrl, UICtrl) {
  const loadEventListeners = function () {
    const UISelectors = UICtrl.getSelectors();

    //Button randomize event
    document
      .querySelector(UISelectors.btnRandomize)
      .addEventListener("click", randomize);
  };

  //randomize function
  const randomize = async function (e) {
    const theAdvice = await APICtrl.generateAdvice();

    UICtrl.updateAdviceUI(theAdvice.id, theAdvice.quote);

    e.preventDefault();
  };

  //public method
  return {
    init: function () {
      loadEventListeners();
    },
  };
})(APICtrl, UICtrl);

//Initialize App ....
App.init();
