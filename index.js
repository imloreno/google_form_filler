const { FileParser } = require("./src/services/FileParser");
const { NavigatorService } = require("./src/services/NavigatorService");
const { QuestionService } = require("./src/services/QuestionService");

const main = async () => {
  // Configuration variables
  const formLink = "https://forms.gle/5JuGBYZzYkWhe7vG9";
  const filePath =
    "E:/Programming/nodejs/tests/google_form_filler/src/assets/formTest.json";

  // Variables
  let questionPages;

  // Parse the questions from the file
  const fileParser = new FileParser(filePath);
  questionPages = fileParser.parseFileContent();

  // Process the questions
  const questionService = new QuestionService(questionPages);

  // Open the form
  const navigatorService = new NavigatorService(formLink);
  await navigatorService.openPage();
  await navigatorService.goToPage();
  await navigatorService.waitForPageIsLoaded();
  await navigatorService.waitForTimeout(100);

  // Loop through the pages and interact with the form
  for (let i = 0; i < questionService.getPages().length; i++) {
    // Filling each questions
    for (const question of questionService.getCurrentQuestions()) {
      let answer = question.processAnswer();
      switch (question.getType()) {
        case "radio":
          await navigatorService.click(answer.identifier);
          break;
        case "text":
          await navigatorService.fillInput(answer.identifier, answer.value);
          break;
        default:
          console.log("Invalid question type");
          break;
      }
      await navigatorService.waitForTimeout(500);
    }

    //Set the next page
    if (questionService.nextPage()) {
      await navigatorService.click("span.l4V7wb.Fxmcue >> text=Siguiente");
      await navigatorService.waitForTimeout(1000);
      console.log("Going to the next page");
    } else {
      await navigatorService.click("span.l4V7wb.Fxmcue >> text=Enviar");
      await navigatorService.waitForTimeout(1000);
      await navigatorService.closePage();
      console.log("Finished filling the form");
      break;
    }
  }
};

main();
