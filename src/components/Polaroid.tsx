import React from "react";
import { Typography } from "@mui/material";

import { PolaroidComponent } from "../types";

const styles = {
  image: {
    width: "100%",
    height: "400px",
    aspectRatio: "1/1",
    marginBottom: "24px",
  },
  polaroidTitle: { fontSize: "24px", fontWeight: 600 },
};

const Polaroid: React.FC<PolaroidComponent> = ({ title, date, image }) => {
  return (
    <div
      style={{
        maxWidth: "360px",
        height: "520px",
        border: "1px solid #e9ecef",
        borderRadius: "4px",
        backgroundColor: "#fdfdfd",
        color: "#333",
        padding: "16px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <img
        src={image}
        alt='Polaroid'
        style={{ ...styles.image, objectFit: "cover" }}
        height={400}
      />

      <div>
        <Typography sx={styles.polaroidTitle}>{title}</Typography>

        <Typography>
          {new Date(date).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </Typography>
      </div>
    </div>
  );
};

export default Polaroid;
