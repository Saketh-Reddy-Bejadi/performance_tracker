import { IoMdMore } from "react-icons/io";

const Attributes = ({ showDetails, setShowDetails }) => {
  return (
    <>
      <thead className="sticky top-0 whitespace-nowrap bg-black text-lgz-1000">
        <tr>
          <th
            rowSpan={`${showDetails ? "2" : ""}`}
            className="border border-zinc-800"
          >
            <IoMdMore
              className="w-full m-auto"
              size={30}
              onClick={() => setShowDetails(!showDetails)}
            />
          </th>
          <th rowSpan={`${showDetails ? "2" : ""}`} className=" px-4 py-5">
            Roll Number
          </th>
          <th colSpan={`${showDetails ? "3" : ""}`} className=" px-4 py-5">
            Codeforces
          </th>
          <th colSpan={`${showDetails ? "4" : ""}`} className=" px-4 py-5">
            GFG
          </th>
          <th colSpan={`${showDetails ? "3" : ""}`} className=" px-4 py-5">
            Leetcode
          </th>
          <th colSpan={`${showDetails ? "3" : ""}`} className=" px-4 py-5">
            Codechef
          </th>
          <th colSpan={`${showDetails ? "3" : ""}`} className=" px-4 py-5">
            HackerRank
          </th>
          <th rowSpan={`${showDetails ? "2" : ""}`} className=" px-4 py-5">
            Percentile
          </th>
        </tr>
        {
          showDetails ? (
            <tr>
              <th className=" px-20 py-4">Handle</th>
              <th className=" px-5 ">Rating</th>
              <th className=" px-5 ">Total</th>
              <th className=" px-20 ">Handle</th>
              <th className=" px-5 ">Contest Score</th>
              <th className=" px-5 ">Practice Score</th>
              <th className=" px-5 ">Total</th>
              <th className=" px-20 ">Handle</th>
              <th className=" px-5 ">Rating</th>
              <th className=" px-5 ">Total</th>
              <th className=" px-20 ">Handle</th>
              <th className=" px-5 ">Practice Score</th>
              <th className=" px-5 ">Total</th>
              <th className=" px-20 ">Handle</th>
              <th className=" px-5 ">Practice Score</th>
              <th className=" px-5 ">Total</th>
            </tr>
          ) : null
          // (<tr>
          //   <th className="border border-zinc-800 px-4 py-5">Total Score</th>
          //   <th className="border border-zinc-800 px-4 py-5">Total Score</th>
          //   <th className="border border-zinc-800 px-4 py-5">Total Score</th>
          //   <th className="border border-zinc-800 px-4 py-5">Total Score</th>
          //   <th className="border border-zinc-800 px-4 py-5">Total Score</th>
          // </tr>)
        }
      </thead>
    </>
  );
};
export default Attributes;
