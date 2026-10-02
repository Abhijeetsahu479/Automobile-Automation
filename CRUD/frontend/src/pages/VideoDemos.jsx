import { useState } from "react";
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
  const [comingSoonDemos, setComingSoonDemos] = useState({});

  const showComingSoon = (title) => {
    setComingSoonDemos((current) => ({
      ...current,
      [title]: true,
    }));
  };

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
                <span className="preview-label">VIDEO COMING SOON</span>
                <button
                  className="preview-play-button"
                  type="button"
                  aria-label={`${demo.title} video coming soon`}
                  title="Video coming soon"
                  onClick={() => showComingSoon(demo.title)}
                >
                  <span className="preview-play-icon" aria-hidden="true" />
                </button>
                <span className="preview-duration">COMING SOON</span>
              </div>

              <div className="video-demo-content">
                <h3>{demo.title}</h3>
                <p>{demo.description}</p>
                {comingSoonDemos[demo.title] && (
                  <p className="video-demo-status" role="status">
                    Video coming soon.
                  </p>
                )}
                <button
                  className="watch-demo-button"
                  type="button"
                  title="Video coming soon"
                  aria-label={`Watch ${demo.title} demo, video coming soon`}
                  onClick={() => showComingSoon(demo.title)}
                >
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