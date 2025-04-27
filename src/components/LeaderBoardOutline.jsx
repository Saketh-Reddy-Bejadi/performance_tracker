import { useState } from "react";
import Attributes from "./Attributes";
import StudentData from "./StudentData";
import { DATA_2026 } from "../../data/studentData";

const LeaderBoardOutline = () => {
  const [showDetails, setShowDetails] = useState(true);

  return (
    <>
      <div className="overflow-hidden">
        <div className="max-h-screen text-black overflow-y-auto border border-zinc-800">
        <table className="min-w-full table-auto border border-zinc-800 text-white">
          <Attributes
            showDetails={showDetails}
            setShowDetails={setShowDetails}
          />
          <StudentData data={DATA_2026}  showDetails={showDetails}
            setShowDetails={setShowDetails} />
        </table>
        </div>
      </div>
    </>
  );
};
export default LeaderBoardOutline;
