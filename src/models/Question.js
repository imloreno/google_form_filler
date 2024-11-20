const { random, sample } = require("lodash");

class Question {
  label;
  type;
  options = [];

  constructor(label, type, options) {
    this.label = label;
    this.type = type;
    this.options = options;
  }

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

class RadioButtonQuestion extends Question {
  constructor(label, type, options) {
    super(label, type, options);
  }

  // ----------------------------------- Methods

  // This function will return the identifier to click on the form
  processAnswer = () => {
    const randomNumber = random(0, 100);
    const optionSelected = this.options.find(
      (option) =>
        randomNumber >= option.odds[0] && randomNumber <= option.odds[1]
    );
    return {
      type: this.type,
      identifier: optionSelected.identifier,
    };
  };
}

class TextQuestion extends Question {
  identifier;
  constructor(label, type, options, identifier) {
    super(label, type, options);
    this.identifier = identifier;
  }

  // ----------------------------------- Methods

  // This function will return the text and the identifier to fill the form
  processAnswer = () => {
    const randomNumber = random(0, 100);
    const optionSelected = this.options.find(
      (option) =>
        randomNumber >= option.odds[0] && randomNumber <= option.odds[1]
    );
    return {
      type: this.type,
      identifier: this.identifier,
      value: sample(optionSelected.labels),
    };
  };

  // ----------------------------------- Getters and setters
  getIdentifier = () => {
    return this.identifier;
  };
  setIdentifier = (identifier) => {
    this.identifier = identifier;
  };
}

exports.Question = Question;
exports.RadioButtonQuestion = RadioButtonQuestion;
exports.TextQuestion = TextQuestion;
