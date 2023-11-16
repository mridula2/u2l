export const emailMask = [
  {
    regexp: /^[\w\-_.]+$/,
    placeholder: 'user',
  },
  { fixed: '@' },
  {
    regexp: /^[\w]+$/,
    placeholder: 'hpe',
  },
  { fixed: '.' },
  {
    regexp: /^[\w]+$/,
    placeholder: 'com',
  },
];

export const emailValidation = [
  {
    regexp: /[^@ \t\r\n]+@/,
    message: 'Email should contain @',
    status: 'error',
  },
  {
    regexp: /[^@ \t\r\n]+@[^@ \t\r\n]+/,
    message: '@ must be followed by domain',
    status: 'error',
  },
  {
    regexp: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
    message: 'Email must contain "." ',
    status: 'error',
  },
];

// export const passwordRequirements = [
//   {
//     regexp: new RegExp('(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[#?!@$ %^&*-]).{8,}'),
//     message: 'Password requirements not met.',
//     status: 'error',
//   },
// ];
export const passwordRequirements = [
  {
    regexp: /(?=.*\d)(?=.*?[A-Z]).{8,}/,
    message: 'Password requirements not met.',
    status: 'error',
  },
];

export const passwordRulesStrong = [
  {
    regexp: /(?=.*?[A-Z])/,
    message: 'One uppercase letter',
    status: 'error',
  },
  // {
  //   regexp: new RegExp('(?=.*?[a-z])'),
  //   message: 'One lowercase letter',
  //   status: 'error',
  // },
  // {
  //   regexp: new RegExp('(?=.*?[#?!@$ %^&*-])'),
  //   message: 'One special character',
  //   status: 'error',
  // },
  {
    regexp: /(?=.*?\d)/,
    message: 'One number',
    status: 'error',
  },
  {
    regexp: /.{8,}/,
    message: 'At least 8 characters',
    status: 'error',
  },
];
