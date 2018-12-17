class IssueList extends React.Component{
	render(){
		return(
			<div>
				<h1>Issue Tracker</h1>
				<IssueFilter />
				<hr />
				<IssueTable />
				<hr />
				<IssueAdd />
			</div>
		)
	}
}

class IssueFilter extends React.Component{
	render(){
		return (
			<div>This is a placehoder for issue filter.</div>
		)
	}
}

class IssueTable extends React.Component{
	render(){
		return (
			<div>This is a placehoder for issue table.</div>
		)
	}
}

class IssueAdd extends React.Component{
	render(){
		return (
			<div>This is a placehoder for issue add.</div>
		)
	}
}

const contentNode = document.getElementById("contents");

ReactDOM.render(<IssueList />, contentNode);
