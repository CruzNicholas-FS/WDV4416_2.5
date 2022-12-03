const { Builder, By, Key, until } = require("selenium-webdriver");
require("dotenv").config();

describe("", () => {
  let driver;

  beforeAll(async () => {
    driver = await new Builder().forBrowser("chrome").build();
    await driver.manage().window().maximize();
  });

  afterAll(async () => {
    await driver.quit();
  });

  const setDelay = async () => {
    await driver.sleep(1000);
  };

  it("As a user I want to open WDV4416 website Home page", async () => {
    await driver.get(process.env.url);
    await driver.getTitle().then((title) => {
      expect(title).toBe("Home");
    });
    await setDelay();
  });

  it("As a user I want to navigate to the Contact page", async () => {
    await driver.get(driver.getCurrentUrl());
    await driver.findElement(By.name("contact")).click();
    await setDelay();
    //const isDisplayed = await driver.findElement(By.css("H3")).Displayed;
    //if(isDisplayed){
    //    expect(driver.getPageSource()).contains("Selenium")
    //}
    //const error = await driver.findElement(By.id("error")).getText
    //expect(error).toEqual("Error")

    await driver.wait(until.titleContains("Contact Us"), 3000);
    await driver.getTitle().then((title) => {
      expect(title).toEqual("Contact Us");
    });
    await setDelay();
  });

  it("As a user I want to signup for the newsletter and check for confirmation message", async () => {
    await driver.get(driver.getCurrentUrl());
    const element = await driver.findElement(By.id("email"));
    await element.sendKeys("nicholas@nicholas.tv", Key.TAB);
    await element.submit();
    await setDelay();

    const confirmation = await driver.findElement(By.id("message")).getText();
    expect(confirmation).toEqual("More info coming to nicholas@nicholas.tv");
    await setDelay();
  });
});
