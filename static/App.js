const contentNode = document.getElementById('contents');

const contents = ["Africa", "American", "Asia"];
const message = contents.map(c => `Hello ${c}!`).join(' -- ');

const component = React.createElement(
  "p",
  null,
  message
);
ReactDOM.render(component, contentNode);