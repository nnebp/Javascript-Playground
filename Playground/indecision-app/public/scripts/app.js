console.log('running!');


//JSX
//var template = <p>JSX text test</p>;
var template = React.createElement(
  "h1",
  { id: "someid" },
  "Something new"
);

var appRoot = document.getElementById('app');
ReactDOM.render(template, appRoot);
