import React, { useState, useEffect } from 'react'
import Axios from 'axios'
const [postList, setPostList] = useState([]);

function CascadingDropdown() {
  // Default Data 
  useEffect(() => {
    Axios.get(`http://localhost:3002/api/get`).then((data) => {
      setPostList(data)
    });
  }, [])
  console.log(postList);
  return <div>
    <p>hgc</p>
  </div>
}


export const dataset = postList;
console.log("Dataset");
console.log(dataset);

export default CascadingDropdown;