# Setting up a new React+Redux+Firebase admin and public site

Use this as a template for react+firebase admin and public sites

Admin site uses
- [react-admin](https://github.com/marmelab/react-admin)
- Fork of [react-admin-firebase](https://github.com/benwinding/react-admin-firebase)

Public site uses
- [react-redux](https://github.com/reduxjs/react-redux)
- [react-redux-firebase](https://github.com/prescottprue/react-redux-firebase)

Demo content is in the `yakilla-staging` project. This may be deleted at any time if needed for Yakilla.


## Domain name

Register domain name, no hosting required but do need DNS management.

Create project at Firebase.

Add Authentication method (email). 
Add self as user.

Add Firebase Firestore database.
Set rules for public read and auth write.
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read
      allow write: if request.auth != null
    }
  }
}
```

Add Firebase Storage if required.
Set rules for read and auth write.
```
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

Add Firebase hosting.
Install Firebase CLI if not already installed (follow instructions when prompted during hosting setup).
Add multiple sites for admin and public sites, 
(eg `projectname-admin.web.app` & `projectname-site.web.app`).

Create custom domains for firebase sites. Requires verifying domain ownership by adding a DNS TXT record that Firebase provides, and then add A records for the domains projectname.com.au, `www.projectname.com.au` and `admin.projectname.com.au`.



## Build the admin site

Set up project and install modules.
```
npx create-react-app projectname-admin
cd projectname-admin
yarn add firebase react-admin ra-input-rich-text validator uri-js
```

We'll use my forked version of react-admin-firebase which saves files with filenames rather than by index number.
```
yarn add https://github.com/benfoley/react-admin-firebase.git
cd ./node_modules/react-admin-firebase && npm install && npm run build
cd ../../
```

Go to Firebase > `Project settings`
Add a "web app" and copy the firebase config details into a new file in the react project `.env`. Use the following format, capitalise keys and prefix with REACT_APP_. See `.env.example` in the demo project.

```
REACT_APP_API_KEY=key
REACT_APP_AUTH_DOMAIN=projectname.firebaseapp.com
REACT_APP_DATABASE_URL=https://projectname.firebaseio.com
REACT_APP_PROJECT_ID=projectname
REACT_APP_STORAGE_BUCKET=projectname.appspot.com
REACT_APP_MESSAGING_SENDER_ID=id
REACT_APP_APP_ID=1:id:web:id
```

Exclude `envs` in `gitignore`

Add Firebase for deploying 
```
firebase login
firebase init
```

- Choose Hosting
- Choose use existing project
- Use `build` as the public dir
- Choose to make as a single page app `Yes`

Add the site as a hosting target 
```
firebase target:apply hosting admin projectname-admin
```

Edit `firebase.json`, wrap the `hosting` value in an array and add` "target": "admin"` property.

Add yarn deploy step to packjage.json

    "predeploy": "yarn build",
    "deploy": "firebase deploy --only hosting:admin"

Add node src path to `.env` (this will need to change someday).
```
NODE_PATH=src/
```

Test with `yarn start`

Deploy with `yarn deploy`

Now customise site for content. 
Change details in index.html, manifest.json, favicon, icons
Delete App.css, App.test.js, logo.svg, serviceWorker.js, setupTests.js from src
Remove serviceworker import and unregister from src/index.js

Create Dashboard.js component, use material-ui/core/Card for layout

Create components for each collection to work with, eg Page.

App.js
- Import react-admin and react-admin-firebase components
- Import Dashboard and collection type components
- Add firebase config, using .env vars
- Set up FirebaseDataProvider and FirebaseAuthProvider
- Replace App div with Admin component
- Add authProvider, dataProvider, dashboard as props of Admin 
- Add Resources as children of Admin, one resource for each collection. Resource name is the name of the collection.




## Build the public site

Set up project and install modules.
```
cd ..
npx create-react-app projectname-site
cd projectname-site
yarn add date-fns firebase html-react-parser react-lazyload react-linkify react-redux react-redux-firebase react-router-dom redux redux-firestore redux-thunk semantic-ui-css semantic-ui-react object-hash react-truncate 
```

Add firebase config info and node src path to `.env` (see admin info above for details, and `.env.example`).
Exclude `envs` in `gitignore`.

Add Firebase for deploying with `firebase init`
- Choose Hosting
- Choose use existing project
- Use `build` as the public dir
- Choose to make as a single page app `Yes`

Add the site as a hosting target 
```
firebase target:apply hosting site projectname-site
```

Edit `firebase.json`, wrap the `hosting` value in an array and add` "target": "site"` property.

Add yarn deploy step to packjage.json

    "predeploy": "yarn build",
    "deploy": "firebase deploy --only hosting:site"

Test with `yarn start`

Deploy with `yarn deploy`

Now customise site for content. 
Change details in index.html, manifest.json, favicon, icons
Delete App.css, App.test.js, logo.svg, serviceWorker.js, setupTests.js from src
Remove serviceworker import and unregister from src/index.js



index.js 
- Import react-router-router BrowserRouter module
- import redux, react-redux, react-redux-firebase and redux-firestore modules
- Import firebase, auth and firestore
- Import semantic-ui css
- Add firebase config using .env values
- Initialise firebase and firestore
- Add react-redux-firestore config
- Wrap the App in BrowserRouter, ReactReduxFirebaseProvider and redux Provider.
- Remove StrictMode 

App.js
- Import home, list and single components
- Add Routes for home, content lists and content single pages

Components/NavBar.js
- Simple nav using semantic-ui, add menu items as NavLink for each list page

Components/Home.js
- Just a simple component with nav and home page content

Components/PagesList.js
- Get data from Firestore with useFirestoreConnect & useSelector
- Sorting is done using useEffect and changing a sortOrder value 

Components/Page.js
- Get the resource name from the URL params
- Get data from Firestore using query where name == ..


## Improvements (see Yakilla for examples)

- Auto links in content (shouldn't be needed if using react-admin rich text)
- List content search/ filters using selects
- Add truncation for info content
- Export as csv?



