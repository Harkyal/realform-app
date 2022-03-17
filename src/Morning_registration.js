import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { getUser, removeUserSession } from './Utils/Common';
import Name from './App.js';
import Axios from 'axios'
import './Registration.css';
//import js file as of table data

import Header from './Header';
import { Operators } from './Part_dataset';
import Night_registration from './Night_registration';

function Morning_registration(props) {
  const user = getUser();

  // declare all variables in order to send to js file
  var [Date1, setDate1] = useState(new Date());
  const [Date2, setDate2] = useState(Date1.toISOString().slice(0, 10));
  const [Selectdd1, setSelectdd1] = useState();
  const [Part_internalNo, setPart_internalNo] = useState({ Part_internalNo: {} });
  const [Customer, setCustomer] = useState({ Customer: [] });
  const [Operator, setOperator] = useState("");
  const [PartNo, setPartNo] = useState({ PartNo: {} });
  const [Part_description, setPart_description] = useState({ Part_description: {} });
  const [Scrap, setScrap] = useState("");
  const [Operator_2, setOperator_2] = useState("");
  const [Target, setTarget] = useState("");
  const [Produced, setProduced] = useState("");
  const [work_station, setwork_station] = useState("1");
  const [Supervisor_notes, setSupervisor_notes] = useState("");
  const [Morning_operators, setMorning_operators] = useState([]);
  const [Machine_list, setMachine_list] = useState([]);
  const [part_dataset, setpart_dataset] = useState([]);
  const [Night_operators, setNight_operators] = useState([]);
  const [Area, setArea] = useState("");

  // Hook to update the date as today's date
  useEffect(() => {
    var timer = setInterval(() => setDate1(new Date()), 10)
    return function cleanup() {
      clearInterval(timer)
    }
  });


  // to retreive morning operators
  useEffect(() => {
    Axios.get(`http://localhost:3002/api/get/MorningOperators`).then((data) => {

      setMorning_operators(data.data)
    });
  }, [])
  // to retreive Night operators
  useEffect(() => {
    Axios.get(`http://localhost:3002/api/get/NightOperators`).then((data) => {
      setNight_operators(data.data)
    });
  }, [])
  // to retreive Machines
  useEffect(() => {
    Axios.get(`http://localhost:3002/api/get/Machines`).then((data) => {
      setMachine_list(data.data)
    });
  }, [])
  // to retreive Machines
  useEffect(() => {
    Axios.get(`http://localhost:3002/api/get/part_dataset`).then((data) => {
      setpart_dataset(data.data)

    });
  }, [])
  var Noperators = () => {
    Axios.get(`http://localhost:3002/api/get/NightOperators`).then((data) => {
      setMorning_operators(data.data)

    });
  }
  // Retreive morning operators
  var Moperators = () => {
    Axios.get(`http://localhost:3002/api/get/MorningOperators`).then((data) => {
      setMorning_operators(data.data)
    });
  }
  // select rigid/flex or all parts
  const area = () => {

    if (Area == "Rigid") {
      Axios.get(`http://localhost:3002/api/get/Rigidpart_dataset`).then((data) => {
        setpart_dataset(data.data)
      });
      Axios.get(`http://localhost:3002/api/get/RigidMachines`).then((data) => {
        setMachine_list(data.data)
      });
    }
    if (Area == "Flex") {
      Axios.get(`http://localhost:3002/api/get/Flexpart_dataset`).then((data) => {
        setpart_dataset(data.data)
      });
      Axios.get(`http://localhost:3002/api/get/FlexMachines`).then((data) => {
        setMachine_list(data.data)
      });
    }
    if (Area == "Others") {
      Axios.get(`http://localhost:3002/api/get/part_dataset`).then((data) => {
        setpart_dataset(data.data)
      });
      Axios.get(`http://localhost:3002/api/get/Machines`).then((data) => {
        setMachine_list(data.data)
      });
    }
  }

  // Select machine list as per the Area 
  const MachineList = () => {
    console.log("MachineList");
  }
  // Method to set the value of Operator
  const submitValue2 = (e) => {
    setSelectdd1({ Selectdd1: e.target.value });
    setOperator({ Operator: Morning_operators.find((x) => x.Operator === e.target.value).Operator });
  }
  // method for finding the dependent values
  const submitValue = (e) => {
    setSelectdd1({ Selectdd1: e.target.value });
    setPart_internalNo({ Part_internalNo: e.target.value });
    //let InternalpartNo = Part_table.find((x) => x.Part_internalNo === e.target.value).Customer;
    //console.log(InternalpartNo);
    setCustomer({ Customer: (part_dataset.find((x) => x.Part_internalNo === e.target.value).Customer) });
    setPartNo({ PartNo: part_dataset.find((x) => x.Part_internalNo === e.target.value).PartNo });
    setPart_description({ Part_description: part_dataset.find((x) => x.Part_internalNo === e.target.value).Part_description });

  }

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');

    props.history.push('/');
  }

  const submitPost = () => {
    //declare variables to convert object to string
    var Customer_value = JSON.stringify(Customer.Customer);
    var Part_internalNo_value = JSON.stringify(Part_internalNo.Part_internalNo);
    var PartNo_value = JSON.stringify(PartNo.PartNo);
    var Part_Description_value = JSON.stringify(Part_description.Part_description);

    //console.log(Customer.Customer[0]);
    Axios.post('http://localhost:3002/api/create', { Date: Date2, Operator: Operator, Part_internalNo: JSON.parse(Part_internalNo_value), PartNo: JSON.parse(PartNo_value), Customer: JSON.parse(Customer_value), Part_description: JSON.parse(Part_Description_value), Target: Target, work_station: work_station, Produced: Produced, Scrap: Scrap, Supervisor_notes: Supervisor_notes, Operator_2: Operator_2 })
    window.location.reload(false);
  }
  return <div>

    <div className='user_Account'>
      Welcome {(user.name).replaceAll('"', '')}!<br /><br />
      <input type="button" class="btn btn-success" onClick={handleLogout} value="Logout" />
    </div>
    <div>
      <center>
        <h1>Morning shift</h1>
      </center>

      <div class="Container">
        <div class="row">
          <div class="col-3">
            <label><b>
              <h4> Select Shift</h4>
            </b></label><br />
            <div class="row">
              <div class="col-1">
                <input type="radio" name='shift' id='MorningcheckBox' defaultChecked onClick={Moperators} />
                {/*<input type="radio" id="Morning" name="Shift" value="Morning"  />*/}
              </div>
              <div class="col-5">
                <label for="html">Morning Shift</label>
              </div>
              <div class="col-1">
                <input type="radio" name='shift' id='Nights' onClick={Noperators} />
              </div>
              <div class="col-5">
                <label for="css">Night Shift</label>
              </div>

            </div>
          </div>

          <div class="col-2">
            <div class="row">
              <div class="col">
                <label><b>
                  <h4>Date</h4>
                </b></label>
                <input type="date" class="form-control form-rounded" placeholder="Date" name="Date" id='date' defaultValue={Date1.toISOString().slice(0, 10)} onChange={(e) => {
                  setDate2(e.target.value)
                }} required />

              </div>
            </div>
          </div>
        </div>
        <br /><br />

        <div class="row">
          <div class="col">
            <label><b>
              <h4>Operator</h4>
            </b></label>
            <input type="text" class="form-control form-rounded" value={submitValue2.Selectdd1} onChange={submitValue2.bind(this)}
              list="operatorList"
              id="operators" placeholder="Enter Operator" />
            <datalist id="operatorList">
              <option></option>
              {Morning_operators.map(x => {
                return <option>{x.Operators}</option>
              })}
            </datalist>
          </div>
          <div class="col">
            <label><b>
              <h4>Area</h4>
            </b></label>
            <select type="select" class="form-control form-rounded" id='Area' placeholder="Area" onClick={area} onChange={(e) => {
              setArea(e.target.value)
            }} name="area"
            >
              <option value="Others">Others</option>
              <option value="Flex">Flex</option>
              <option value="Rigid">Rigid</option>
            </select>
          </div>

          <div class="col-2">
            <label><b>
              <h4>Internal Part Number</h4>
            </b></label>
            <input type="text" class="form-control form-rounded" list="InternalPartNo"
              id="operator" defaultvalue={submitValue.Selectdd1} onChange={submitValue.bind(this)} placeholder="Enter Internal Part No" />
            <datalist id="InternalPartNo">
              <option></option>
              {part_dataset.map(x => {
                return <option>{x.Part_internalNo}</option>
              })}
            </datalist>
          </div>
          <div class="col" id='Hide'>
            <label><b>
              <h4>Customer</h4>
            </b></label>
            <input type="select" class="form-control form-rounded"
              value={Customer.Customer} placeholder="Enter Customer" required />

          </div>
          <div class="col" id='Hide' >
            <label><b>
              <h4>Part No.</h4>
            </b></label>
            <input type="text" class="form-control form-rounded"
              value={PartNo.PartNo} placeholder="Enter Part No" />
          </div>
          <div class="col" id='Hide'>
            <label><b>
              <h4>Part Description</h4>
            </b></label>
            <input type="select" class="form-control form-rounded" id="Part_description"
              value={Part_description.Part_description} placeholder="Enter Part Description" />

          </div>
          <div class="col-1">
            <label><b>
              <h4>Target</h4>
            </b></label>
            <input type="text" class="form-control form-rounded" id='Target' defaultValue="0" placeholder="Target" onChange={(e) => {
              setTarget(e.target.value)
            }} name="target" required />
          </div>

          <div class="col">
            <label><b>
              <h4>Work Station</h4>
            </b></label>
            <input class="form-control form-rounded" name="work_station" list="Work_station" placeholder='Work Station' onChange={(e) => {
              setwork_station(e.target.value)
            }} id="work_station" />
            <datalist id="Work_station">
              <option></option>
              {Machine_list.map(x => {
                return <option>{x.Machines}</option>
              })}

            </datalist>
          </div>
          <div class="col-1">
            <label><b>
              <h4>Produced</h4>
            </b></label>
            <input type="text" class="form-control form-rounded" id='Produced' defaultValue="0" placeholder="Produced" onChange={(e) => {
              setProduced(e.target.value)
            }} name="produced"
              required />
          </div>
          <div class="col-sm">
            <label><b>
              <h4>Scrap</h4>
            </b></label>
            <input type="text" class="form-control form-rounded" id='Scrap' placeholder="Scrap" defaultValue="0" onChange={(e) => {
              setScrap(e.target.value)
            }} name="scrap" required />
          </div>
          <div class="col-1">
            <label><b>
              <h4>Operator-2</h4>
            </b></label>
            <input type="text" class="form-control form-rounded" id='operator-2' list="operatorList" placeholder="Operator-2(Optional)" onChange={(e) => {
              setOperator_2(e.target.value)
            }} name="operator_2" required />
          </div>
          <div class="col-2" >
            <label><b>
              <h4>Supervisor Notes</h4>
            </b></label>

            <textarea type="text" class="textbox" id='Supervisor_notes' onChange={(e) => {
              setSupervisor_notes(e.target.value)
            }} name='Supervisor_notes' />
          </div>


        </div>
        <br /><br />
        <div class="row">

        </div>
        <center>
          <button type="button" class="btn btn-success" onClick={submitPost}> Submit </button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Link to="/RetrieveData">
            <button type="button" class="btn btn-success" >Read Table </button>


          </Link>
        </center>

      </div>


    </div>;

  </div >;
}

export default Morning_registration;







