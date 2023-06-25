# Project Setup

## Components

The Component created for the setup of this project is relatively basic

- Create a Component Folder called `pages`
- within the pages folder create `HomePage.js` and `LoginPage.js`

- Create a Component Folder called `component`
- within the pages folder create `Header.js`

---

- src.components.Header.js

rafce

```
import { Link } from 'react-router-dom'

return(
    <div>
        <Link to="/" >Home</Link>
        <Link to="/login" >Login</Link>
    </div>
)

```

- src.pages.HomePage.js

rafce

```
return(
    <div>
        <p>Welcome Page!</p>
    </div>
)

```

- src.pages.LoginPage.js

rafce

```
return(
    <div>
        <form>
            <input type="text" name="username" placeholder="Enter Username" />
            <input type="password" name="password" placeholder="Enter Password" />
            <input type="submit"/>
        </form>
    </div>
)

```

- src.App.js

we are going to use react router to route through the pages of our application
and be able to link to them.

https://reactrouter.com/en/main/router-components/browser-router

```bash
npm install react-router-dom
```

```
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import Header from './components/Header'

return(
    <Router>
        <div className="App">
            <Header />
            <Routes>
                <Route path="/" exact element={<HomePage/>}>
                <Route path="/login" exact element={<LoginPage/>}>
            </Routes>
        </div>
     </Router>
)

```

### Create a Private Route

- Information updated if you are using react-router-dom v6- check Bugs.md `###Error 3` for Solution

The necessity for this is to check for instance if a user is logged in and as a result display certain information based on their login status. It is done to restrict informations from a user without the access and then redirected

- Create a Component Folder called `utils`
- within the pages folder create `PrivateRoute.js`

we are passing a ...rest prop inside of the route so that all information inside of a particular route `path="/" exact element={<HomePage/>}` in our App.js will be passed to this route as `<Route path="/" exact element={<HomePage/>}>` and the user can view the page. and the children is the element in that route.

```
import React from 'react'
import {Route, Redirect} from 'react-router-dom'

const PrivateRoute = ({children, ...rest}) => {
    const isAuthenticated = false
  return (
    <div>
        <Route {...rest}> { !isAuthenticated ? <Redirect to="/login" /> : children }</Route>
    </div>
  )
}

export default PrivateRoute
```

Make `HomePage` a private route

- next we are going to use the PrivateRoute in our _App.js_ Route and **replace the homepage** route. Such that by default the content of the `homepage` is hidden except an authenticated user signs in.

```
...
import PrivateRoute from '.utils/PrivateRoute'

return(
    <Router>
        <div className="App">
            <Header />
            <Routes>
                <PrivateRoute path="/" exact element={<HomePage/>}>
                <Route path="/login" exact element={<LoginPage/>}>
            </Routes>
        </div>
     </Router>
)

```

### Setting Up AuthContext

Similarly to how Redux store works, we will be using `Context API` built in react to create a store for our user.
The `context Api` allows components to share data without passing it through many layers of other components. Any component that needs the data can simply access it from the context.

- Create a Component Folder called `context`
- within the pages folder create `AuthContext.js`

- src.context.AuthContext.js

```
import {createContext, useState, useEffect } from 'react

const AuthContext = createContext();

export default AuthContext;

```

create a provider within thesame file.

The provider will give the information to the users.
The value key holds the information we want passed through out the application.

```
export const AuthProvider = ({children}) =>{
    return(
        <AuthContext.Provider value={{'name':'Folarin'}}>
        {children}
        </AuthContenxt.Provider>
    )
}
```

- src.App.js

Here we will bring in our AuthProvider information.
Therein we can specify where the information sent by the provider to be be provided.
In our case we want it in the `Header` `HomePage` and `LoginPage` therefore we wrap it around them.

To use the value in our individual components we have to import our `AuthContext`

.
.
.
import { AuthProvider } from './context/AuthContext'

```
export const App = () =>{
    return(
        <Router>
        <AuthProvider>

            <Routes>
                <Route exact path="/" element={<PrivateRoute/>}>
                <Route exact path='/' element={<HomePage/>} />
                </Route>
                <Route exact path="/login" element={<LoginPage/>}/>
            </Routes>

        </AuthProvider>
        </Router>
    )
}
```

- components.Header

```
import {useContext} from 'react'
import AuthContext from '../context/AuthContext'

const Header = () => {
    let {name} = useContext(AuthContext)
    return(
        .
        .
        .
        .
        <p>Hello {name} </p>
    )
}
```

- src.context.AuthContext.js

  Instead of hard coding the value into the AuthProvider, we want the value to be from our backend.

```

export const AuthProvider = ({children}) =>{

    let [authTokens, setAuthTokens] = useState(null)
    let [user, setUser] = useState(null)

    let loginUser = async (e) =>{
        e.preventDefault()
        console.log('form submitted')
        let response = fetch('http://127.0.0.1:8000/api/token/',{
            method: 'POST',
            headers::{
                'content-Type': 'application/json'
            },
            body:JSON.stringify({'username':null, 'password':null})
        })
    }

    let contextData = {
        loginUser:loginUser
    }

    return(
        <AuthContext.Provider value={contextData}>
        {children}
        </AuthContenxt.Provider>
    )
}
```
