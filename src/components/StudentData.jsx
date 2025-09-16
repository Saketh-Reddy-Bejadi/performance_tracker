import React from "react";
import StudentDataRow from "./StudentDataRow";

const StudentData = ({ data, showDetails }) => {
  return (
    <>
      <tbody>
        {data.map((row, index) => {
          return (
            <StudentDataRow key={index} row={row} showDetails={showDetails} />
          );
        })}
      </tbody>
    </>
  );
};

export default StudentData;
