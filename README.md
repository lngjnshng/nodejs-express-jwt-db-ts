# nodejs-express-jwt-db-ts
A nodejs backend application providing Restful API with JWT (Json Web Token) authentication developed by TypeScript
- Express
- Sequelize
- JWT
- Sqlite Database
- Restful

## How to install
```
npm install
```
## How to run
```
npm run serve
```
## How to build
```
npm run build
```

## How to access the Restful API
You can access the Restful API with curl command or Postman or Axios, examples for curl as below:
### Register a user
```
curl --location --request POST 'http://localhost:3000/register' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "admin@demo.local",
    "password": "!DCsw23ed",
    "firstName": "Jason",
    "lastName": "Lng"
}'
```
### Login with email and password
```
curl --location --request POST 'http://localhost:3000/auth/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "username": "admin@demo.local",
    "password": "!DCsw23ed"
}'
```
### Query with token
```
curl --location --request GET 'http://localhost:3000/api/user/paginate' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjhkNTA0MmMwLTYzZDctNDlmYS04OTFjLTQ5YWRmYTFmMTc4MiIsImVtYWlsIjoiYWRtaW5AZGVtby5sb2NhbCIsImlhdCI6MTY2NDQ5NTA0NiwiZXhwIjoxNjY0NTIzODQ2fQ.Ke7H7aoVnTJNA1oKOGampOzqm35iFsQOxyq6jOlEAtQ' \
--header 'Content-Type: application/json' \
--data-raw ''
```