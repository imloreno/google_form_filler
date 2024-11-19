const { chromium } = require("playwright");

export class GoogleForm {
  formLink;
  page;

  constructor(formLink) {
    this.formLink = formLink;
  }

  // Tabs and page management
  openPage = async () => {
    const browser = await chromium.launch({ headless: false });
    page = await browser.newPage();
  };
  closePage = async () => {
    await page.close();
  };
  goToForm = async () => {
    await page.goto(this.formLink);
  };
  waitForTimeout = async (time) => {
    await page.waitForTimeout(time);
  };

  // Form filling
  clickOnInput = async (identifier) => {
    await page.click(identifier);
  };
  fillInput = async (identifier, value) => {
    await page.fill(identifier, value);
  };

  // Getters and setters
  getFormLink = () => {
    return this.formLink;
  };
  setFormLink = (formLink) => {
    this.formLink = formLink;
  };
}
