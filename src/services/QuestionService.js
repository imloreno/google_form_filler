const { cloneDeep } = require("lodash");
const { RadioButtonQuestion, TextQuestion } = require("../models/Question");

class QuestionService {
  pages = [];
  pageSelected = 0;

  constructor(pages) {
    this.pageSelected = 0;
    this.pages = pages;
  }

  // ----------------------------------- Loop through
  nextPage = () => {
    const nextPage = this.pages[this.pageSelected + 1];
    // In case there are no more pages, we return null
    if (!nextPage) {
      this.resetPageSelected();
      return null;
    }
    this.pageSelected++;
    return nextPage;
  };
  getCurrentPage = () => {
    return cloneDeep(this.pages[this.pageSelected]);
  };
  getCurrentQuestions = () => {
    return this.pages[this.pageSelected].map(
      ({ label, type, options, identifier }) => {
        switch (type) {
          case "radio":
            return new RadioButtonQuestion(label, type, options);
          case "text":
            return new TextQuestion(label, type, options, identifier);
          default:
            return;
        }
      }
    );
  };

  // ----------------------------------- Getters and setters
  resetPageSelected = () => {
    this.pageSelected = 0;
  };
  setPages = (pages) => {
    this.pages = pages;
  };
  getPages = () => {
    return this.pages;
  };
}

exports.QuestionService = QuestionService;
