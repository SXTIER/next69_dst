const { test, expect } = require("@playwright/test");

test("course modal traps focus, closes with Escape, and returns focus", async ({ page }) => {
  await page.goto("http://localhost:3000/year/2");
  await page.waitForTimeout(500);

  const firstCourse = page.getByRole("button", { name: /ITDS 233/ }).first();
  await firstCourse.focus();
  await firstCourse.press("Enter");

  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(page.getByRole("button", { name: "ปิดรายละเอียดรายวิชา" })).toBeFocused();

  for (let index = 0; index < 12; index += 1) {
    await page.keyboard.press("Tab");
    const insideDialog = await page.evaluate(() => {
      const dialogElement = document.querySelector('[role="dialog"]');
      return Boolean(dialogElement && document.activeElement && dialogElement.contains(document.activeElement));
    });
    expect(insideDialog).toBe(true);
  }

  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(firstCourse).toBeFocused();
});
