import './init.js';
import Auth from './auth/index.js';
import functions from 'firebase-functions';
import util from 'util';
import crypto from 'crypto';

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// export const helloWorld = functions.https.onRequest((request, response) => {

  

//   response.send(
//     ''
  
//   );
// });

// Auth.Token.generate('asd',{})
Auth.Token.validate('asd',
'eyJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2Mjg2NDgzNjksImlzcyI6InNvY2lhbGtvcnAuY29tIiwiYXVkIjoiYWRtaW4uZnV0dXJlaGVhbHRoc3BhY2VzLmNvbSIsInN1YiI6ImFzZCIsImV4cCI6MTYyODY1NTU2OX0.Wg_7bhoNwRFkh1IxjxkYGrz2RuulzBCD7U6oT_1D4c90HFLjgtC-vnGV2OlAIA1hn3Nchb_5Z-GFYygYfEvaFNKE3mpr1WlaONzc4FToXsnoeV2gGjQqDKz3J_apnCcEUCwu46Zlfp2GzeWSRI3lu7LSeXCgWLDf1JPBBzd3DEe6BSXrzDBh2W1EXeyOFQd6f15Y8eMwPzcAV8KHcHD6IFS6sXfp7LDtxpg8u7s_k0eXy6vfPc6_Y7ybobi58Li-uXSuPB9WcXRBVrBRbB2O3vU5TcPAqub0hQC_42JqFEfGpiBwLrGRUoAdjhNOFlJU3UxWH3kkJXm6SzEN4zg9Rb7ndVvyre9fItFulLV3IhLez7u66NciPXn5Z4nmWwaVFiOc7OmEV-Bxbh2UvAaHZOTTm9IBIwLSGWEzzbGxCwGq1gX26KiJtR4GcS8M5_ICnrRbJ-YYaflk2Jeq495YlwYJi1dHiCykDEIodzZ51du8wrJZhzjrcBvfPw9-fj17vTzGXDXhAmNJmEOuZedwktJjdPvCrM-F63LEWKVXLppSPHeMzOlnf-np25e6E_4n1vOyfpLxhf1pzuF5ToISXBbpgakFdNhPXZvFk7kraVaYGDOyMyKKDOGRevVuurlsuetpfVSISpsj-Ka2Gpndis4XvDV3CGvfpmq2rJl0oMk'
)
// Auth.Token.refresh('asd',{},
// 'lwshRskooJ1Q24rjhevkRKkd70ea0ufqsLuO6CS6nPs='
// )



.then(value => {
  console.log(value);
}).catch(err => {
  throw err;
})



