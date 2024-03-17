const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
    await page.goto('http://127.0.0.1:5500/index.html');
});

test('add single meal', async ({ page }) => {
    // skriv monday i prompt
    page.on('dialog', async dialog => {
        await dialog.accept('monday');
    });

    await page.click('#appetizers');
    await page.selectOption('#appetizers', 'Bruschetta');
    await page.click('#addMealToListButton');

    await page.waitForSelector('.foodListinfo');
    const mealListText = await page.textContent('.foodListinfo');
    expect(mealListText).toContain('Bruschetta');
});

test('add three meals', async ({ page }) => {

    page.on('dialog', async dialog => {
        await dialog.accept('monday');
    });

    await page.selectOption('#appetizers', 'Bruschetta');
    await page.click('#addMealToListButton');
    await page.selectOption('#mainCourse', 'Palt');
    await page.click('#addMealToListButton');
    await page.selectOption('#dessert', 'Baklava');
    await page.click('#addMealToListButton');

    await page.waitForSelector('.foodListinfo');
    const mealListText = await page.textContent('.foodListinfo');
    expect(mealListText).toContain('Bruschetta');
    expect(mealListText).toContain('Palt');
    expect(mealListText).toContain('Baklava');
});

test('delete list', async ({ page }) => {
    page.on('dialog', async dialog => {
        await dialog.accept('monday');
    });
    await page.selectOption('#appetizers', 'Bruschetta');
    await page.click('#addMealToListButton');
    await page.click('#deleteAllMealsButton');
    await page.waitForSelector('.foodListinfo', { state: 'hidden' });
    const mealList = await page.$('.foodListinfo');
    expect(mealList).toBeNull();
});