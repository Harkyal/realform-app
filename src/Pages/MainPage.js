import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { Link, useParams } from "react-router-dom"
import './MainPage.css'

function MainPage() {
  const [postList, setPostList] = useState([]);
  const [Operator, setOperator] = useState({});
  const [Date1, setDate1] = useState(new Date());
  const [startdate, setStartdate] = useState(Date1.toISOString().slice(0, 10));
  const [enddate, setEnddate] = useState(Date1.toISOString().slice(0, 10));
  const [customer, setCustomer] = useState({});
  const [partInternalNo, setPartInternalNo] = useState({});
  let { postId } = useParams();
  const [operators, setoperators] = useState([]);
  const [Customers, setCustomers] = useState([]);
  const [part_dataset, setpart_dataset] = useState([]);



  useEffect(() => {
    var timer = setInterval(() => setDate1(new Date()), 10)
    return function cleanup() {
      clearInterval(timer)
    }
  });
  // Default Data 
  useEffect(() => {
    Axios.get(`http://localhost:3002/api/defaultData/${startdate}`).then((data) => {
      console.log(data)
      setPostList(data.data)
    });
  }, [])

  // to retreive morning operators
  useEffect(() => {
    Axios.get(`http://localhost:3002/api/get/Operators`).then((data) => {


      setoperators(data.data)
    });
  }, [])

  // to retreive customers
  useEffect(() => {
    Axios.get(`http://localhost:3002/api/get/Customers`).then((data) => {
      setCustomers(data.data)
    });
  }, [])


  // to retreive Machines
  useEffect(() => {
    Axios.get(`http://localhost:3002/api/get/part_dataset`).then((data) => {
      setpart_dataset(data.data)

    });
  }, [])


  // method to retrieve data combinely
  const search = () => {
    Axios.get(`http://localhost:3002/api/search/${JSON.stringify(Operator)},${startdate},${enddate},${JSON.stringify(customer)},${JSON.stringify(partInternalNo)}`).then((data) => {

      setPostList(data.data)
    })
  }
  return (
    <div className="MainPage">
      <div class="Container">
        <div class="row">

          <div class="col">
            {/* Grab the particular Operator name */}
            <input type='text' class="form-control form-rounded" placeholder='Operator' list="operators" onChange={(e) => {
              setOperator(e.target.value)
            }} onSelect={search} />
            <datalist id="operators">
              <option></option>
              {operators.map(x => {
                return <option>{x.Morning_Operators}</option>
              })}
            </datalist>


          </div>


          <div class="col">
            <div class="row">
              <div class="col">
                {/* Grab the particular dates */}
                <input type='date' class="form-control form-rounded" placeholder='Operator' defaultValue={Date1.toISOString().slice(0, 10)} onChange={(e) => {
                  setStartdate(e.target.value)
                }} onSelect={search} />
                {/*<button class="btn btn-success" onClick={dates}>Submit</button>*/}
              </div>
              <div class="col">

                <input type='date' class="form-control form-rounded" placeholder='Operator' defaultValue={Date1.toISOString().slice(0, 10)} onChange={(e) => {
                  setEnddate(e.target.value)
                }} onSelect={search} />

              </div>

            </div>
          </div>
          <div class="col">
            {/* Grab the particular Customer */}

            <input type='text' class="form-control form-rounded" placeholder='Customer' list='Customers' onChange={(e) => {
              setCustomer(e.target.value)
            }} onSelect={search} />
            <datalist id="Customers">
              <option></option>
              {Customers.map(x => {
                return <option>{x.Customers}</option>
              })}
            </datalist>



          </div>
          <div class="col">
            {/* Grab the particular partInternalNo */}
            <input type='text' class="form-control form-rounded" placeholder='Internal Part Number' list='InternalPartNo' onChange={(e) => {
              setPartInternalNo(e.target.value)
            }} onSelect={search} />
            <datalist id="InternalPartNo">
              <option></option>
              {part_dataset.map(x => {
                return <option>{x.Part_internalNo}</option>
              })}
            </datalist>


          </div>

        </div>
        <div>
          <Link to="/Morning">
            <button type='button' class="btn btn-success">
              <span class="glyphicon glyphicon-star" aria-hidden="true"></span> Back</button>
          </Link>
        </div>
        <div class="row" id="row1">
          <div class="col" id='show-data'>
            <h4>Date</h4>
          </div>
          <div class="col" id='show-data'>
            <h4> Operator</h4>
          </div>
          <div class="col-2" id='show-data'>
            <h4> Part Internal No</h4>
          </div>
          <div class="col" id='show-data'>
            <h4> Part No</h4>
          </div>
          <div class="col" id='show-data'>
            <h4> Customer</h4>
          </div>
          <div class="col-3" id='show-data'>
            <h4> Part Description</h4>
          </div>
          <div class="col" id='show-data'>
            <h4> Target</h4>
          </div>
          <div class="col" id='show-data'>
            <h4> Work Station</h4>
          </div>
          <div class="col" id='show-data'>
            <h4> Produced</h4>
          </div>
          <div class="col" id='show-data'>
            <h4> Scrap</h4>
          </div>
          <div class="col" id='show-data'>
            <h4> Operator2 (Optional)</h4>
          </div>
          <div class="col" id='show-data'>
            <h4> Supervisor Notes</h4>
          </div>

        </div>

        {postList.map((val, key) => {
          return (
            <div>

              <div class="row">
                <div class="col" id='show-data'>
                  {val.Date.slice(0, 10)}
                </div>
                <div class="col" id='show-data'>
                  {val.Operator}
                </div>
                <div class="col-2" id='show-data'>
                  {val.Part_internalNo}
                </div>
                <div class="col" id='show-data'>
                  {val.PartNo}
                </div>
                <div class="col" id='show-data'>
                  {val.Customer}
                </div>
                <div class="col-3" id='show-data'>
                  {val.Part_description}
                </div>
                <div class="col" id='show-data'>
                  {val.Target}
                </div>
                <div class="col" id='show-data'>
                  {val.work_station}
                </div>
                <div class="col" id='show-data'>
                  {val.Produced}
                </div>
                <div class="col" id='show-data'>
                  {val.Scrap}
                </div>
                <div class="col" id='show-data'>
                  {val.Operator_2}
                </div>
                <div class="col" id='show-data'>
                  {val.Supervisor_notes}
                </div>

              </div>
            </div >
          )
        })}

      </div>


    </div >
  )
}

export default MainPage;