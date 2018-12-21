class IssueList extends React.Component{
	constructor(){
		super();
		this.state = {issues:[]};
		this.createIssue = this.createIssue.bind(this);
	}

	componentDidMount(){
		this.loadData();
	}

	loadData(){
		fetch('/api/issues').then(response => {
			if(response.ok){
				response.json().then(data=>{
					data.records.forEach(issue => {
						issue.created = new Date(issue.created);
						if(issue.completionDate){
							issue.completionDate = new Date(issue.completionDate);
						}
					});
					this.setState({issues:data.records});
				});
			} else{
				response.json().then(error=>{
					alert("Failed to fetch issues:" + error.message);
				});
			}
		}).catch(err=>{
			console.log(err);
		});
	}

  createIssue(newIssue) {
    fetch('/api/issues', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newIssue),
    }).then(response => {
      if (response.ok) {
        response.json().then(updatedIssue => {
        				console.log('---------',JSON.stringify(updatedIssue),'---------');
        				console.log('---------',updatedIssue,'---------');
						updatedIssue.created = new Date(updatedIssue.created);
						if(updatedIssue.completionDate){
							updatedIssue.completionDate = new Date(updatedIssue.completionDate);
						}
						const newIssues = this.state.issues.concat(updatedIssue);
						this.setState({issues:newIssues});
					});
				} else{
					response.json().then(error=>{
						alert("Failed to fetch issues:" + error.message);
					});
				}
			}
		).catch(
			err=>{
				console.log(err);
			}
		);
	}

	render(){
		return(
			<div>
				<h1>Issue Tracker</h1>
				<IssueFilter />
				<hr />
				<IssueTable issues={this.state.issues} />
				<hr />
				<IssueAdd createIssue={this.createIssue} />
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

class IssueTableOld extends React.Component{
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

function IssueTable(props){
	const issueRows = props.issues.map(issue => <IssueRow key={issue._id} issue={issue}>{issue.title}</IssueRow>);

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

class IssueRowOld extends React.Component{
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

const IssueRow = (props) => (
		<tr>
			<td>{props.issue._id}</td>
			<td>{props.issue.status}</td>
			<td>{props.issue.owner}</td>
			<td>{props.issue.created.toDateString()}</td>
			<td>{props.issue.effort}</td>
			<td>{props.issue.completionDate ? props.issue.completionDate.toDateString() : ''}</td>
			<td>{props.children}</td>
		</tr>
	);

class IssueAdd extends React.Component{
	constructor(){
		super();
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(e){
		e.preventDefault();
		var form = document.forms.issueAdd;
		this.props.createIssue({
			"id":new Date().getTime(),
			"owner":form.owner.value,
			"title":form.title.value,
			"status":"New",
			"created":new Date()
		});
		form.owner.value="";
		form.title.value="";
	}

	render(){
		return (
			<div>
				<form name="issueAdd" onSubmit={this.handleSubmit}>	
					<input type="text" name="owner" placeholder="owner" />
					<input type="text" name="title" placeholder="title" />
					<button>Add</button>
				</form>
			</div>
		)
	}
}

const contentNode = document.getElementById("contents");

ReactDOM.render(<IssueList />, contentNode);
