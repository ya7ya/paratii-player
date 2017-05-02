// Options for accounts
// https://github.com/meteor-useraccounts/core/blob/master/Guide.md#configuration-api

AccountsTemplates.configure({
    // Behavior
    confirmPassword: true,
    enablePasswordChange: true,
    forbidClientAccountCreation: false,
    overrideLoginErrors: true,
    sendVerificationEmail: false,
    lowercaseUsername: false,
    focusFirstInput: true,

    // Appearance
    showAddRemoveServices: false,
    showForgotPasswordLink: false,
    showLabels: true,
    showPlaceholders: true,
    showResendVerificationEmailLink: false,

    // Client-side Validation
    continuousValidation: false,
    negativeFeedback: false,
    negativeValidation: true,
    positiveValidation: true,
    positiveFeedback: true,
    showValidating: true,

    // Privacy Policy and Terms of Use
    privacyUrl: 'privacy',
    termsUrl: 'terms-of-use',

    // Redirects
    homeRoutePath: '/account',
    redirectTimeout: 4000,

    // Hookups
    // onLogoutHook: myLogoutFunc,
    // onSubmitHook: mySubmitFunc,
    // preSignUpHook: myPreSubmitFunc,
    // postSignUpHook: myPostSubmitFunc,

    // Texts
    texts: {
      button: {
          signUp: "Create your account"
      },
      // socialSignUp: "Register...",
      socialIcons: {
          "meteor-developer": "fa fa-rocket"
      },
      title: {
          forgotPwd: "Recover Your Password",
          signUp: "Sign Up",
      },
    },
});

let email = AccountsTemplates.removeField('email');
let pwd = AccountsTemplates.removeField('password');

AccountsTemplates.addField(
  {
    _id: 'name',
    displayName: 'Your name',
    type: 'text',
    // placeholder: {
    //     signUp: "At least six characters"
    // },
    required: true,
    minLength: 4,
    // re: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/,
    // errStr: 'At least 1 digit, 1 lowercase and 1 uppercase',
  }
);

AccountsTemplates.addField(email);
AccountsTemplates.addField(pwd);


AccountsTemplates.configureRoute('signIn');
AccountsTemplates.configureRoute('enrollAccount');