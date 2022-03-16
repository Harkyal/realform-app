import React, { useState, useEffect } from 'react';
import Axios from 'axios'
import '../App.css'

function CreatePost() {
  // declare all variables in order to send to js file
  var [Date1, setDate1] = useState(new Date());
  const [Selectdd1, setSelectdd1] = useState();
  const [Part_internalNo, setPart_internalNo] = useState({ Part_internalNo: {} });
  const [Customer, setCustomer] = useState({ Customer: [] });
  const [Operator, setOperator] = useState({ Operator: [] });
  const [PartNo, setPartNo] = useState({ PartNo: {} });
  const [Part_description, setPart_description] = useState({ Part_description: {} });

  const [Scrap, setScrap] = useState("");
  const [Target, setTarget] = useState("");
  const [Produced, setProduced] = useState("");
  const [Comments, setComments] = useState("");

  const [work_station, setwork_station] = useState("");
  const [Supervisor_notes, setSupervisor_notes] = useState("");
  // Hook to update the date as today's date
  useEffect(() => {
    var timer = setInterval(() => setDate1(new Date()), 1000)
    return function cleanup() {
      clearInterval(timer)
    }
  });
  //created the arrays for operator list and part table

  var [Part_table, setPart_table] = useState([{ "Part_internalNo": 'JUXTA CHAIR SEAT -F', "PartNo": '45220405', "Part_description": 'JUXTA CHAIR OVERMOULDED SEAT', "Customer": 'KEILHAUER' },
  { Part_internalNo: 'JUXTA CHAIR SEAT -R', PartNo: ['45220405'], Part_description: ['JUXTA CHAIR OVERMOULDED SEAT'], Customer: ['KEILHAUER'] },
  { Part_internalNo: 'JUXTA LB WA BODY -F', PartNo: ['45320400-2'], Part_description: ['JUXT LOW BACK WITH ARMS-OVERMOULDED BODY'], Customer: ['9-5'] },
  { Part_internalNo: 'JUXTA LB WA BODY -R', PartNo: ['45320400-2'], Part_description: ['JUXT LOW BACK WITH ARMS-OVERMOULDED BODY'], Customer: ['KEILHAUER'] },
  { Part_internalNo: 'JUXTA HB AL BODY-F', PartNo: ['45420400-2'], Part_description: ['JUXTA HIGH BACK ARMLESS-OVERMOULDED BODY'], Customer: ['KEILHAUER'] },
  { Part_internalNo: 'JUXTA HB AL BODY -R', PartNo: ['45420400-2'], Part_description: ['JUXTA HIGH BACK ARMLESS-OVERMOULDED BODY'], Customer: ['KEILHAUER'] },
  { Part_internalNo: 'JUXTA HB WA BODY -F', PartNo: ['45520400-2'], Part_description: ['JUX HIGH BACK WITH ARMS-OVERMOULDED BODY'], Customer: ['KEILHAUER'] },
  { Part_internalNo: 'JUXTA HB WA BODY -R', PartNo: ['45520400-2'], Part_description: ['JUX HIGH BACK WITH ARMS-OVERMOULDED BODY'], Customer: ['KEILHAUER'] }]);

  var [Operator_list, setOperator_list] = useState(['Ceaser Casilang', 'Barathy Sanmugan', 'Devica mangal', 'Mark VC', 'Orlando Alvarez', 'Saddique Yahaya', 'Avalyn Corneleus', 'Patrick Miller', 'Prabhjot Singh', 'Cedrick Sinclair']);
  // Method to set the value of Operator
  const submitValue2 = (e) => {
    setSelectdd1({ Selectdd1: e.target.value });
    setOperator({ Operator: Operator_list.find((x) => x === e.target.value) });
    console.log(e.target.value);
  }
  // method for finding the dependent values
  const submitValue = (e) => {
    console.log("called!");
    setSelectdd1({ Selectdd1: e.target.value });
    setPart_internalNo({ Part_internalNo: e.target.value });
    //let InternalpartNo = Part_table.find((x) => x.Part_internalNo === e.target.value).Customer;
    //console.log(InternalpartNo);

    setCustomer({ Customer: (Part_table.find((x) => x.Part_internalNo === e.target.value).Customer) });

    setPartNo({ PartNo: Part_table.find((x) => x.Part_internalNo === e.target.value).PartNo });
    setPart_description({ Part_description: Part_table.find((x) => x.Part_internalNo === e.target.value).Part_description });

  }

  const submitPost = () => {
    //declare variables to convert object to string
    var Customer_value = JSON.stringify(Customer.Customer[0]);
    var Part_internalNo_value = JSON.stringify(Part_internalNo.Part_internalNo);
    var PartNo_value = JSON.stringify(PartNo.PartNo[0]);
    var Part_Description_value = JSON.stringify(Part_description.Part_description[0]);
    var Operator_value = JSON.stringify(Operator.Operator);

    Axios.post('http://localhost:3002/api/create', { Date: Date1, Operator: JSON.parse(Operator_value), Part_internalNo: JSON.parse(Part_internalNo_value), PartNo: JSON.parse(PartNo_value), Customer: JSON.parse(Customer_value), Part_description: JSON.parse(Part_Description_value), Target: Target, work_station: work_station, Produced: Produced, Scrap: Scrap, Supervisor_notes: Supervisor_notes, Comments: Comments })
  }

  return (
    <div className="CreatePost">
      <div className="uploadPost">
        <input type="text" class="form-control form-rounded" list="codlor"
          id="operators" value={submitValue2.Selectdd1} onChange={submitValue2.bind(this)} placeholder="Enter Operator" />
        <datalist id="codlor">
          <option></option>
          {Operator_list.map(x => {
            return <option>{x}</option>
          })}
        </datalist>

        <input type="date" defaultValue={Date1.toISOString().slice(0, 10)} />
        <input type="text" class="form-control form-rounded" list="color"
          defaultvalue={submitValue.Selectdd1} onChange={submitValue.bind(this)} placeholder="Enter Part internal no" />
        <datalist id="color">
          <option></option>
          {Part_table.map(x => {
            return <option>{x.Part_internalNo}</option>
          })}
        </datalist>
        <input type="select" class="form-control form-rounded" id='Customer'
          placeholder="Enter Customer" list='customer' value={Customer.Customer[0]} />

        <input type="select" class="form-control form-rounded" id='PartNo'
          placeholder="Enter PartNo" value={PartNo.PartNo[0]} />

        <input type="select" class="form-control form-rounded" id='PartDescription'
          placeholder="Enter Part Description" value={Part_description.Part_description[0]} />

        <input type="text" class="form-control form-rounded" id='Target' placeholder="Target" onChange={(e) => {
          setTarget(e.target.value)
        }} name="target" required />
        <select class="form-control form-rounded" name="work_station" onChange={(e) => {
          setwork_station(e.target.value)
        }} id="work_station" >
          <option >1</option>
          <option >2</option>
          <option >3</option>
          <option >4</option>
          <option >5</option>
        </select>
        <input type="text" class="form-control form-rounded" id='Produced' placeholder="Produced" onChange={(e) => {
          setProduced(e.target.value)
        }} name="produced"
          required />
        <input type="text" class="form-control form-rounded" id='Scrap' placeholder="Scrap" onChange={(e) => {
          setScrap(e.target.value)
        }} name="scrap" required />
        <textarea type="text" class="textbox" id='Supervisor_notes' onChange={(e) => {
          setSupervisor_notes(e.target.value)
        }} name='Supervisor_notes' />

        <textarea type="text" class="textbox" id='Comments' onChange={(e) => {
          setComments(e.target.value)
        }} name='Comments' />

        <label>Username: </label>
        {/*<input type="text" onChange={(e) => {
          setUserName(e.target.value)
        }} />
        <label>Title: </label>
        <input type="text" onChange={(e) => {
          setTitle(e.target.value)
        }} />
        <label>Post Text</label>
        <textarea
          onChange={(e) => {
            setText(e.target.value)
          }}
        ></textarea>*/}
        <button onClick={submitPost}>Submit Post</button>
      </div>
    </div >
  )
}

export default CreatePost