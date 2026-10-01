import "./Documentation.css";

const useCases = [
  {
    title: "Re-engagement",
    points: [
      "Engage old customers after approximately 3 months.",
      "Use the customer's previous service information.",
      "Send a personalized message.",
    ],
    objective: "Bring the customer back to the shop.",
  },
  {
    title: "Feedback",
    points: [
      "Contact the customer within approximately 1 week after service.",
      "Ask for feedback in a conversational manner.",
    ],
  },
  {
    title: "Broadcasting",
    points: [
      "Broadcast selected offers to selected or all customers.",
      "Map relevant offers based on previous customer/service information.",
    ],
  },
];

const applicationPages = [
  {
    title: "Customers",
    points: [
      "List customers.",
      "Edit customer information.",
      "Date of service is not editable.",
      "Start a campaign.",
    ],
  },
  {
    title: "Running Campaigns",
    points: [
      "Show campaign/customer status.",
      "Display campaign progress information.",
    ],
  },
  {
    title: "Video Demos",
    points: ["Demonstrate different automation use cases."],
  },
];

const workflowSteps = [
  "Customer Data",
  "Campaign Started",
  "n8n Orchestration",
  "Django Decision API",
  "Next Action + Reply",
  "Customer Conversation",
  "Campaign Progress",
];

const technologyStack = [
  { name: "Frontend", value: "React + Vite" },
  { name: "Backend", value: "Django + Django REST Framework" },
  { name: "Database", value: "SQLite" },
  { name: "Integration", value: "REST API + CORS" },
  { name: "Environment", value: ".env configuration" },
];

function Documentation() {
  return (
    <main className="documentation-page">
      <header className="documentation-header">
        <h1>Documentation</h1>
        <p>Automobile Automation Demo — Project Overview &amp; Workflow</p>
      </header>

      <section className="documentation-section overview-section" aria-labelledby="project-overview-title">
        <div className="documentation-section-heading">
          <span className="documentation-section-number">01</span>
          <h2 id="project-overview-title">Project Overview</h2>
        </div>
        <p className="overview-copy">
          Automobile Automation Demo is designed to demonstrate personalized
          and automated customer engagement for automobile businesses.
        </p>
        <div className="overview-use-cases" aria-label="Main campaign use cases">
          <span>Re-engagement</span>
          <span>Feedback</span>
          <span>Broadcasting</span>
        </div>
      </section>

      <section className="documentation-block" aria-labelledby="main-use-cases-title">
        <div className="documentation-section-heading">
          <span className="documentation-section-number">02</span>
          <h2 id="main-use-cases-title">Main Use Cases</h2>
        </div>
        <div className="documentation-card-grid three-columns">
          {useCases.map((useCase) => (
            <article className="documentation-card" key={useCase.title}>
              <h3>{useCase.title}</h3>
              <ul>
                {useCase.points.map((point) => <li key={point}>{point}</li>)}
              </ul>
              {useCase.objective && (
                <p className="use-case-objective">
                  <strong>Objective:</strong> {useCase.objective}
                </p>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="documentation-block" aria-labelledby="application-pages-title">
        <div className="documentation-section-heading">
          <span className="documentation-section-number">03</span>
          <h2 id="application-pages-title">Application Pages</h2>
        </div>
        <div className="documentation-card-grid three-columns">
          {applicationPages.map((page) => (
            <article className="documentation-card application-page-card" key={page.title}>
              <h3>{page.title}</h3>
              <ul>
                {page.points.map((point) => <li key={point}>{point}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="documentation-section workflow-section" aria-labelledby="automation-workflow-title">
        <div className="documentation-section-heading">
          <span className="documentation-section-number">04</span>
          <h2 id="automation-workflow-title">Automation Workflow</h2>
        </div>
        <ol className="workflow-steps">
          {workflowSteps.map((step, index) => (
            <li className="workflow-step-item" key={step}>
              <span className="workflow-step-number">{String(index + 1).padStart(2, "0")}</span>
              <span className="workflow-step-label">{step}</span>
            </li>
          ))}
        </ol>
        <div className="workflow-notes">
          <p><strong>n8n:</strong> Handles the orchestration/channel connection and scheduling layer.</p>
          <p><strong>Django:</strong> Stores information and provides the decision-making API.</p>
          <p><strong>AI Agent:</strong> Logic is handled separately and is not implemented in this CRUD frontend/backend module.</p>
        </div>
      </section>

      <section className="documentation-section technology-section" aria-labelledby="technology-stack-title">
        <div className="documentation-section-heading">
          <span className="documentation-section-number">05</span>
          <h2 id="technology-stack-title">Technology Stack</h2>
        </div>
        <div className="technology-grid">
          {technologyStack.map((item) => (
            <div className="technology-item" key={item.name}>
              <span className="technology-name">{item.name}</span>
              <span className="technology-value">{item.value}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="documentation-section access-section" aria-labelledby="access-scope-title">
        <div className="documentation-section-heading">
          <span className="documentation-section-number">06</span>
          <h2 id="access-scope-title">Access &amp; Scope</h2>
        </div>
        <ul className="documentation-list two-column-list">
          <li>This is a demo application.</li>
          <li>It is not a SaaS onboarding/selling application.</li>
          <li>No login/authentication flow is required for this demo.</li>
          <li>Access restriction is based on IP address.</li>
        </ul>
      </section>

      <section className="documentation-block developer-scope-block" aria-labelledby="developer-scope-title">
        <div className="documentation-section-heading">
          <span className="documentation-section-number">07</span>
          <h2 id="developer-scope-title">Developer Scope</h2>
        </div>
        <div className="documentation-card-grid two-columns">
          <article className="documentation-card scope-card">
            <h3>CRUD Module</h3>
            <ul>
              <li>Django Backend</li>
              <li>React Frontend</li>
              <li>API Integration</li>
              <li>Database Models</li>
              <li>Campaign APIs</li>
              <li>Frontend Dashboard</li>
              <li>Deployment</li>
            </ul>
          </article>
          <article className="documentation-card scope-card ai-scope-card">
            <h3>AI Engine</h3>
            <p>Handled separately by the AI Engine workstream.</p>
            <p className="scope-boundary">
              LangChain or GPT logic is not implemented in the CRUD module.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}

export default Documentation;
