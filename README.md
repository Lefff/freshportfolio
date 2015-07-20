# Fresh Portfolio

> Шаблон портфолио от LoftSchool.

## Установка

0. Убедитесь что у вас установлены [Node.js](http://nodejs.org/), [npm](http://npmjs.org/) и [bower](http://bower.io.).

1. Клонируйте репозиторий

  ```sh
$ git clone https://github.com/Lefff/freshportfolio.git
  ```

2. Перейдите в папку с проектом и установите все зависимости

  ```sh
  $ npm install && bower install
  ```

3. Введите актуальную информацию, фото и наслаждайстесь.

## Использование

  ```sh
  #Запуск сборщика проекта (задача по умолчанию)
  $ gulp

  #Запуск локального сервера для разработки с отслеживанием изменений (browser sync)
  $ gulp servlive

  #Добавление путей bower зависимостей в проект
  $ gulp bowerdep
  ```