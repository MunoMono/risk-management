// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import { Grid, Column, Loading } from "@carbon/react";
import ReactMarkdown from "react-markdown";
import "../styles/components/_carbon-markdown.scss";

export default function Home() {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}docs/home.md`)
      .then((res) => res.text())
      .then((text) => {
        setContent(text);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load home.md:", err);
        setLoading(false);
      });
  }, []);

  return (
    <Grid fullWidth className="home-grid" style={{ marginTop: "4rem" }}>
      <Column lg={16} md={8} sm={4}>
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
    </Grid>
  );
}
