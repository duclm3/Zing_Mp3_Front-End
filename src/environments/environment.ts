// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080',
  firebaseConfig : {
    apiKey: "AIzaSyCf73DjCou5elcgrko0RnV6UVmAucyIly0",
    authDomain: "zing-aec15.firebaseapp.com",
    databaseURL: 'https://zing-aec15-default-rtdb.firebaseio.com',
    projectId: "zing-aec15",
    storageBucket: "zing-aec15.appspot.com",
    messagingSenderId: "945797916148",
    appId: "1:945797916148:web:87da079f4217fc4373c5a1",
    measurementId: "G-05YY39DRN9"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
