import React from 'react';

let Search = (props) => {
    return (
        <div className="search">
            <input type="text" value={props.search} onChange={(e) => {
                props.searchSwitch(e.currentTarget.value);
                props.onChangeSearch(e.currentTarget.value);
            }} />
        </div>
    );
}

export default Search;