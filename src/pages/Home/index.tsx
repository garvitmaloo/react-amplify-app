import React from "react";
import { Typography, Box } from "@mui/material";
import { generateClient } from "aws-amplify/data";
import { uploadData, getUrl } from "aws-amplify/storage";

import useAppSelector from "../../hooks/useAppSelector";
import NewPolaroidForm from "../../components/NewPolaroidForm";
import { PolaroidDTO, type PolaroidData } from "../../types";
import { type Schema } from "../../../amplify/data/resource";
import Polaroid from "../../components/Polaroid";
import SimpleSnackbar from "../../components/Snackbar";

const styles = {
  newPolaroidContainer: {
    padding: 2,
    marginY: 0,
  },
};

const client = generateClient<Schema>();

const Home: React.FC = () => {
  const [polaroidData, setPolaroidData] = React.useState<unknown>([]);
  const [snackBar, setSnackBar] = React.useState({ show: false, message: "" });
  const { isSignedIn } = useAppSelector((state) => state.auth);

  const fetchData = async () => {
    try {
      const { data, errors } = await client.models.Polaroid.list();

      if (errors && errors.length > 0) {
        throw new Error(errors[0].message);
      }

      setPolaroidData(data);
    } catch (error) {
      setSnackBar({
        message: `Failed to fetch data: ${error}`,
        show: true,
      });
    }
  };

  React.useEffect(() => {
    if (isSignedIn) {
      fetchData();
    }
  }, [isSignedIn]);

  const handleSubmitData = async (data: PolaroidData) => {
    const { title, date, file } = data;

    try {
      const { result } = uploadData({
        path: `polaroid_picture/${file!.name}`,
        data: file!,
        options: {
          contentType: file!.type,
          bucket: "Polaroid_Storage",
        },
      });

      const { path } = await result;

      const { url } = await getUrl({
        path,
      });

      const { data: response, errors } = await client.models.Polaroid.create({
        title,
        date,
        image: url.href,
      });

      if (errors) {
        throw new Error(errors[0].message);
      }

      if (response?.id) {
        fetchData();
      }
    } catch (error) {
      setSnackBar({
        show: true,
        message: `Failed to upload file: ${error}`,
      });
    }
  };
  const handleSnackBarClose = () => {
    setSnackBar({ show: false, message: "" });
  };

  return (
    <>
      {!isSignedIn && (
        <Typography variant='h4' sx={{ fontWeight: 600, textAlign: "center", marginTop: 25 }}>
          Login or create account to get started
        </Typography>
      )}

      {isSignedIn && (
        <>
          <NewPolaroidForm onSubmit={handleSubmitData} />

          <Box sx={{ ...styles.newPolaroidContainer, marginTop: 2 }}>
            {(polaroidData as PolaroidDTO[]).length === 0 && (
              <Typography sx={{ marginBottom: 1, fontWeight: 600 }} variant='h6'>
                No Polaroids.. Try adding a new one!
              </Typography>
            )}

            <Box sx={{ display: "flex", gap: "32px", flexWrap: "wrap" }}>
              {(polaroidData as PolaroidDTO[]).map((polaroid) => (
                <Polaroid
                  key={polaroid.id}
                  title={polaroid.title}
                  date={polaroid.date}
                  image={polaroid.image === "" ? "/preview-unavailable.webp" : polaroid.image}
                  id={polaroid.id}
                />
              ))}
            </Box>
          </Box>
        </>
      )}

      {snackBar.show && <SimpleSnackbar message={snackBar.message} onClose={handleSnackBarClose} />}
    </>
  );
};

export default Home;
