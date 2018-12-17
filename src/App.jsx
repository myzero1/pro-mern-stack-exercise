const contentNode = document.getElementById('contents');

const contents = ["Africa","American","Asia"];
const message = contents.map(c => `Hello ${c}!`).join(' -- ');

const component = <p>{message}</p>;
ReactDOM.render(component, contentNode);