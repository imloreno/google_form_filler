const { random, sample } = require("lodash");

export class QuestionService {
  questions;

  constructor(questions) {
    this.questions = questions;
  }
}

export class Question {
  label;
  type;
  options = [];

  constructor(label, type, options) {
    this.label = label;
    this.type = type;
    this.options = options;
  }

  // ----------------------------------- Methods

  processAnswer() {
    switch (this.type) {
      case "radio":
        return this.#processRadioAnswer();
      case "text":
        return this.#processTextAnswer();
      default:
        return;
    }
  }

  // This function will return the identifier to click on the form
  #processRadioAnswer = (answer) => {
    const random = random(0, 100);
    const optionSelected = this.options.find(
      (option) => random >= option.odds[0] && random <= option.odds[1]
    );
    return optionSelected.identifier;
  };
  // This function will return the text and the identifier to fill the form
  #processTextAnswer = () => {
    const random = random(0, 100);
    const optionSelected = this.options.find(
      (option) => random >= option.odds[0] && random <= option.odds[1]
    );
    return {
      text: sample(optionSelected.labels),
      identifier: optionSelected.identifier,
    };
  };

  // ----------------------------------- Getters and setters
  getLabel = () => {
    return this.label;
  };
  setLabel = (label) => {
    this.label = label;
  };
  getType = () => {
    return this.type;
  };
  setType = (type) => {
    this.type = type;
  };
  getOptions = () => {
    return this.options;
  };
  setOptions = (options) => {
    this.options = options;
  };
}
