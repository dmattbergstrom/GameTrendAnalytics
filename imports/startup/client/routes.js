// import { FlowRouter } from 'meteor/kadira:flow-router';
// import { BlazeLayout } from 'meteor/kadira:blaze-layout';
// import { AccountsTemplates } from 'meteor/useraccounts:core';
//
// /**
// *   checkLoggedIn() function:
// *   If the user isn't logged in, redirect them to the login page.
// **/
// function checkLoggedIn(){
//   if(!Meteor.userId()){
//     FlowRouter.go("login");
//   }
// }
//
// /**
// *   ALL ROUTES: The link pipeline.
// **/
//
// /* GENERAL */
// FlowRouter.route('/', {
//     name: 'home', //Reference name
//     subscriptions: function(params, queryParams) {
//       var t = this;
//       subscriptions(t);
//     },
//     action() {  //What actually happens.
//         BlazeLayout.render('appLayout', {hasNavbar: true, main:"home"}); //Render
//         checkLoggedIn();
//     }
// });
//
// FlowRouter.notFound = {
//     action() {
//       BlazeLayout.render('appLayout', { showRow:true, blueBackground:true, main:"notFound"});
//     }
// };
