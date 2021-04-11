//https://www.pluralsight.com/guides/load-and-render-json-data-into-react-components

import {noodleData} from "./noodleData.js";

export const Noodles = () => {
    return (
        <>
            <div className="noodle-container">
                {noodleData.map((data, key) => {                    
                    return (
                        <Noodle
                            key={key}
                            noodleTitle={data.noodleTitle}
                            noodlerName={data.noodlerName}
                            noodleDescription={data.noodleDescription}
                            noodleTags={data.noodleTags}
                        />
                    );
                })}
            </div>
        </>
    );
};

const Noodle = ({noodleTitle, noodlerName, noodleDescription, noodleTags}) => {
    return (
        <div>
            <p>Title: {noodleTitle}</p>
            <p>Organizer: {noodlerName}</p>
            <p>Description: {noodleDescription}</p>
            <p>Tags: {noodleTags}</p>
        </div>
    );
};