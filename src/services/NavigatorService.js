const { random } = require("lodash");
const { chromium } = require("playwright");
require("dotenv").config();

class NavigatorService {
  navigatorLink;
  headless = process.env.ENVIRONMENT !== "dev";
  page;
  browser;

  constructor(navigatorLink) {
    this.navigatorLink = navigatorLink;
    this.browser = null; // Store the browser instance
    this.page = null; // Store the page instance
  }

  // Tabs and page management
  openPage = async () => {
    this.browser = await chromium.launch({
      headless: this.headless,
      slowMo: 100,
      args: [
        "--window-size=1000,600", // Set the window size (width, height)
        `--window-position=${random(0, 1200)},${random(0, 800)}`, // Set the window position (x, y)
      ],
    });
    this.page = await this.browser.newPage();
  };
  closePage = async () => {
    if (this.page) await this.page.close();
  };
  closeBrowser = async () => {
    if (this.browser) await this.browser.close(); // Close the browser properly
  };
  goToPage = async () => {
    await this.page.goto(this.navigatorLink);
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

  // Browser actions
  reloadPage = async () => {
    await this.page.reload();
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
  getNavigatorLink = () => {
    return this.navigatorLink;
  };
  setNavigatorLink = (navigatorLink) => {
    this.navigatorLink = navigatorLink;
  };
}

exports.NavigatorService = NavigatorService;
