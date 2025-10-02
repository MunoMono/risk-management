import React from "react";
import { Grid, Column } from "@carbon/react";

export default function Home() {
  return (
    <Grid fullWidth className="home-grid" style={{ marginTop: "4rem" }}>
      <Column lg={16} md={8} sm={4}>
        <h1>Welcome to the Risk Management App</h1>
        <p>
          This tool helps track academic, practice, ethics, and well-being
          risks within your research project.
        </p>
      </Column>
    </Grid>
  );
}
