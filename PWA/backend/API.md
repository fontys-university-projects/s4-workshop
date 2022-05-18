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
  "password": "password",
}
``` 

> ### **GET** *http://localhost:5000/api/auth/status*

<br>

**Header**
```Authorization Barer```

Returns the user Authentication status

**Body**
```JSON
{
  "email": "john@example.com",
  "password": "password"
}
```

> ### **GET** *http://localhost:5000/api/concert/concerts*

<br>

**Header**
```Authorization Barer```

Gets the list of concerts filtered from current date onwards.

> ### **POST** *http://localhost:5000/api/concert/ticketBuy*

<br>

**Header**
```Authorization Barer```

**Body**
```JSON
{
  "cid": "Concert ID",
  "row": "1",
  "seat": "10"
}
```

> ### **GET** *http://localhost:5000/api/concert/tickets*

<br>

**Header**
```Authorization Barer```

Gets the list of user tickets filtered from current date onwards. This is per user ticket request, it cannot be used to view other users tickets.

> ### **GET** *http://localhost:5000/api/concert/allTickets*

<br>

**Header**
```Authorization Barer```

Shows all tickets even expired, but it does not show the ticket IDs

> ### **POST** *http://localhost:5000/api/dashboard/create*

<br>

**Header**
```Authorization Barer```

**Permissions**
`PARTNER`

**Body**
```JSON
{
  "name": "Funny Beans",
  "logoURL": "https://upload.wikimedia.org/wikipedia/commons/7/7e/Microsoft_Edge_logo_%282019%29.png",
  "description": "lorem ipsum",
  "date": "2022-03-28",
  "time": "16:20:00",
  "location":"Rachelsmolen 1, 5612 MA Eindhoven"
}
```

Small note, the date and time is universally converted so type in your own timezone time

> ### **GET** *http://localhost:5000/api/dashboard/concerts*

<br>

**Header**
```Authorization Barer```

**Permissions**
`PARTNER`

Shows every concert the owner has created so far

> ### **GET** *http://localhost:5000/api/dashboard/tickets*

<br>

**Header**
```Authorization Barer```

**Permissions**
`PARTNER`

Shows every ticket purchased for all of the user's concerts

> ### **GET** *http://localhost:5000/api/dashboard/scan-ticket*

<br>

**Header**
```Authorization Barer```

**Query**
```ticket``` = ```id```

**Permissions**
`CHECKUP`

Displays ticket information for the check up line