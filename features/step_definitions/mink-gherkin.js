/* eslint-disable import/no-extraneous-dependencies */
const cucumber = require('@cucumber/cucumber');
const { After, Status } = require('@cucumber/cucumber');
const mink = require('cucumber-mink');
const Promise = require('bluebird');

const customSteps = [
  {
    pattern: /^(?:|I )hard click on "([^"]*)"/,
    async callback(value) {
      const inputSelector = this.mink.getSelector(value);
      const inputHandle = await this.mink.page.$(inputSelector);
      await inputHandle.evaluate(b => b.click());
      return inputHandle.dispose();
    },
  },
  {
    pattern: /^(?:|I )enter "([^"]*)" into the homepage agency search box/,
    async callback(value) {
      const inputSelector = this.mink.getSelector('the homepage search box');
      const inputHandle = await this.mink.page.$(inputSelector);
      await inputHandle.type(value);
      await Promise.delay(1 * 1000);
      await inputHandle.press('Enter');
      await Promise.delay(1 * 1000);
      return inputHandle.dispose();
    },
  },
  {
    pattern: /^(?:|I )enter "([^"]*)" into the annual report agency search box/,
    async callback(value) {
      const inputSelector = this.mink.getSelector('the annual report search box');
      const inputHandle = await this.mink.page.$(inputSelector);
      await inputHandle.type(value);
      await Promise.delay(1 * 1000);
      await inputHandle.press('Enter');
      await Promise.delay(1 * 1000);
      return inputHandle.dispose();
    },
  },
  {
    pattern: /^(?:|I )enter "([^"]*)" into the agency search box/,
    async callback(value) {
      const inputSelector = this.mink.getSelector('the agency search box');
      const inputHandle = await this.mink.page.$(inputSelector);
      await inputHandle.type(value);
      await Promise.delay(1 * 1000);
      await inputHandle.press('Enter');
      await Promise.delay(1 * 1000);
      return inputHandle.dispose();
    },
  },
  {
    pattern: /^(?:|I )check the box for the year "([^"]*)"/,
    async callback(value) {
      const inputSelector = `input[name="${value}"]`;
      const inputHandle = await this.mink.page.$(inputSelector);
      await Promise.delay(1 * 1000);
      await inputHandle.evaluate(b => b.click());
      return inputHandle.dispose();
    },
  },
  {
    pattern: /^(?:|I )select the radio option for the answer "([^"]*)"/,
    async callback(value) {
      const inputSelector = `input:has(+ label[text="${value}"])`;
      const inputHandle = await this.mink.page.$(inputSelector);
      await Promise.delay(1 * 1000);
      await inputHandle.evaluate(b => b.click());
      return inputHandle.dispose();
    },
  },
  {
    pattern: /^(?:|I )choose "([^"]*)" from the data type dropdown/,
    async callback(value) {
      const inputSelector = this.mink.getSelector('the data type dropdown');
      console.log(`Field: ${inputSelector} \n`);
      const inputHandle = await this.mink.page.$(inputSelector);
      await inputHandle.type(value);
      return inputHandle.dispose();
    },
  },
];
After((testCase) => {
  if (testCase.result.status === Status.FAILED) {
    console.log(`FAILED: ${testCase.pickle.name}`);
    console.log(`PAGE: ${testCase.pickle.uri}`);
    console.log(`MESSAGE: ${testCase.result.message}`);
  }
});

customSteps.forEach((step) => {
  cucumber.Given(step.pattern, step.callback);
});

mink.gherkin(cucumber);
