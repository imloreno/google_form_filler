const { FileParser } = require("./FileParser");
const { NavigatorService } = require("./NavigatorService");
const { QuestionService } = require("./QuestionService");

class GoogleFormService {
  googleFormLink;
  configurationFilePath;
  nextButton = "span.l4V7wb.Fxmcue >> text=Siguiente";
  submitButton = "span.l4V7wb.Fxmcue >> text=Enviar";
  iterations;
  // Services
  questionService;
  navigatorService;

  constructor(googleFormLink, configurationFilePath) {
    this.googleFormLink = googleFormLink;
    this.configurationFilePath = configurationFilePath;
  }

  // ------------------------------------- Methods -------------------------------------
  // Tabs and page management
  prepareNavigator = async () => {
    // Parse the questions from the file
    const fileParser = new FileParser(this.configurationFilePath);
    const { loop, pages } = fileParser.parseFileContent();
    this.iterations = loop;

    // Process the questions
    this.questionService = new QuestionService(pages);
    this.navigatorService = new NavigatorService(this.googleFormLink);
    await this.navigatorService.openPage();
    await this.navigatorService.goToPage();
    await this.navigatorService.waitForPageIsLoaded();
    await this.navigatorService.waitForTimeout(100);
  };

  // Form filling
  formFillingProcessor = async () => {
    for (let i = 0; i < this.questionService.getPages().length; i++) {
      // Filling each questions
      for (const question of this.questionService.getCurrentQuestions()) {
        let answer = question.processAnswer();
        switch (question.getType()) {
          case "radio":
            await console.log(
              "====================================================================="
            );
            await console.log("Question: ", question.getLabel());
            await this.navigatorService.click(answer.identifier);
            break;
          case "text":
            await console.log(
              "===================================================================="
            );
            await console.log("Question: ", question.getLabel());
            await this.navigatorService.fillInput(
              answer.identifier,
              answer.value
            );
            break;
          default:
            console.log("Invalid question type");
            break;
        }
        await this.navigatorService.waitForTimeout(500);
      }

      //Set the next page
      if (this.questionService.nextPage()) {
        await this.navigatorService.click(this.nextButton);
        await this.navigatorService.waitForTimeout(1000);
        await console.log("Going to the next page");
      } else {
        await this.navigatorService.click(this.submitButton);
        await this.navigatorService.waitForTimeout(5000);
        await this.navigatorService.reloadPage(); // Will reload the page to start again
        await this.navigatorService.waitForPageIsLoaded();
      }
    }
  };

  closeNavigator = async () => {
    await this.navigatorService.closePage();
    await this.navigatorService.closeBrowser();
  };

  // ------------------------------------- Getters and setters -------------------------------------
  getIterations = () => {
    return this.iterations;
  };
  setIterations = (iterations) => {
    this.iterations = iterations;
  };
}

exports.GoogleFormService = GoogleFormService;
