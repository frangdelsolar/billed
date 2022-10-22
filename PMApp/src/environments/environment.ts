// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: '',

  firebase: {
    apiKey: "AIzaSyA8AP4DMr6EtzA0NHYZqlFGDBJVE4eWTEU",
    authDomain: "budgetapp-94627.firebaseapp.com",
    projectId: "budgetapp-94627",
    storageBucket: "budgetapp-94627.appspot.com",
    messagingSenderId: "300294998788",
    appId: "1:300294998788:web:2d5e9bec152ceb43221e51",
    measurementId: "G-VWYP95G0YP"
  },

  apiUrlBalance: 'api/balance',
  apiUrlTransaction: 'api/transaction',
  apiUrlCategory: 'api/category',
  apiUrlLogin: 'api/token',
  apiUrlPay: 'api/pay',
  apiUrlUser: 'api/user',
}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
