# express-auth-file

Сервис REST API взаимодействие авторизованными пользователями с их файлами. <br>
Стек: ExpressJS, Mysql + ORM Sequelize, JWT.<br>

## Установка и запуск проекта
`git clone https://github.com/woodjs/express-auth-file.git`<br><br>
` cd express-auth-file`<br>
<br>
Измените учетные данные базы данных MySQL в `.env`<br><br>
` npm install`<br><br>
` npm start`<br>
<br>
Порт по умолчанию: 8080<br>
url: http://localhost:8080/api

## Примеры

### Регистрация
- POST /api/signup
![image](https://user-images.githubusercontent.com/45289944/162497987-81a57bd9-2f51-446d-bc43-7929d6a4e8ca.png)


### Авторизация
- POST /api/signin
![image](https://user-images.githubusercontent.com/45289944/162498134-04a42296-7df0-4f19-8dfe-24df784e8ea6.png)

### Обновление токенов
- POST /api/signin/new_token
- BODY { refreshToken }
![image](https://user-images.githubusercontent.com/45289944/162498639-0113068d-47c0-4bd2-ba9f-8eadfa8f6959.png)

### Информация о пользователе
- GET /api/info
- Header заголовки: "Authorization: Bearer accessToken"
![image](https://user-images.githubusercontent.com/45289944/162498812-d6f8d07c-6a8c-484e-a329-e82abd9b73be.png)

### Загрузка файла
- POST /api/file/upload
- Header заголовки: "Authorization: Bearer accessToken"
- Form-Data: file
![image](https://user-images.githubusercontent.com/45289944/162499259-53afc006-1b16-4655-94ec-a905ace8a8d1.png)

### Получение данных файлов с пагинацией
- GET /api/file/list
- Query: list_size, page
- Header заголовки: "Authorization: Bearer accessToken"
![image](https://user-images.githubusercontent.com/45289944/162499597-25d2dc65-c119-4d5d-bf82-6a39159583f6.png)
![image](https://user-images.githubusercontent.com/45289944/162499633-844c64b5-3a03-4ddb-8231-6df73776b810.png)
![image](https://user-images.githubusercontent.com/45289944/162499657-1fad9200-3033-4c51-b557-a555b0a9609c.png)

### Получение информации о файле
- GET /api/file/:id
- Header заголовки: "Authorization: Bearer accessToken"
![image](https://user-images.githubusercontent.com/45289944/162499744-051e6bb2-c149-4ed6-9547-fe7258a76974.png)

### Скачивание файла
- GET /api/file/download/:id
- Header заголовки: "Authorization: Bearer accessToken"
![image](https://user-images.githubusercontent.com/45289944/162499860-3599a90e-96d3-4356-9fba-1ca9627cc891.png)

### Обновление файла
- PUT /api/file/update/:id
- Header заголовки: "Authorization: Bearer accessToken"
- Form-Data: file
![image](https://user-images.githubusercontent.com/45289944/162500145-af4d50b8-9f80-4583-bbfe-780a9ac177b2.png)
![image](https://user-images.githubusercontent.com/45289944/162500186-ffb96236-b7cb-4d41-a8ae-fceebe9eb793.png)





