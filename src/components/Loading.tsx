import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

const Loading = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <CircularProgress size={70} thickness={5} value={100} color="warning" />
    </Box>
  );
};
export default Loading;
