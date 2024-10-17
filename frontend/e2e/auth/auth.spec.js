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
  name: `auth-${date}`,
  login: `auth-${date}`,
  password: `auth-${date}`,
};

test.describe("AuthForm", () => {
  test.beforeEach(async ({ context }) => {
    await context.clearCookies();
  });

  test("Verifica se existe o formulário de autenticação", async ({ page }) => {
    await page.goto(homepage);
    const form = page.locator(".login");
    await expect(form).toBeVisible();
  });

  test("Verifica se é possível registrar um usuário e fazer login", async ({
    page,
  }) => {
    await page.goto(homepage);

    await page.click(".form-toggle-link");

    await page.fill(".input-field[placeholder='Nome']", user.name);
    await page.fill(".input-field[placeholder='Login']", user.login);
    await page.fill(".input-field[placeholder='Senha']", user.password);

    await page.click(".auth-button");

    await page.waitForSelector(".recipes-wrapper", {
      state: "visible",
    });

    const successMessage = page.locator(".recipes-wrapper");
    await expect(successMessage).toBeVisible();

    const logoutBtn = page.locator(".logout-btn");
    await expect(logoutBtn).toBeVisible();

    await page.click(".logout-btn");

    await page.waitForSelector(".input-field[placeholder='Login']", {
      state: "visible",
    });

    await page.fill(".input-field[placeholder='Login']", user.login);
    await page.fill(".input-field[placeholder='Senha']", user.password);

    await page.click(".auth-button");

    await expect(successMessage).toBeVisible();

    await expect(logoutBtn).toBeVisible();
  });
});
