'use strict';

console.log('running!');
//babel src/app.js --out-file=public/scripts/app.js --presets=env,react --watch


//JSX
var title = {
  title: 'look im a title',
  subTitle: 'subtitle over here',
  //options: ['one', 'two']
  options: []
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
    true && title.subTitle
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
    title.options.length > 0 ? 'some options' : 'no options'
  )
);

var count = 0;

var minusOne = function minusOne() {
  count--;
  renderer();
};

var addOne = function addOne() {
  count++;
  renderer();
};

var reset = function reset() {
  count = 0;
  renderer();
};

var appRoot = document.getElementById('app');

var renderer = function renderer() {
  var templateTwo = React.createElement(
    'div',
    null,
    React.createElement(
      'h1',
      null,
      'Count: ',
      count
    ),
    React.createElement(
      'button',
      { onClick: minusOne },
      '-1'
    ),
    React.createElement(
      'button',
      { onClick: addOne },
      '+1'
    ),
    React.createElement(
      'button',
      { onClick: reset },
      'reset'
    )
  );

  ReactDOM.render(templateTwo, appRoot);
};

renderer();
