// import React from "react";

// const days = ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"];

// const format = (str) => {
//   let chars = str.split("");
//   if (chars.length === 4) {
//     return `${chars[0]}${chars[1]}:${chars[2]}${chars[3]}`;
//   } else {
//     return `${chars[0]}:${chars[1]}${chars[2]}  `;
//   }
// };

// const BusinessInfo = ({ hours }) => {
//   return hours.map((day, i) => {
//     return (
//       <div key={i} style={{ display: "flex", justifyContent: "space-between" }}>
//         <div>
//           <span style={{ fontWeight: "bold" }}>{days[i]}</span>
//         </div>
//         <div style={{ marginLeft: "15px" }}>
//           <div>
//             <span>{format(day.start)}am</span> -{" "}
//             <span>{format((parseInt(day.end) - 1200).toString())}pm</span>
//           </div>
//         </div>
//       </div>
//     );
//   });
// };

// export default BusinessInfo;
