import { useEffect, useState } from "react";
import { getCampaigns } from "../services/api";
import "./RunningCampaigns.css";

function RunningCampaigns() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCampaigns = async () => {
      try {
        const data = await getCampaigns();
        setCampaigns(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadCampaigns();
  }, []);

  return (
    <div className="running-campaigns-page">
      <div className="running-campaigns-header">
        <div>
          <h1>Running Campaigns</h1>
          <p>Monitor and manage customer engagement campaigns</p>
        </div>
      </div>

      {loading ? (
        <div className="campaigns-loading" role="status">
          <div className="campaigns-loading-spinner" />
          <p>Loading campaigns...</p>
        </div>
      ) : error ? (
        <div className="campaigns-error" role="alert">
          {error}
        </div>
      ) : campaigns.length === 0 ? (
        <div className="campaigns-empty">
          <div className="campaigns-empty-mark" aria-hidden="true">—</div>
          <h2>No campaigns yet</h2>
          <p>Customer engagement campaigns will appear here once started.</p>
        </div>
      ) : (
        <div className="campaigns-list">
          {campaigns.map((campaign) => {
            const statusClass = String(campaign.status || "unknown").toLowerCase();

            return (
              <article className="campaign-card" key={campaign.id}>
                <div className="campaign-card-header">
                  <div className="campaign-card-title">
                    <span className="campaign-id-label">Campaign</span>
                    <h2>#{campaign.id}</h2>
                  </div>
                  <span className={`campaign-status campaign-status-${statusClass}`}>
                    {campaign.status}
                  </span>
                </div>

                <div className="campaign-details-grid">
                  <div className="campaign-detail">
                    <span className="campaign-detail-label">Customer ID</span>
                    <span className="campaign-detail-value">{campaign.customer}</span>
                  </div>
                  <div className="campaign-detail">
                    <span className="campaign-detail-label">Campaign Type</span>
                    <span className="campaign-type">{campaign.campaign_type}</span>
                  </div>
                  <div className="campaign-detail">
                    <span className="campaign-detail-label">Started At</span>
                    <span className="campaign-detail-value">
                      {campaign.started_at || "Not started"}
                    </span>
                  </div>
                  <div className="campaign-detail">
                    <span className="campaign-detail-label">Completed At</span>
                    <span className="campaign-detail-value">
                      {campaign.completed_at || "Not completed"}
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default RunningCampaigns;