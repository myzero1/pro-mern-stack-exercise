class IssueList extends React.Component{
	render(){
		return(
			<div>
				<h1>Issue Tracker</h1>
				<IssueFilter />
				<hr />
				<IssueTable issues={issues} />
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
		const issueRows = this.props.issues.map(issue => <IssueRow key={issue.id} issue={issue} completion_date={issue.completionDate}>{issue.title}</IssueRow>);

		return (
			<table className="bordered-table">
				<thead>
					<tr>
						<th>ID</th>
						<th>Status</th>
						<th>Owner</th>
						<th>Created</th>
						<th>Effort</th>
						<th>Completion Date</th>
						<th>Title</th>
					</tr>
				</thead>
				<tbody>{issueRows}</tbody>
			</table>
		)
	}
}

class IssueRow extends React.Component{
	render(){
		const issue = this.props.issue;
		return(
			<tr>
				<td>{issue.id}</td>
				<td>{issue.status}</td>
				<td>{issue.owner}</td>
				<td>{issue.created.toDateString()}</td>
				<td>{issue.effort}</td>
				<td>{this.props.completion_date}</td>
				<td>{this.props.children}</td>
			</tr>
		)
	}

	static get propTypes(){
		return {
			completion_date:React.PropTypes.string
		};
	}

	static get defaultProps(){
		return {
			completion_date:"-----no completion date------"
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

const issues = [
	{
		"id":1,
		"status":"open",
		"owner":"woogle",
		"created":new Date("2018-12-19"),
		"effort":5,
		"completionDate":undefined,
		"title":"this is the title of issue 1"
	},
	{
		"id":2,
		"status":"open",
		"owner":"woogle",
		"created":new Date("2018-12-18"),
		"effort":5,
		"completionDate":"2018-12-18",
		"title":"this is the title of issue 2"
	},
	{
		"id":3,
		"status":"open",
		"owner":"woogle",
		"created":new Date("2018-12-17"),
		"effort":5,
		"title":"this is the title of issue 3"
	}
];

ReactDOM.render(<IssueList />, contentNode);
