import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { getUser, removeUserSession } from './Utils/Common';
import Name from './App.js';
import Axios from 'axios'
import './Registration.css';
//import js file as of table data
function Morning_registration(props) {

  const user = getUser();

  // declare all variables in order to send to js file
  var [shift, setShift] = useState("Morning Shift");
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

  const [Part_internalNo1, setPart_internalNo1] = useState({ Part_internalNo: {} });
  const [Customer1, setCustomer1] = useState({ Customer: [] });
  const [Operator1, setOperator1] = useState("");
  const [PartNo1, setPartNo1] = useState({ PartNo: {} });
  const [Part_description1, setPart_description1] = useState({ Part_description: {} });
  const [Scrap1, setScrap1] = useState("");
  const [Operator_21, setOperator_21] = useState("");
  const [Target1, setTarget1] = useState("");
  const [Produced1, setProduced1] = useState("");
  const [work_station1, setwork_station1] = useState("1");
  const [Supervisor_notes1, setSupervisor_notes1] = useState("");

  const [Part_internalNo2, setPart_internalNo2] = useState({ Part_internalNo: {} });
  const [Customer2, setCustomer2] = useState({ Customer: [] });
  const [Operator2, setOperator2] = useState("");
  const [PartNo2, setPartNo2] = useState({ PartNo: {} });
  const [Part_description2, setPart_description2] = useState({ Part_description: {} });
  const [Scrap2, setScrap2] = useState("");
  const [Operator_22, setOperator_22] = useState("");
  const [Target2, setTarget2] = useState("");
  const [Produced2, setProduced2] = useState("");
  const [work_station2, setwork_station2] = useState("2");
  const [Supervisor_notes2, setSupervisor_notes2] = useState("");

  const [Part_internalNo3, setPart_internalNo3] = useState({ Part_internalNo: {} });
  const [Customer3, setCustomer3] = useState({ Customer: [] });
  const [Operator3, setOperator3] = useState("");
  const [PartNo3, setPartNo3] = useState({ PartNo: {} });
  const [Part_description3, setPart_description3] = useState({ Part_description: {} });
  const [Scrap3, setScrap3] = useState("");
  const [Operator_23, setOperator_23] = useState("");
  const [Target3, setTarget3] = useState("");
  const [Produced3, setProduced3] = useState("");
  const [work_station3, setwork_station3] = useState("3");
  const [Supervisor_notes3, setSupervisor_notes3] = useState("");

  const [Part_internalNo4, setPart_internalNo4] = useState({ Part_internalNo: {} });
  const [Customer4, setCustomer4] = useState({ Customer: [] });
  const [Operator4, setOperator4] = useState("");
  const [PartNo4, setPartNo4] = useState({ PartNo: {} });
  const [Part_description4, setPart_description4] = useState({ Part_description: {} });
  const [Scrap4, setScrap4] = useState("");
  const [Operator_24, setOperator_24] = useState("");
  const [Target4, setTarget4] = useState("");
  const [Produced4, setProduced4] = useState("");
  const [work_station4, setwork_station4] = useState("4");
  const [Supervisor_notes4, setSupervisor_notes4] = useState("");

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
      setShift("Night Shift")

    });
  }
  // Retreive morning operators
  var Moperators = () => {
    Axios.get(`http://localhost:3002/api/get/MorningOperators`).then((data) => {
      setMorning_operators(data.data)
      setShift("Morning Shift")
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
    setOperator({ Operator: Morning_operators.find((x) => x.Operators === e.target.value).Operators });
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
  const submitValue1 = (e) => {
    setSelectdd1({ Selectdd1: e.target.value });
    setPart_internalNo1({ Part_internalNo: e.target.value });
    //let InternalpartNo = Part_table.find((x) => x.Part_internalNo === e.target.value).Customer;
    //console.log(InternalpartNo);
    setCustomer1({ Customer: (part_dataset.find((x) => x.Part_internalNo === e.target.value).Customer) });
    setPartNo1({ PartNo: part_dataset.find((x) => x.Part_internalNo === e.target.value).PartNo });
    setPart_description1({ Part_description: part_dataset.find((x) => x.Part_internalNo === e.target.value).Part_description });

  }

  const submitValue5 = (e) => {
    setSelectdd1({ Selectdd1: e.target.value });
    setPart_internalNo2({ Part_internalNo: e.target.value });
    //let InternalpartNo = Part_table.find((x) => x.Part_internalNo === e.target.value).Customer;
    //console.log(InternalpartNo);
    setCustomer2({ Customer: (part_dataset.find((x) => x.Part_internalNo === e.target.value).Customer) });
    setPartNo2({ PartNo: part_dataset.find((x) => x.Part_internalNo === e.target.value).PartNo });
    setPart_description2({ Part_description: part_dataset.find((x) => x.Part_internalNo === e.target.value).Part_description });

  }

  const submitValue3 = (e) => {
    setSelectdd1({ Selectdd1: e.target.value });
    setPart_internalNo3({ Part_internalNo: e.target.value });
    //let InternalpartNo = Part_table.find((x) => x.Part_internalNo === e.target.value).Customer;
    //console.log(InternalpartNo);
    setCustomer3({ Customer: (part_dataset.find((x) => x.Part_internalNo === e.target.value).Customer) });
    setPartNo3({ PartNo: part_dataset.find((x) => x.Part_internalNo === e.target.value).PartNo });
    setPart_description3({ Part_description: part_dataset.find((x) => x.Part_internalNo === e.target.value).Part_description });

  }

  const submitValue4 = (e) => {
    setSelectdd1({ Selectdd1: e.target.value });
    setPart_internalNo4({ Part_internalNo: e.target.value });
    //let InternalpartNo = Part_table.find((x) => x.Part_internalNo === e.target.value).Customer;
    //console.log(InternalpartNo);
    setCustomer4({ Customer: (part_dataset.find((x) => x.Part_internalNo === e.target.value).Customer) });
    setPartNo4({ PartNo: part_dataset.find((x) => x.Part_internalNo === e.target.value).PartNo });
    setPart_description4({ Part_description: part_dataset.find((x) => x.Part_internalNo === e.target.value).Part_description });

  }

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    props.history.push('/');
  }

  const submitPost = () => {
    //declare variables to convert object to string
    var User_name = (user.name).replaceAll('"', '');

    var Customer_value = JSON.stringify(Customer.Customer);
    var Part_internalNo_value = JSON.stringify(Part_internalNo.Part_internalNo);
    var PartNo_value = JSON.stringify(PartNo.PartNo);
    var Part_Description_value = JSON.stringify(Part_description.Part_description);

    var Customer_value1 = JSON.stringify(Customer1.Customer);
    var Part_internalNo_value1 = JSON.stringify(Part_internalNo1.Part_internalNo);
    var PartNo_value1 = JSON.stringify(PartNo1.PartNo);
    var Part_Description_value1 = JSON.stringify(Part_description1.Part_description);

    var Customer_value2 = JSON.stringify(Customer2.Customer);
    var Part_internalNo_value2 = JSON.stringify(Part_internalNo2.Part_internalNo);
    var PartNo_value2 = JSON.stringify(PartNo2.PartNo);
    var Part_Description_value2 = JSON.stringify(Part_description2.Part_description);

    var Customer_value3 = JSON.stringify(Customer3.Customer);
    var Part_internalNo_value3 = JSON.stringify(Part_internalNo3.Part_internalNo);
    var PartNo_value3 = JSON.stringify(PartNo3.PartNo);
    var Part_Description_value3 = JSON.stringify(Part_description3.Part_description);

    var Customer_value4 = JSON.stringify(Customer4.Customer);
    var Part_internalNo_value4 = JSON.stringify(Part_internalNo4.Part_internalNo);
    var PartNo_value4 = JSON.stringify(PartNo4.PartNo);
    var Part_Description_value4 = JSON.stringify(Part_description4.Part_description);

    const data2 = [Date2, Operator1, JSON.parse(Part_internalNo_value1), JSON.parse(PartNo_value1), JSON.parse(Customer_value1), JSON.parse(Part_Description_value1), Target1, work_station1, Produced1, Scrap1, Supervisor_notes1, Operator_21]

    const data3 = [Date2, Operator2, JSON.parse(Part_internalNo_value2), JSON.parse(PartNo_value2), JSON.parse(Customer_value2), JSON.parse(Part_Description_value2), Target2, work_station2, Produced2, Scrap2, Supervisor_notes2, Operator_22]

    const data4 = [Date2, Operator3, JSON.parse(Part_internalNo_value3), JSON.parse(PartNo_value3), JSON.parse(Customer_value3), JSON.parse(Part_Description_value3), Target3, work_station3, Produced3, Scrap3, Supervisor_notes3, Operator_23]

    const data5 = [Date2, Operator4, JSON.parse(Part_internalNo_value4), JSON.parse(PartNo_value4), JSON.parse(Customer_value4), JSON.parse(Part_Description_value4), Target4, work_station4, Produced4, Scrap4, Supervisor_notes4, Operator_24]



    //console.log(Customer.Customer[0]);
    Axios.post('http://localhost:3002/api/create', { Date: Date2, Operator: Operator, Part_internalNo: JSON.parse(Part_internalNo_value), PartNo: JSON.parse(PartNo_value), Customer: JSON.parse(Customer_value), Part_description: JSON.parse(Part_Description_value), Target: Target, work_station: work_station, Produced: Produced, Scrap: Scrap, Supervisor_notes: Supervisor_notes, Operator_2: Operator_2, data2, data3, data4, data5, User_name })
    window.location.reload(false);
  }
  return <div>


    <div>
      <div class="Container">
        <div class="row">
          <div class="col-3">
            <label><b>
              <h4> Select Shift</h4>
            </b></label>
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
          <div class="col-6">
            <div className='user_Account'>
              Welcome {(user.name).replaceAll('"', '')}!&nbsp;&nbsp;&nbsp;&nbsp;
              <input type="button" class="btn btn-success" onClick={handleLogout} value="Logout" />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <label><b>
              <h4>Operator</h4>
            </b></label>
            <input type="text" class="form-control form-rounded" onChange={(e) => {
              setOperator(e.target.value)
            }}
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
            <select type="select" class="form-control form-rounded" id='Area' placeholder="Area" onChange={(e) => {
              setArea(e.target.value)
            }} onClick={area} onKeyDown={area} onKeyDown={area} name="area"
            > <option value="Others">Others</option>
              <option value="Flex">Flex</option>
              <option value="Rigid">Rigid</option>
            </select>
          </div>

          <div class="col-2">
            <label><b>
              <h4>Internal Part Number</h4>
            </b></label>
            <input class="form-control form-rounded" list="InternalPartNo"
              id="operator" defaultvalue={submitValue.Selectdd1} onChange={submitValue.bind(this)} placeholder="Enter Internal Part No" />
            <div class="scrollbar">
              <datalist >
                <option></option>
                {part_dataset.map(x => {
                  return <option >{x.Part_internalNo}</option>
                })}
              </datalist>

            </div>

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
        <div class="row">
          <div class="col">
            <label><b>
              <h4>Operator</h4>
            </b></label>
            <input type="text" class="form-control form-rounded" onChange={(e) => {
              setOperator1(e.target.value)
            }}
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
            <select type="select" class="form-control form-rounded" id='Area' placeholder="Area" onClick={area} onKeyDown={area} onChange={(e) => {
              setArea(e.target.value)
            }} onTouchMove={area} name="area"
            > <option value="Others">Others</option>
              <option value="Flex">Flex</option>
              <option value="Rigid">Rigid</option>
            </select>
          </div>

          <div class="col-2">
            <label><b>
              <h4>Internal Part Number</h4>
            </b></label>
            <input type="dropdown" class="form-control form-rounded" list="InternalPartNo" onScroll={submitValue.bind(this)}
              id="operator" defaultvalue={submitValue.Selectdd1} onChange={submitValue1.bind(this)} placeholder="Enter Internal Part No" />
            <div class="scrollbar">
              <datalist id="InternalPartNo">
                <option></option>
                {part_dataset.map(x => {
                  return <option>{x.Part_internalNo}</option>
                })}
              </datalist>

            </div>

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
              setTarget1(e.target.value)
            }} name="target" required />
          </div>

          <div class="col">
            <label><b>
              <h4>Work Station</h4>
            </b></label>
            <input class="form-control form-rounded" name="work_station" list="Work_station" placeholder='Work Station' onChange={(e) => {
              setwork_station1(e.target.value)
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
              setProduced1(e.target.value)
            }} name="produced"
              required />
          </div>
          <div class="col-sm">
            <label><b>
              <h4>Scrap</h4>
            </b></label>
            <input type="text" class="form-control form-rounded" id='Scrap' placeholder="Scrap" defaultValue="0" onChange={(e) => {
              setScrap1(e.target.value)
            }} name="scrap" required />
          </div>
          <div class="col-1">
            <label><b>
              <h4>Operator-2</h4>
            </b></label>
            <input type="text" class="form-control form-rounded" id='operator-2' list="operatorList" placeholder="Operator-2(Optional)" onChange={(e) => {
              setOperator_21(e.target.value)
            }} name="operator_2" required />
          </div>
          <div class="col-2" >
            <label><b>
              <h4>Supervisor Notes</h4>
            </b></label>

            <textarea type="text" class="textbox" id='Supervisor_notes' onChange={(e) => {
              setSupervisor_notes1(e.target.value)
            }} name='Supervisor_notes' />
          </div>


        </div>
        <div class="row">
          <div class="col">
            <label><b>
              <h4>Operator</h4>
            </b></label>
            <input type="text" class="form-control form-rounded" onChange={(e) => {
              setOperator2(e.target.value)
            }}
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
            <select type="select" class="form-control form-rounded" id='Area' placeholder="Area" onClick={area} onKeyDown={area} onChange={(e) => {
              setArea(e.target.value)
            }} onTouchMove={area} name="area"
            > <option value="Others">Others</option>
              <option value="Flex">Flex</option>
              <option value="Rigid">Rigid</option>
            </select>
          </div>

          <div class="col-2">
            <label><b>
              <h4>Internal Part Number</h4>
            </b></label>
            <input type="dropdown" class="form-control form-rounded" list="InternalPartNo" onScroll={submitValue.bind(this)}
              id="operator" defaultvalue={submitValue.Selectdd1} onChange={submitValue5.bind(this)} placeholder="Enter Internal Part No" />
            <div class="scrollbar">
              <datalist id="InternalPartNo">
                <option></option>
                {part_dataset.map(x => {
                  return <option>{x.Part_internalNo}</option>
                })}
              </datalist>

            </div>

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
              setTarget2(e.target.value)
            }} name="target" required />
          </div>

          <div class="col">
            <label><b>
              <h4>Work Station</h4>
            </b></label>
            <input class="form-control form-rounded" name="work_station" list="Work_station" placeholder='Work Station' onChange={(e) => {
              setwork_station2(e.target.value)
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
              setProduced2(e.target.value)
            }} name="produced"
              required />
          </div>
          <div class="col-sm">
            <label><b>
              <h4>Scrap</h4>
            </b></label>
            <input type="text" class="form-control form-rounded" id='Scrap' placeholder="Scrap" defaultValue="0" onChange={(e) => {
              setScrap2(e.target.value)
            }} name="scrap" required />
          </div>
          <div class="col-1">
            <label><b>
              <h4>Operator-2</h4>
            </b></label>
            <input type="text" class="form-control form-rounded" id='operator-2' list="operatorList" placeholder="Operator-2(Optional)" onChange={(e) => {
              setOperator_22(e.target.value)
            }} name="operator_2" required />
          </div>
          <div class="col-2" >
            <label><b>
              <h4>Supervisor Notes</h4>
            </b></label>

            <textarea type="text" class="textbox" id='Supervisor_notes' onChange={(e) => {
              setSupervisor_notes2(e.target.value)
            }} name='Supervisor_notes' />
          </div>
        </div>
        <div class="row">
          <div class="col">
            <label><b>
              <h4>Operator</h4>
            </b></label>
            <input type="text" class="form-control form-rounded" onChange={(e) => {
              setOperator3(e.target.value)
            }}
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
            <select type="select" class="form-control form-rounded" id='Area' placeholder="Area" onClick={area} onKeyDown={area} onChange={(e) => {
              setArea(e.target.value)
            }} onTouchMove={area} name="area"
            > <option value="Others">Others</option>
              <option value="Flex">Flex</option>
              <option value="Rigid">Rigid</option>
            </select>
          </div>

          <div class="col-2">
            <label><b>
              <h4>Internal Part Number</h4>
            </b></label>
            <input type="dropdown" class="form-control form-rounded" list="InternalPartNo" onScroll={submitValue.bind(this)}
              id="operator" defaultvalue={submitValue.Selectdd1} onChange={submitValue3.bind(this)} placeholder="Enter Internal Part No" />
            <div class="scrollbar">
              <datalist id="InternalPartNo">
                <option></option>
                {part_dataset.map(x => {
                  return <option>{x.Part_internalNo}</option>
                })}
              </datalist>

            </div>

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
              setTarget3(e.target.value)
            }} name="target" required />
          </div>

          <div class="col">
            <label><b>
              <h4>Work Station</h4>
            </b></label>
            <input class="form-control form-rounded" name="work_station" list="Work_station" placeholder='Work Station' onChange={(e) => {
              setwork_station3(e.target.value)
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
              setProduced3(e.target.value)
            }} name="produced"
              required />
          </div>
          <div class="col-sm">
            <label><b>
              <h4>Scrap</h4>
            </b></label>
            <input type="text" class="form-control form-rounded" id='Scrap' placeholder="Scrap" defaultValue="0" onChange={(e) => {
              setScrap3(e.target.value)
            }} name="scrap" required />
          </div>
          <div class="col-1">
            <label><b>
              <h4>Operator-2</h4>
            </b></label>
            <input type="text" class="form-control form-rounded" id='operator-2' list="operatorList" placeholder="Operator-2(Optional)" onChange={(e) => {
              setOperator_23(e.target.value)
            }} name="operator_2" required />
          </div>
          <div class="col-2" >
            <label><b>
              <h4>Supervisor Notes</h4>
            </b></label>

            <textarea type="text" class="textbox" id='Supervisor_notes' onChange={(e) => {
              setSupervisor_notes3(e.target.value)
            }} name='Supervisor_notes' />
          </div>
        </div>
        <div class="row">
          <div class="col">
            <label><b>
              <h4>Operator</h4>
            </b></label>
            <input type="text" class="form-control form-rounded" onChange={(e) => {
              setOperator4(e.target.value)
            }}
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
            <select type="select" class="form-control form-rounded" id='Area' placeholder="Area" onClick={area} onKeyDown={area} onChange={(e) => {
              setArea(e.target.value)
            }} onTouchMove={area} name="area"
            > <option value="Others">Others</option>
              <option value="Flex">Flex</option>
              <option value="Rigid">Rigid</option>
            </select>
          </div>

          <div class="col-2">
            <label><b>
              <h4>Internal Part Number</h4>
            </b></label>
            <input type="dropdown" class="form-control form-rounded" list="InternalPartNo" onScroll={submitValue.bind(this)}
              id="operator" defaultvalue={submitValue.Selectdd1} onChange={submitValue4.bind(this)} placeholder="Enter Internal Part No" />
            <div class="scrollbar">
              <datalist id="InternalPartNo">
                <option></option>
                {part_dataset.map(x => {
                  return <option>{x.Part_internalNo}</option>
                })}
              </datalist>

            </div>

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
              setTarget4(e.target.value)
            }} name="target" required />
          </div>

          <div class="col">
            <label><b>
              <h4>Work Station</h4>
            </b></label>
            <input class="form-control form-rounded" name="work_station" list="Work_station" placeholder='Work Station' onChange={(e) => {
              setwork_station4(e.target.value)
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
              setProduced4(e.target.value)
            }} name="produced"
              required />
          </div>
          <div class="col-sm">
            <label><b>
              <h4>Scrap</h4>
            </b></label>
            <input type="text" class="form-control form-rounded" id='Scrap' placeholder="Scrap" defaultValue="0" onChange={(e) => {
              setScrap4(e.target.value)
            }} name="scrap" required />
          </div>
          <div class="col-1">
            <label><b>
              <h4>Operator-2</h4>
            </b></label>
            <input type="text" class="form-control form-rounded" id='operator-2' list="operatorList" placeholder="Operator-2(Optional)" onChange={(e) => {
              setOperator_24(e.target.value)
            }} name="operator_2" required />
          </div>
          <div class="col-2" >
            <label><b>
              <h4>Supervisor Notes</h4>
            </b></label>

            <textarea type="text" class="textbox" id='Supervisor_notes' onChange={(e) => {
              setSupervisor_notes4(e.target.value)
            }} name='Supervisor_notes' />
          </div>


        </div>

        <div class="button">
          <button type="button" class="btn btn-success" onClick={submitPost}> Submit </button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Link to="/RetrieveData">
            <button type="button" class="btn btn-success" >Read Table </button>


          </Link>
        </div>



      </div>


    </div>;

  </div >;
}

export default Morning_registration;







