import React from "react";
import { Box, Typography } from "@mui/material";

import { PolaroidComponent } from "../types";

const styles = {
  polaroidContainer: {
    maxWidth: "360px",
    height: "520px",
    border: "1px solid #e9ecef",
    borderRadius: "4px",
    backgroundColor: "#fdfdfd",
    color: "#333",
    padding: "16px",
    display: "flex",
    flexDirection: "column",
  },
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
    <Box sx={styles.polaroidContainer}>
      <img
        src={image}
        alt='Polaroid'
        style={{ ...styles.image, objectFit: "cover" }}
        height={400}
      />

      <Box>
        <Typography sx={styles.polaroidTitle}>{title}</Typography>

        <Typography>
          {new Date(date).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </Typography>
      </Box>
    </Box>
  );
};

export default Polaroid;
