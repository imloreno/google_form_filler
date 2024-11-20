const { FileParser } = require("./src/services/FileParser");
const { GoogleForm } = require("./src/services/GoogleForm");
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
  const googleForm = new GoogleForm(formLink);
  await googleForm.openPage();
  await googleForm.goToForm();
  await googleForm.waitForPageIsLoaded();
  await googleForm.waitForTimeout(100);

  // Loop through the pages and interact with the form
  for (let i = 0; i < questionService.getPages().length; i++) {
    // Filling each questions
    for (const question of questionService.getCurrentQuestions()) {
      let answer = question.processAnswer();
      switch (question.getType()) {
        case "radio":
          await googleForm.click(answer.identifier);
          break;
        case "text":
          await googleForm.fillInput(answer.identifier, answer.value);
          break;
        default:
          console.log("Invalid question type");
          break;
      }
      await googleForm.waitForTimeout(500);
    }

    //Set the next page
    if (questionService.nextPage()) {
      await googleForm.click("span.l4V7wb.Fxmcue >> text=Siguiente");
      await googleForm.waitForTimeout(1000);
      console.log("Going to the next page");
    } else {
      await googleForm.click("span.l4V7wb.Fxmcue >> text=Enviar");
      await googleForm.waitForTimeout(1000);
      await googleForm.closePage();
      console.log("Finished filling the form");
      break;
    }
  }
};

main();
