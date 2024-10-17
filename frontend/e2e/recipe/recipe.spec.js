const { test, expect } = require("@playwright/test");
require("dotenv").config();

export const homepage = process.env.BASE_URL;

const now = new Date();
const date = now.toLocaleString("pt-BR", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

let user = {
  name: `receita-${date}`,
  login: `receita-${date}`,
  password: `receita-${date}`,
};

async function logIn(page) {
  const logoutButton = page.locator(".logout-btn");
  await page.waitForSelector(".logout-btn", { timeout: 2000 }).catch(() => {
    // skip
  });

  if (await logoutButton.isVisible()) {
    await logoutButton.click();
  }

  await page.waitForSelector(".input-field[placeholder='Login']", {
    state: "visible",
    timeout: 5000,
  });
  await page.waitForSelector(".input-field[placeholder='Senha']", {
    state: "visible",
    timeout: 5000,
  });

  await page.fill(".input-field[placeholder='Login']", user.login);
  await page.fill(".input-field[placeholder='Senha']", user.password);
  await page.click(".auth-button");
}

test.describe("Receitas", () => {
  let page;
  let context;

  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();

    await page.goto(homepage);
    await page.click(".form-toggle-link");

    await page.fill(".input-field[placeholder='Nome']", user.name);
    await page.fill(".input-field[placeholder='Login']", user.login);
    await page.fill(".input-field[placeholder='Senha']", user.password);
    await page.click(".auth-button");
  });

  test.beforeEach(async () => {
    await context.clearCookies();
    await logIn(page);
  });

  test("Verifica se é possível cadastrar uma nova receita", async () => {
    await page.click(".create-recipe-btn");

    await page.waitForSelector(".input-field[placeholder='Nome da Receita']", {
      state: "visible",
    });

    await page.fill(
      ".input-field[placeholder='Nome da Receita']",
      "Receita Teste",
    );
    await page.fill(".input-field[placeholder='Tempo de Preparo (min)']", "20");
    await page.fill(".input-field[placeholder='Porções']", "20");
    await page.fill(
      ".input-field[placeholder='Ingredientes']",
      "Receita Teste",
    );
    await page.fill(
      ".input-field[placeholder='Modo de Preparo']",
      "Receita Teste",
    );

    await page.selectOption(".select-field", { value: "1" });
    await page.click(".submit-btn");

    await page.waitForSelector(".recipes-wrapper", {
      state: "visible",
    });

    const list = page.locator(".recipes-wrapper");
    await expect(list).toBeVisible();
  });
});
