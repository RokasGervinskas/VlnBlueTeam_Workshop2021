const { test, expect } = require('@playwright/test');
const { StartPage } = require('../pages/startPage')
const { ResultsPage } = require('../pages/resultsPage')


test.describe('', () => {
  let page;
  
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    startPage = new StartPage(page);
    resultsPage = new ResultsPage(page);
  });

  test.beforeEach(async () => {
    await startPage.goto();
  });

  // TESTS STAT BELOW 
  const loginEmails = ['vytautas.cepas@sourceryacademy.com', 'rasa.sovaite@sourceryacademy.com', 'rokas.gervinskas@sourceryacademy.com', 'egle.Maksimovaite@sourceryacademy.com'];
  const teamMemberNames = ['vytautas','rasa','rokas','egle'];
  const teamMemberFullNames = ['Vytautas cepas','Rasa Sovaite','Rokas Gervinskas','Egle Maksimovaite'];
  const loginPsws = ['nera svarbus1', 'nera svarbus6', 'nera svarbus17', 'nera svarbus23'];

  loginEmails.forEach(emailOption => {
    test.only(`Check if works correctly with email ${emailOption} `, async () => {
    // Go to https://lunch.devbstaging.com/login-password
 
    // Click [aria-label="Email"]
    await page.click('[aria-label="Email"]'); 
    // Fill [aria-label="Email"]
    await page.fill('[aria-label="Email"]', emailOption);
    // Click [aria-label="Password"]
    await page.click('[aria-label="Password"]');
    // Fill [aria-label="Password"]
    const loginIndex = loginEmails.indexOf(emailOption);
    await page.fill('[aria-label="Password"]', loginPsws[loginIndex]);


    // Click button:has-text("Login")
    await Promise.all([
      page.waitForNavigation(/*{ url: 'https://lunch.devbstaging.com/dishes/monday/Talutti' }*/),
      page.click('button:has-text("Login")')
    ]);
          // PO SITU GALIMA DARYTI

    // Click main >> text=Cili
    await page.click('main >> text=Cili');
    // Click button:has-text("0.00 €send")
    
    await page.click('button:has-text("0.00 €send")' || 'button:has-text("4.00 €send")');

    const cheking = await page.isDisabled('#app > div.application--wrap > div > nav > div > div.d-flex.align-center > div.layout > div > span:nth-child(2) > span > button');
    if (!cheking) {
      await page.click('button:has-text("4.00 €send")');
    }

    const sendOrder = await page.isDisabled('#app > div.application--wrap > div > nav > div > div.d-flex.align-center > div.layout > div > span:nth-child(2) > span > button');
    expect(sendOrder).toBe(true);

    });
  });


});