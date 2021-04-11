//https://www.pluralsight.com/guides/load-and-render-json-data-into-react-components

// Get local JSON file
import {noodleData} from "./noodleData.js";

// export const Noodles = () => {
//     return (
//         <>
//             <div className="noodle-container">
//                 {noodleData.map((data, key) => {                    
//                     return (
//                         <Noodle
//                             key={key}
//                             noodleTitle={data.noodleTitle}
//                             noodlerName={data.noodlerName}
//                             noodleDescription={data.noodleDescription}
//                             noodleTags={data.noodleTags}
//                         />
//                     );
//                 })}
//             </div>
//         </>
//     );
// };

// const Noodle = ({noodleTitle, noodlerName, noodleDescription, noodleTags}) => {
//     return (
//         <div>
//             <p>Title: {noodleTitle}</p>
//             <p>Organizer: {noodlerName}</p>
//             <p>Description: {noodleDescription}</p>
//             <p>Tags: {noodleTags}</p>
//         </div>
//     );
// };

//https://www.pluralsight.com/guides/convert-a-json-file-to-an-array-in-react

import React from 'react';

class Noodles extends React.Component {
    render() {
        return(
            <div class="noodle_list">
                {/* Mapping array of objects */}
                {noodleData.map ((item, i) => (
                    <div class="noodle">
                        <p>Title: {item.noodleTitle}</p>
                        <p>Organizer: {item.noodlerName}</p>
                        <p>Description: {item.noodleDescription}</p>
                        <p>Tags: {item.noodleTags}</p>
                    </div>
                ))}
            </div>
        );
    }
}

export default Noodles;
