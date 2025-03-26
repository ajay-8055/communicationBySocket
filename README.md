<!-- Instructions to follow -->

STEP 1 : npm install (run this command for installation of the dependencies)

STEP 2 : npm run build (this commnads will build the readable code for machine)

STEP 3 : replace credentials in example.env file

STEP 4 : npm start (this command will start the server)

<!--  API Endpoints -->

1. Register API : 'http://localhost:5000/api/register' , Method : POST 
JSON BODY :
{
    "username":"Ramdas",
    "email":"Ramdas@gmalil.com",
    "password":"12345"
}

2. Login API : 'http://localhost:5000/api/login' , Method : POST 
JSON BODY :
{
    "email":"Ramdas@gmalil.com",
    "password":"12345"
}

3. Logout API : 'http://localhost:5000/api/logout' , Method : POST 
JSON BODY :
{
    "token": token,
}
