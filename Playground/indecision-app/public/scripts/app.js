'use strict';

console.log('running!');
//babel src/app.js --out-file=public/scripts/app.js --presets=env,react --watch


//JSX
var title = {
  title: 'look im a title',
  subTitle: 'subtitle over here'
};

var template = React.createElement(
  'div',
  null,
  React.createElement(
    'h1',
    null,
    title.title
  ),
  React.createElement(
    'h2',
    null,
    title.subTitle
  ),
  React.createElement(
    'p',
    null,
    'age:26'
  ),
  React.createElement(
    'p',
    null,
    'location:26sss'
  ),
  React.createElement(
    'p',
    null,
    'JSX text isssssssss7777777777sst'
  )
);

var appRoot = document.getElementById('app');
ReactDOM.render(template, appRoot);
