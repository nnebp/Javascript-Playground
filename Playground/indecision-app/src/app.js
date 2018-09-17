console.log('running!');
//babel src/app.js --out-file=public/scripts/app.js --presets=env,react --watch


//JSX
const title = {
  title: 'look im a title',
  subTitle: 'subtitle over here',
  //options: ['one', 'two']
  options: []
};

var template = (
  <div>
    <h1>{title.title}</h1>
    <h2>{true && title.subTitle}</h2>
    <p>age:26</p>
    <p>location:26sss</p>
    <p>{title.options.length > 0 ? 'some options' : 'no options'}</p>
  </div>
);

let count = 0;

const minusOne = () => {
  count--;
  renderer();
};

const addOne = () => {
  count++;
  renderer();
};

const reset = () => {
  count = 0;
  renderer();
};


var appRoot = document.getElementById('app');

const renderer = () => {
  const templateTwo = (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={minusOne}>-1</button>
      <button onClick={addOne}>+1</button>
      <button onClick={reset}>reset</button>
    </div>
  );

  ReactDOM.render(templateTwo, appRoot);
};

renderer();

