## Информационная платформа о сериалах
Командный проект по курсу Geekbrains.<br>
Краткое описание: <br>
Сайт для быстрого нахождения интересного сериала (рейтинг топ 50 сериалов, на основании оценок пользователей). <br>
И место где можно посмотреть даты выхода новых серий, и отметить уже просмотренные сериалы, серии.

### Built With

* [React.js](https://reactjs.org/)
* [Redux Toolkit](https://redux-toolkit.js.org/)
* [Laravel](https://laravel.com)
* [Bootstrap](https://react-bootstrap.github.io/)

<p align="right">(<a href="#top">back to top</a>)</p>

## Getting Started

### Prerequisites

* PHP
* Composer
* npm
  ```sh
  npm install npm@latest -g
  ```

### Установка

1. `git clone https://github.com/vlad4400/information_platform_serials.git`
2. Создать копию .env из .env.example и обновить значения
`cp .env.example .env`
3. `composer install` optional `composer update`
4. `npm install && npm run dev` or`npm install --legacy-peer-deps && npm run dev`
5. `php artisan key:gen`
6. `php artisan serve`

### Запуск БД
1. MySQL/OpenServer
2. Создаем БД
3. .env - рописываем конфиги(название БД, пользователь, пароль)
DB_DATABASE=`название базы` <br>
DB_USERNAME=`логин` <br>
DB_PASSWORD=`пароль` <br>
4. Перезапустить сервер `php artisan serve`
5. `php artisan migrate`
6. `php artisan db:seed`


<p align="right">(<a href="#top">back to top</a>)</p>
