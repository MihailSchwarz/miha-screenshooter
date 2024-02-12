# miha-screenshooter
Делает скриншоты сайтов из списка URL

В системе должен быть установлет Node JS.

## Установка
Клонировать репо.

Установка в папке со скриптами:
```
npm i
npx playwright install
```

Перед запуском:

Список нужных URL хранятся в файле links.txt  

Подправить ссылку на папку с картинками в файле screenshot.js
```
const WpContentFolder = "http://yandex.ru/wp-content/uploads/2024/02/";
```

Запуск скрипта:
```
node screenshot
```

Все скриншоты сохранятся в папку images.

Список ссылок на скриншоты для вставки в таблицу сохраняются в links.txt.
