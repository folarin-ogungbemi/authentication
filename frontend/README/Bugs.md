# Bugs and Solution

Below were some of the Bugs encounter during development and their corresponding solution.

### Error 1.

During react installation `npx create-react-app frontend --use -npm` the declaration of `@babel/plugin-proposal-private-property-in-object`
in its dependencies is missing.

- Solution
  include declaration in devDependencies by installing ..

```bash
npm install --save-dev @babel/plugin-proposal-private-property-in-object

```

### Error 2.

Attempted import error: 'Redirect' is not exported from 'react-router-dom' (imported as 'Redirect')

- Solution
  https://stackoverflow.com/questions/63690695/react-redirect-is-not-exported-from-react-router-dom
  For react-router-dom v6, simply replace Redirect with Navigate

```
import { Navigate } from 'react-router-dom';
.
{ component: () => <Navigate to="/404" /> }
```

### Error 3

- console.log
  `Uncaught Error: [PrivateRoute] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`

- Solution
  A different approach of keeping our Routes private in react-router-dom v6
  https://stackoverflow.com/questions/69864165/error-privateroute-is-not-a-route-component-all-component-children-of-rou

- utils.PrivateRoute.js

If the user is authenticated, it renders the <Outlet> component. The Outlet component acts as a placeholder that displays the nested content associated with the current route defined in the parent component.

```
import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoute = () => {
  const isAuthenticated = false;

  return !isAuthenticated ? <Navigate to="/login" /> : <Outlet />;
};

```

- App.js

The `HomePage` content is nested inside of the Content of the `PrivateRoute` such that if authenticated the outlet: HomePage content will be rendered

```
.
.
import PrivateRoute from './utils/PrivateRoute'

const App = () => {
  return(
      <Router>
        <div className='App'>
          <Header/>
          <Routes>
            <Route exact path="/" element={<PrivateRoute/>}>
              <Route exact path='/' element={<HomePage/>} />
            </Route>
            ...
          </Routes>
        </div>
    </Router>
  )}

export default App
```

### Error 4

`node_modules` files wont .gitignore

- Solution
  Git may have already cached the `node_modules` directory before it was added to `.gitignore``file. the cache has to be removed

```bash
git rm -r --cached node_modules
```
