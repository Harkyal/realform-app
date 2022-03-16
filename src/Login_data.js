import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { Username, Password } from './Login';

import { useHistory } from 'react-router-dom'

function Login_data() {
  const [postList, setPostList] = useState([]);

  let history = useHistory();

  useEffect(() => {
    Axios.get("http://localhost:3002/api/login").then((data) => {
      console.log(data)
      setPostList(data.data)
    });
  }, [])
  {
    postList.map((val, key) => {
      return <div>
        <h1>{val.Name}
        </h1>

      </div>;
    })
  }
}

export default Login_data;
