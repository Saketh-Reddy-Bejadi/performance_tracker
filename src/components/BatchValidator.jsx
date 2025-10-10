import { useParams } from "react-router-dom";
import NotFound from "./NotFound";

const BatchValidator = ({ children }) => {
  const { batch } = useParams();
  const validBatches = ["2026", "2027"];
  
  if (!validBatches.includes(batch)) {
    return <NotFound />;
  }
  
  return children;
};

export default BatchValidator;