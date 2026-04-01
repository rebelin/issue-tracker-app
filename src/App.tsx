import React from "react";

function formatIssueDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// Define Issue type
type Issue = {
  id: number;
  status: string;
  owner: string;
  created: Date;
  effort: number;
  completionDate?: Date;
  title: string;
  priority: "High" | "Medium" | "Low";
};

// IssueRow Props
type IssueRowProps = {
  issue: Issue;
};

// IssueRow Component
class IssueRow extends React.Component<IssueRowProps> {
  render() {
    const { issue } = this.props;
    return (
      <tr>
        <td>{issue.id}</td>
        <td>{issue.status}</td>
        <td>{issue.priority}</td>
        <td>{issue.owner}</td>
        <td>{formatIssueDate(issue.created)}</td>
        <td>{issue.effort}</td>
        <td>
          {issue.completionDate
            ? issue.completionDate.toDateString()
            : ""}
        </td>
        <td>{issue.title}</td>
      </tr>
    );
  }
}

// IssueTable Props
type IssueTableProps = {
  issues: Issue[];
};

// IssueTable Component
class IssueTable extends React.Component<IssueTableProps> {
  render() {
    const issueRows = this.props.issues.map((issue) => (
      <IssueRow key={issue.id} issue={issue} />
    ));

    const borderedStyle: React.CSSProperties = {
      border: "1px solid silver",
      padding: 6,
    };

    return (
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th style={borderedStyle}>Id</th>
            <th style={borderedStyle}>Status</th>
            <th style={borderedStyle}>Priority</th>
            <th style={borderedStyle}>Owner</th>
            <th style={borderedStyle}>Created</th>
            <th style={borderedStyle}>Effort</th>
            <th style={borderedStyle}>Completion Date</th>
            <th style={borderedStyle}>Title</th>
          </tr>
        </thead>
        <tbody>{issueRows}</tbody>
      </table>
    );
  }
}

// IssueFilter Component (no props)
class IssueFilter extends React.Component {
  render() {
    return <div></div>;
  }
}

// IssueAdd Component (no props)
class IssueAdd extends React.Component {
  render() {
    return <div>This is a placeholder for an Issue Add entry form.</div>;
  }
}

// Sample Data
const issues: Issue[] = [
  {
    id: 1,
    status: "Open",
    owner: "Ravan",
    created: new Date("2016-08-15"),
    effort: 5,
    priority: "High",
    title: "Error in console when clicking Add",
  },
  {
    id: 2,
    status: "Assigned",
    owner: "Eddie",
    created: new Date("2016-08-16"),
    effort: 14,
    completionDate: new Date("2016-08-30"),
    priority: "Medium",
    title: "Missing bottom border on panel",
  },
  {
    id: 3,
    status: "New",
    owner: "Rebecca",
    created: new Date("2026-04-01"),
    effort: 7,
    completionDate: undefined,
    priority: "Low",
    title: "Search box clears input on blur",
  },
];

class IssueList extends React.Component {
  render() {
    return (
      <>
        <hr />
        <IssueFilter />
        <IssueTable issues={issues} />
        <p>Total Issues: {issues.length}</p>
        <hr />
        <IssueAdd />
      </>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Issue Tracker</h1>
        <IssueList />
      </div>
    );
  }
}

export default App;
