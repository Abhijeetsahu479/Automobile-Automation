import "./VideoDemos.css";

const demos = [
  {
    title: "Customer Re-engagement",
    description:
      "See how the system automatically follows up with customers after their service.",
  },
  {
    title: "Customer Feedback",
    description:
      "See how customers receive automated feedback requests after service.",
  },
  {
    title: "Broadcast Campaign",
    description:
      "See how promotional offers can be sent to selected customers.",
  },
];

function VideoDemos() {
  return (
    <main className="video-demos-page">
      <header className="video-demos-header">
        <h1>Video Demos</h1>
        <p>Explore automation workflow demonstrations</p>
      </header>

      <section className="workflow-demos" aria-labelledby="workflow-demos-title">
        <div className="workflow-demos-intro">
          <div>
            <h2 id="workflow-demos-title">Automation Workflow Demos</h2>
            <p>
              Explore how automated workflows help keep customer engagement
              timely and consistent.
            </p>
          </div>
        </div>

        <div className="video-demo-grid">
          {demos.map((demo, index) => (
            <article className="video-demo-card" key={demo.title}>
              <div className={`video-demo-preview video-demo-preview-${index + 1}`}>
                <span className="preview-label">WORKFLOW PREVIEW</span>
                <button
                  className="preview-play-button"
                  type="button"
                  aria-label={`Play ${demo.title} demo`}
                >
                  <span className="preview-play-icon" aria-hidden="true" />
                </button>
                <span className="preview-duration">DEMO</span>
              </div>

              <div className="video-demo-content">
                <h3>{demo.title}</h3>
                <p>{demo.description}</p>
                <button className="watch-demo-button" type="button">
                  Watch Demo
                  <span aria-hidden="true">&#8594;</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default VideoDemos;