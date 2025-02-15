import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

function Popup() {
  const [enabled, setEnabled] = useState(true);
  const [filters, setFilters] = useState([]);
  const [blockedAds, setBlockedAds] = useState(0);
  const [newFilter, setNewFilter] = useState("");

  useEffect(() => {
    chrome.storage.local.get(["enabled", "customFilters", "blockedAdsCount"], (data) => {
      setEnabled(data.enabled);
      setFilters(data.customFilters || []);
      setBlockedAds(data.blockedAdsCount || 0);
    });
  }, []);

  const toggleEnabled = () => {
    chrome.storage.local.set({ enabled: !enabled });
    setEnabled(!enabled);
  };

  const addFilter = () => {
    if (newFilter) {
      const updatedFilters = [...filters, newFilter];
      chrome.storage.local.set({ customFilters: updatedFilters });
      setFilters(updatedFilters);
      setNewFilter("");
    }
  };

  return (
    <div style={{ padding: "10px", width: "250px" }}>
      <h2>Ad Blocker</h2>
      <button onClick={toggleEnabled}>{enabled ? "Disable" : "Enable"}</button>
      <p>Blocked Ads: {blockedAds}</p>
      <h3>Custom Filters</h3>
      <ul>
        {filters.map((filter, index) => (
          <li key={index}>{filter}</li>
        ))}
      </ul>
      <input type="text" value={newFilter} onChange={(e) => setNewFilter(e.target.value)} />
      <button onClick={addFilter}>Add Filter</button>
    </div>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(<Popup />);