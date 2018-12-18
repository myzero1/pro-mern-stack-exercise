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
		const borderedStyle = {border:"1px solid silver",padding:6};

		return (
			<table style={{borderCollapse:"collapse"}}>
				<thead>
					<tr>
						<th style={borderedStyle}>ID</th>
						<th style={borderedStyle}>Title</th>
					</tr>
				</thead>
				<tbody>
					<IssueRow issue_id={1} issue_title="this is first issue row." />
					<IssueRow issue_id={2} issue_title="this is 2 issue row." />
					<IssueRow issue_id={3} />
				</tbody>
			</table>
		)
	}
}

class IssueRow extends React.Component{
	render(){
		const borderedStyle = {border:"1px solid silver", padding:4};

		return(
			<tr>
				<td style={borderedStyle}>{this.props.issue_id}</td>
				<td style={borderedStyle}>{this.props.issue_title}</td>
			</tr>
		)
	}

	static get propTypes(){
		return {
			issue_id:React.PropTypes.number.isRequired,
			issue_title:React.PropTypes.string
		};
	}

	static get defaultProps(){
		return {
			issue_id:"-----no id------",
			issue_title:"-----no title------"
		};
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
