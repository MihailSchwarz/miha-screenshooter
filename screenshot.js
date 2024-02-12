const fs = require("fs");
const { firefox } = require("playwright");
const crypto = require("crypto");

// URL до папки с файлами wordpress
const WpContentFolder = "http://yandex.ru/wp-content/uploads/2024/02/";

(async () => {
  const dir = "./images";
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const urls = fs
    .readFileSync("links.txt", "utf-8")
    .split("\n")
    .filter(Boolean);
  const browser = await firefox.launch({ headless: false }); // Запуск Firefox в не-headless режиме
  let filesList = "";

  for (let i = 0; i < urls.length; i++) {
    const page = await browser.newPage();
    await page.setViewportSize({ width: 1200, height: 800 });
    try {
      // Установка таймаута для загрузки страницы и переход с ожиданием до 30 секунд
      await page
        .goto(urls[i], { waitUntil: "networkidle", timeout: 10000 })
        .catch((e) =>
          console.log(
            `Превышено время ожидания загрузки для ${urls[i]}: ${e.message}`
          )
        );
      const hash = crypto.createHash("sha256").update(urls[i]).digest("hex");
      const filename = `${hash}.jpg`;
      await page.screenshot({
        path: `./images/${filename}`,
        quality: 65,
        type: "jpeg",
      });
      console.log(`Скриншот для ${urls[i]} сохранен как ${filename}`);
      filesList += `${WpContentFolder}${filename}\n`;
    } catch (error) {
      console.error(`Ошибка при создании скриншота для ${urls[i]}: ${error}`);
      filesList += `0\n`; // Добавляем 0 в случае ошибки
    }
    await page.close();
  }

  await browser.close();
  fs.writeFileSync("files.txt", filesList.trim());
  console.log("Все скриншоты созданы и список файлов сохранен в files.txt");
})();
