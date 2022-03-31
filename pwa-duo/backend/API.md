> ### **POST** *http://localhost:5000/api/auth/register*

<br> 

**Body** 
```JSON
{
  "email": "john@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "dob": "2001-05-06",
  "password": "password",
  "confirmPassword": "password"
}
```

> ### **POST** *http://localhost:5000/api/auth/login*

<br>

**Body**
```JSON
{
  "email": "john@example.com",
  "password": "password"
}
```

> ### **POST** *http://localhost:5000/api/concert/create*

<br>

**Body**
```JSON
{
  "name": "Funny Beans",
  "logoURL": "https://upload.wikimedia.org/wikipedia/commons/7/7e/Microsoft_Edge_logo_%282019%29.png",
  "date": "2022-03-28",
  "location":"Rachelsmolen 1, 5612 MA Eindhoven"
}
```

> ### **POST** *http://localhost:5000/api/concert/ticketBuy*

<br>

**Body**
```JSON
{
  "cid": "Concert ID",
  "row": "1",
  "seat": "10"
}
```

 ### **GET** *http://localhost:5000/api/concert/tickets*

<br>

Gets the list of user tickets. This is per user ticket request, it cannot be used to view other users tickets