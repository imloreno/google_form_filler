const { delay } = require("lodash");
const { chromium } = require("playwright");
require("dotenv").config();

class GoogleForm {
  formLink;
  headless = process.env.PWDEBUG !== "1";
  page;
  browser;

  constructor(formLink) {
    this.formLink = formLink;
    this.headless = process.env.PWDEBUG !== "1";
    this.browser = null; // Store the browser instance
    this.page = null; // Store the page instance
  }

  // Tabs and page management
  openPage = async () => {
    this.browser = await chromium.launch({
      headless: this.headless,
      slowMo: 100,
    });
    this.page = await this.browser.newPage();
  };
  closePage = async () => {
    if (this.page) await this.page.close();
    if (this.browser) await this.browser.close(); // Close the browser properly
  };
  goToForm = async () => {
    await this.page.goto(this.formLink);
  };
  waitForTimeout = async (time) => {
    await this.page.waitForTimeout(time);
  };
  waitForPageIsLoaded = async () => {
    await this.page.waitForLoadState("load");
  };
  scrollToElement = async (identifier) => {
    const elementHandle = await this.page.$(identifier); // Get the element handle
    if (!elementHandle) throw new Error(`Element not found: ${identifier}`);

    // Scroll the element into view and center it
    await elementHandle.evaluate((el) => {
      el.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    });
  };

  // Form filling
  click = async (identifier) => {
    console.log(`Clicking on input [ ${identifier} ]`);
    this.scrollToElement(identifier);
    await this.page.click(identifier);
  };
  fillInput = async (identifier, value) => {
    console.log(`Filling input [ ${identifier} ] with value ${value}`);
    this.scrollToElement(identifier);
    await this.page.type(identifier, value, { delay: 30 });
  };

  // Getters and setters
  getFormLink = () => {
    return this.formLink;
  };
  setFormLink = (formLink) => {
    this.formLink = formLink;
  };
}

exports.GoogleForm = GoogleForm;
