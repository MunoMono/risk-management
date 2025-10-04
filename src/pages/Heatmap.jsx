import React, { useEffect, useState } from "react";
import { Grid, Column, Loading } from "@carbon/react";
import ReactMarkdown from "react-markdown";
import "../styles/components/_carbon-markdown.scss";

export default function Heatmap() {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}docs/heatmap.md`)
      .then((res) => res.text())
      .then((text) => {
        setContent(text);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load heatmap.md:", err);
        setLoading(false);
      });
  }, []);
return (
  <Grid fullWidth className="heatmap-grid" style={{ marginTop: "2rem" }}>
    {/* Left column: Markdown */}
    <Column lg={8} md={6} sm={4}>
      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}>
          <Loading description="Loading content" withOverlay={false} small />
        </div>
      ) : (
        <div className="carbon-markdown">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      )}
    </Column>

    {/* Right column: SVG heat map */}
    <Column lg={8} md={6} sm={4}>
      <img
        src={`${import.meta.env.BASE_URL}heat_map.svg`}
        alt="Risk Heat Map"
        style={{
          width: "100%",
          height: "auto",
          borderRadius: "8px",
          marginTop: "1rem",
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          display: "block",
        }}
      />
    </Column>
  </Grid>
);
}