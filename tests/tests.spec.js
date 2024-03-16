const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
    await page.goto('http://127.0.0.1:5500/index.html');
});

test('add single meal', async ({ page }) => {
   
    await page.click('#appetizers');
   
    await page.selectOption('#appetizers', 'Bruschetta'); // Replace 'Appetizer 1' with the actual option value
   
    await page.click('#addMealToListButton');
   
    await expect(page).toHaveText('Måndag', 'Bruschetta');
});

test('add three meals', async ({ page }) => {
    
    await page.selectOption('#appetizers', 'Bruschetta'); 
    await page.click('#addMealToListButton');
    await page.selectOption('#mainCourse', 'Palt'); 
    await page.click('#addMealToListButton');
    await page.selectOption('#dessert', 'Baklava'); 
    await page.click('#addMealToListButton');
   
    await expect(page).toHaveText('Tisdag', 'Bruschetta');
    await expect(page).toHaveText('Tisdag', 'Palt');
    await expect(page).toHaveText('Tisdag', 'Baklava');
});

test('delete list', async ({ page }) => {
 
    await page.selectOption('#appetizers', 'Bruschetta'); 
    await page.click('#addMealToListButton');
    
    await page.click('#deleteAllMealsButton');
  
    await expect(page).not.toHaveSelector('.mealName');
});