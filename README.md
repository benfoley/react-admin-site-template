# Setting up a new React+Redux+Firebase admin and public site

Use this as a template for react+firebase admin and public sites

Admin site uses
- [react-admin](https://github.com/marmelab/react-admin)
- Fork of [react-admin-firebase](https://github.com/benwinding/react-admin-firebase)

Public site uses
- [react-redux](https://github.com/reduxjs/react-redux)
- [react-redux-firebase](https://github.com/prescottprue/react-redux-firebase)



## Register domain name

Register the domain name the sites will use. No hosting plan is required becasue we will use Firebase hosting but will need DNS management to set up custom DNS pointing the domain to firebase. More info about this later, after we set up the Firebase hosting targets.


## Build the admin site

Set up a React project and install required modules. Replace projectname with your project name. 
```
cd ~/sandbox
npx create-react-app projectname-admin
cd projectname-admin
yarn add firebase react-admin react-admin-firebase ra-input-rich-text validator uri-js
```

## Firebase 

### New project

Open the [Firebase website](https://console.firebase.google.com/), and create a project in the Firebase console. If you are already signed into Google, check that you are in the account you want to be the owner of this project.

### Authentication

Go to the Authentication page and add a sign-in method such as email. 

Go to the Users tab and add yourself as user.

### Database

Go to the Firestore page and add a new database. 

Start the database in production mode, we'll edit the rules in a moment to give our site access. 

Set a location. Depending on the site's purpose a nearby location may give minutely faster response times.

Edit the rules for public read and auth write.
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

Create a collection for the data to go into. Design of the database is beyond the scope of this guide. If unsure, start with `entries`.

### File Storage

If you want to use file storage, add Storage to the project and set the rules for read and auth write.

```
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### Hosting

Go to the Hosting page and add hosting by clicking "Get started". 

1. Install the Firebase CLI using the `npm` command given in the steps or [download an installer](https://firebase.google.com/docs/cli).

2. Initialise the project by running these commands in terminal.   
```
firebase login
```

Check that the same account is logged in on CLI as the web dashboard. If you need to change accounts, logout then log in again.
```
firebase logout
```

The next command will take you through some options to set up the project details.
```
firebase init
```

When prompted, choose the following.
- Choose `Hosting`
- Choose use existing project, and select the project you want.
- What do you want to use as your public directory? `build`
- Configure as a single-page app (rewrite all urls to /index.html)? `Yes`
- Set up automatic builds and deploys with GitHub? `No`

### Connect domain to hosting

Back on the Firebase dashboard.. click Next, ignore the deploy command for now and click Continue to the console.

In the Advanced section, add multiple sites for admin and public sites. Click Add another site, and add two with -admin and -site suffixes (replace projectname with your project name). The default projectname hosting will remain, it will be easier to recognise hosting targets later by using explicit names.

(eg `projectname-admin.web.app` & `projectname-site.web.app`).

Add custom domains for both Firebase sites.

Starting with the `-admin` site, click its View button. Click the Add custom domain button and enter the domain details you want to use. 

For the admin site, use `admin.mydomain.com` (replace `mydomain.com` with your domain name). Click continue, then create new `A` type DNS records in your domain's DNS management interface using the provided IP addresses and the name `admin`. If you are using Google Domains as the registrar, create one `admin A` record, then edit it to add the next IP address (two records with the same name are not allowed).

Go back to the hosting dashboard, and click the View button for the `-site` hositing site. 

For the non-admin site, use the main domain eg `mydomain.com`. Create default `@` DNS records in your DNS management with the provided IP addresses. In the Firebase console you will be prompted to "Would you like to add www.mydomain.com too?" Click Add, then Continue. In your DNS management, add the suggested `A` records for the www address.

You may need to verify domain ownership by adding a DNS TXT record that Firebase provides.


### Connect the admin site to Firebase config

Go to the Firebase dashboard `Project Overview` > `Project settings`

Add a "web app" (the icon is `</>`). Give it the project name (not the admin name).

Copy the firebase config details from the web app info. The details will be used to authenticate the admin site with the Firebase project. Eg
```
const firebaseConfig = {
  apiKey: "XXX",
  authDomain: "projectname.firebaseapp.com",
  projectId: "projectname",
  storageBucket: "projectname.appspot.com",
  messagingSenderId: "21389728731",
  appId: "XXX"
};
```

Paste the config into the `index.js` file.

### Admin Deployment

Add a deployment method. This will be used to upload the public files to the Firebase hosting when you deploy. We'll use the CLI to set this up.

Add the site as a hosting target 
```
firebase target:apply hosting admin projectname-admin
```

Now, manually edit the `firebase.json` file. Add the target name `"target": "admin"`, eg:
```
{
  "hosting": {
    "target": "admin",
    "public": "build",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

Add the deploy step to `package.json` scripts block.

    "predeploy": "yarn build",
    "deploy": "firebase deploy --only hosting:admin"


Create a `jsconfig.json` file with this configuration. (TODO test this, also maybe not required??)
```
{
"compilerOptions": {
"baseUrl": "src"
},
"include": ["src"]
}
```

Test building the site with `yarn start`. This should generate the site locally.

Test deployment with `yarn deploy`. This should upload the optimised production build of the site to the hosting.

After deployment, check the URLs to see if it all worked.

### Admin site content

Now customise the admin site. Look at the template repository for explicit details for each component. 

Change details in index.html, manifest.json, favicon, icons

Delete App.css, App.test.js, logo.svg, reportWebVitals.js, setupTests.js from src

React-admin uses a Dashboard as a landing page, and groups of components based on collection names for administering the content.

Create a Dashboard.js component to use as the landing page. See template example for the code.

Create components for each collection to work with, eg Page. See `src/Page.js` for example code.

App.js
- Import react-admin and react-admin-firebase components
- Import Dashboard and collection type components
- Add firebase config, using .env vars
- Set up FirebaseDataProvider and FirebaseAuthProvider
- Replace App div with Admin component
- Add authProvider, dataProvider, dashboard as props of Admin 
- Add Resources as children of Admin, one resource for each collection. Resource name is the name of the collection.

If the site is not already running, test with `yarn start`


## Build the public site

Set up public site react project and install modules.
```
cd ..
npx create-react-app projectname-site
cd projectname-site
yarn add date-fns firebase html-react-parser react-lazyload react-linkify react-redux react-redux-firebase react-router-dom redux redux-firestore redux-thunk semantic-ui-css semantic-ui-react object-hash react-truncate 
```

Add firebase config info and node src path to `.env` (see admin info above for details, or just copy the admin `.env` file to this project's files).
Exclude `.env` in `gitignore`.

Add Firebase for deploying with `firebase init`
- Choose Hosting
- Choose use existing project
- Use `build` as the public dir
- Choose to make as a single page app `Yes`

Add the site as a hosting target 
```
firebase target:apply hosting site projectname-site
```

Edit `firebase.json` and add the ` "target": "site"` property (see admin info above for example).

Add yarn deploy step to `package.json`

    "predeploy": "yarn build",
    "deploy": "firebase deploy --only hosting:site"

Test with `yarn start`.

Deploy with `yarn deploy`. The site should now be available at your domain.

Populate the database with at least one entry, with a name and info record

### Site content 

Now customise site for content. See the template files for code.

Change details in index.html, manifest.json, favicon, icons

Delete App.css, App.test.js, logo.svg, reportWebVitals.js, setupTests.js from src

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


## Improvements

- Auto links in content (shouldn't be needed if using react-admin rich text)
- List content search/ filters using selects
- Add truncation for info content
- Export as csv?
