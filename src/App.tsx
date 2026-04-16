import React from "react";

// Define Issue type
type Issue = {
  id: number;
  status: string;
  owner: string;
  created: Date;
  effort: number;
  completionDate?: Date;
  title: string;
  priority: string;
};
// --------------------
// Helper Function
// --------------------
function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const borderedStyle: React.CSSProperties = {
  border: "1px solid silver",
  padding: 6,
};

// --------------------
// IssueRow
// --------------------
class IssueRow extends React.Component<{
  issue: Issue;
  deleteIssue: (id: number) => void;
}> {
  render() {
    const { issue } = this.props;
    return (
      <tr>
      <td style={borderedStyle}>{issue.id}</td>
      <td style={borderedStyle}>{issue.status}</td>
      <td style={borderedStyle}>{issue.owner}</td>
      <td style={borderedStyle}>{formatDate(issue.created)}</td>
      <td style={borderedStyle}>{issue.effort}</td>
      <td style={borderedStyle}>
      {issue.completionDate ? formatDate(issue.completionDate) : ""}
      </td>
      <td style={borderedStyle}>{issue.title}</td>
      <td style={borderedStyle}>{issue.priority}</td>
      
      {/* Actions Column */}
      <td style={borderedStyle}>
      <button onClick={() => this.props.deleteIssue(issue.id)}>
        Delete
      </button>
      </td>
      </tr>
    );
  }
}
// --------------------
// IssueTable
// --------------------
class IssueTable extends React.Component<{
  issues: Issue[];
  deleteIssue: (id: number) => void;
}> {
  render() {
    const issueRows = this.props.issues.map((issue) => (
      <IssueRow
      key={issue.id}
      issue={issue}
      deleteIssue={this.props.deleteIssue}
      />
    ));

    return (
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
      <thead>
      <tr>
        <th style={borderedStyle}>Id</th>
        <th style={borderedStyle}>Status</th>
        <th style={borderedStyle}>Owner</th>
        <th style={borderedStyle}>Created</th>
        <th style={borderedStyle}>Effort</th>
        <th style={borderedStyle}>Completion Date</th>
        <th style={borderedStyle}>Title</th>
        <th style={borderedStyle}>Priority</th>
        <th style={borderedStyle}>Actions</th>
      </tr>
      </thead>
      <tbody>{issueRows}</tbody>
      </table>
    );
  }
}

// --------------------
// IssueFilter
// --------------------
class IssueFilter extends React.Component {
  render() {
    return <div></div>;
  }
}

// --------------------
// IssueAdd
// --------------------
type IssueAddProps = {
  addIssue: (issue: Issue) => void;
};

type IssueAddState = {
  owner: string;
  title: string;
  effort: string;
  completionDate: string;
  priority: string;
  formErrors: string[];
};

function validateIssueAddForm(state: IssueAddState): string[] {
  // Task 6: Validate form inputs
  const errors: string[] = [];
  const owner = state.owner.trim();
  if (owner.length === 0) {
    errors.push("Owner is required.");
  } else if (owner.length < 3) {
    errors.push("Owner must be at least 3 characters.");
  }

  const title = state.title.trim();
  if (title.length === 0) {
    errors.push("Title is required.");
  } else if (title.length < 5) {
    errors.push("Title must be at least 5 characters.");
  }

  const effortRaw = state.effort.trim();
  if (effortRaw.length === 0) {
    errors.push("Effort is required.");
  } else {
    const effort = Number(effortRaw);
    if (!Number.isFinite(effort)) {
      errors.push("Effort must be a valid number.");
    } else if (effort <= 0) {
      errors.push("Effort must be greater than 0.");
    }
  }

  return errors;
}

// Task 6: Form style rules
const issueAddContainerStyle: React.CSSProperties = {
  border: "1px solid #c8ccd0",
  borderRadius: 8,
  padding: "1.25rem 1.5rem",
  maxWidth: 440,
  width: "100%",
  marginTop: "1.5rem",
  marginLeft: "auto",
  marginRight: "auto",
  backgroundColor: "#f8f9fb",
  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.06)",
};

const issueAddFieldStyle: React.CSSProperties = {
  marginBottom: "0.85rem",
};

const issueAddLabelStyle: React.CSSProperties = {
  display: "grid",
  justifyContent: "left",
  fontSize: "1rem",
  fontWeight: 600,
  color: "#333",
  marginBottom: "0.5rem",
};

const issueAddInputStyle: React.CSSProperties = {
  display: "block",
  width: "100%",
  boxSizing: "border-box",
  padding: "0.75rem 0.75rem",
  border: "1px solid #bbb",
  borderRadius: 6,
  fontSize: "0.875rem",
  backgroundColor: "#fff",
};

const issueAddButtonStyle: React.CSSProperties = {
  marginTop: "0.5rem",
  padding: "0.55rem 1.25rem",
  fontSize: "1rem",
  fontWeight: 600,
  color: "#fff",
  backgroundColor: "#2563eb",
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
  boxShadow: "0 1px 2px rgba(37, 99, 235, 0.35)",
};

const issueAddErrorsStyle: React.CSSProperties = {
  margin: "0 0 1rem 0",
  padding: "0.65rem 0.75rem",
  borderRadius: 6,
  backgroundColor: "#fef2f2",
  border: "1px solid #fecaca",
  color: "#b91c1c",
  fontSize: "0.875rem",
};

class IssueAdd extends React.Component<IssueAddProps, IssueAddState> {
  constructor(props: IssueAddProps) {
    super(props);
    this.state = {
      owner: "",
      title: "",
      effort: "",
      completionDate: "",
      priority: "Low",
      formErrors: [],
    };
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    this.setState((prev) => ({
      ...prev,
      [name]: value,
      formErrors: [],
    }));
  };

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // Task 3 Part 2: Implement handleSubmit method
    e.preventDefault();
    const formErrors = validateIssueAddForm(this.state);
    if (formErrors.length > 0) {
      this.setState({ formErrors });
      return;
    }

    const newIssue: Issue = {
      id: 0,
      status: "Open",
      owner: this.state.owner.trim(),
      created: new Date(),
      effort: Number(this.state.effort),
      completionDate: this.state.completionDate
        ? new Date(this.state.completionDate)
        : undefined,
      title: this.state.title.trim(),
      priority: this.state.priority,
    };

    this.props.addIssue(newIssue);
    this.setState({
      owner: "",
      title: "",
      effort: "",
      completionDate: "",
      priority: "Low",
      formErrors: [],
    });
  };

  render() {
    // Task 3 Part 1: Add onChange handlers to all input fields
    return (
      // Task 6: Format form and implement style rules 
      <div style={issueAddContainerStyle}>
        <form onSubmit={this.handleSubmit}>
          {this.state.formErrors.length > 0 && (
            <div style={issueAddErrorsStyle} role="alert">
              <p style={{display:"grid", justifyContent:"left"}}><strong>Please fix the following:</strong></p>
              <ul style={{ margin: "0.5rem 0 0 1.1rem", justifyItems: "left", padding: 0 }}>
                {this.state.formErrors.map((msg) => (
                  <li key={msg}>{msg}</li>
                ))}
              </ul>
            </div>
          )}
          <div style={issueAddFieldStyle}>
            <label htmlFor="issue-add-owner" style={issueAddLabelStyle}>
              Owner
            </label>
            <input
              id="issue-add-owner"
              name="owner"
              placeholder="At least 3 characters"
              value={this.state.owner}
              onChange={this.handleChange}
              style={issueAddInputStyle}
            />
          </div>
          <div style={issueAddFieldStyle}>
            <label htmlFor="issue-add-title" style={issueAddLabelStyle}>
              Title
            </label>
            <input
              id="issue-add-title"
              name="title"
              placeholder="At least 5 characters"
              value={this.state.title}
              onChange={this.handleChange}
              style={issueAddInputStyle}
            />
          </div>
          <div style={issueAddFieldStyle}>
            <label htmlFor="issue-add-effort" style={issueAddLabelStyle}>
              Effort
            </label>
            <input
              id="issue-add-effort"
              name="effort"
              type="number"
              min={1}
              step="any"
              placeholder="Positive number"
              value={this.state.effort}
              onChange={this.handleChange}
              style={issueAddInputStyle}
            />
          </div>
          <div style={issueAddFieldStyle}>
            <label htmlFor="issue-add-date" style={issueAddLabelStyle}>
              Completion Date (optional)
            </label>
            <input
              id="issue-add-date"
              name="completionDate"
              type="date"
              value={this.state.completionDate}
              onChange={this.handleChange}
              style={issueAddInputStyle}
            />
          </div>
          <button type="submit" style={issueAddButtonStyle}>
            Add Issue
          </button>
        </form>
      </div>
    );
  }
}

// --------------------
// IssueList
// --------------------
type IssueListState = {
  issues: Issue[];
};

class IssueList extends React.Component<{}, IssueListState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      issues: [
      {
        id: 1,
        status: "Open",
        owner: "John",
        created: new Date("2016-08-15"),
        effort: 5,
        completionDate: undefined,
        title: "Error in console when clicking Add",
        priority: "High",
      },
      {
        id: 2,
        status: "Assigned",
        owner: "Emma",
        created: new Date("2016-08-16"),
        effort: 14,
        completionDate: new Date("2016-08-30"),
        title: "Missing bottom border on panel",
        priority: "Low",
      },
    ],
  };
}

addIssue = (issue: Issue) => {
  // Task 4: Understand State Snapshots and Asynchronous Updates
  console.log(
    "[addIssue] Before setState — this.state.issues snapshot:",
    this.state.issues.map((i) => i.id),
  );
  
  // Task 1: Implement Add Issue (Update Immutable Array)
  this.setState((prevState) => {
    const newId =
      Math.max(...prevState.issues.map((i) => i.id)) + 1;
    const updatedIssue = { ...issue, id: newId };
    console.log(
      "[addIssue] Inside setState updater — prevState issue ids:",
      prevState.issues.map((i) => i.id),
      "→ assigning newId:",
      newId,
    );
    return { issues: [...prevState.issues, updatedIssue] };
  });
  console.log(
    "[addIssue] Immediately after setState — still OLD snapshot (setState is async):",
    this.state.issues.map((i) => i.id),
  );
};

deleteIssue = (id: number) => {
  // Task 2: Implement Delete Issue (Filter Immutable Arrays)
  console.log(
    "[deleteIssue] Before setState — this.state.issues snapshot:",
    this.state.issues.map((i) => i.id),
    "remove id:",
    id,
  );
  this.setState((prevState) => ({
    issues: prevState.issues.filter((issue) => issue.id !== id),
  }));
  console.log(
    "[deleteIssue] Immediately after setState — still OLD snapshot (setState is async):",
    this.state.issues.map((i) => i.id),
  );
};

render() {
    return (
      <React.Fragment>
      <h1 style={{ padding: "1rem" }}>Issue Tracker</h1>
      <IssueFilter />
      <hr />
      <p style={{ paddingBottom: "1rem" }}>Total Issues: {this.state.issues.length}</p>
      <IssueTable
      issues={this.state.issues}
      deleteIssue={this.deleteIssue}
      />
      <hr />
      <IssueAdd addIssue={this.addIssue} />
      </React.Fragment>
    );
  }
}
export default IssueList;
