const puppeteer = require("puppeteer");

describe("Test Header", () => {
  test("Test it works", () => {
    expect(4).toBeTruthy();
  });

  test("launch browser", async () => {
    const browser = await puppeteer.launch({
      headless: false,
    });
    const page = await browser.newPage();
    await page.goto("localhost:3000");
  });
});
