import React, { useState, useEffect } from 'react'

function Hooks() {

  var [Date1, setDate1] = useState(new Date());

  const [Selectdd1, setSelectdd1] = useState();
  const [Part_internalNo, setPart_internalNo] = useState();
  const [Customer, setCustomer] = useState({ Customer: {} });
  const [PartNo, setPartNo] = useState({ PartNo: {} });
  const [PartDescription, setPartDescription] = useState({ PartDescription: {} });



  useEffect(() => {
    var timer = setInterval(() => setDate1(new Date()), 1000)
    return function cleanup() {
      clearInterval(timer)
    }
  });


  var [Part_table, setPart_table] = useState([{ Part_internalNo: 'JUXTA CHAIR SEAT -F', PartNo: ['45220405'], Part_description: ['JUXTA CHAIR OVERMOULDED SEAT'], Customer: ['KEILHAUER'] },
  { Part_internalNo: 'JUXTA CHAIR SEAT -R', PartNo: ['45220405'], Part_description: ['JUXTA CHAIR OVERMOULDED SEAT'], Customer: ['KEILHAUER'] },
  { Part_internalNo: 'JUXTA LB WA BODY -F', PartNo: ['45320400-2'], Part_description: ['JUXT LOW BACK WITH ARMS-OVERMOULDED BODY'], Customer: ['9-5'] },
  { Part_internalNo: 'JUXTA LB WA BODY -R', PartNo: ['45320400-2'], Part_description: ['JUXT LOW BACK WITH ARMS-OVERMOULDED BODY'], Customer: ['KEILHAUER'] },
  { Part_internalNo: 'JUXTA HB AL BODY-F', PartNo: ['45420400-2'], Part_description: ['JUXTA HIGH BACK ARMLESS-OVERMOULDED BODY'], Customer: ['KEILHAUER'] },
  { Part_internalNo: 'JUXTA HB AL BODY -R', PartNo: ['45420400-2'], Part_description: ['JUXTA HIGH BACK ARMLESS-OVERMOULDED BODY'], Customer: ['KEILHAUER'] },
  { Part_internalNo: 'JUXTA HB WA BODY -F', PartNo: ['45520400-2'], Part_description: ['JUX HIGH BACK WITH ARMS-OVERMOULDED BODY'], Customer: ['KEILHAUER'] },
  { Part_internalNo: 'JUXTA HB WA BODY -R', PartNo: ['45520400-2'], Part_description: ['JUX HIGH BACK WITH ARMS-OVERMOULDED BODY'], Customer: ['KEILHAUER'] }]);

  var [Operator, setOperator] = useState(['Ceaser Casilang', 'Barathy Sanmugan', 'Devica mangal', 'Mark VC', 'Orlando Alvarez', 'Saddique Yahaya', 'Avalyn Corneleus', 'Patrick Miller', 'Prabhjot Singh', 'Cedrick Sinclair']);

  const submitValue2 = (e) => {
    setSelectdd1({ Selectdd1: e.target.value });
  }

  const submitValue = (e) => {

    setSelectdd1({ Selectdd1: e.target.value });
    //let InternalpartNo = Part_table.find((x) => x.Part_internalNo === e.target.value).Customer;
    // console.log(InternalpartNo);
    setCustomer({ Customer: Part_table.find((x) => x.Part_internalNo === e.target.value).Customer });
    setPartNo({ PartNo: Part_table.find((x) => x.Part_internalNo === e.target.value).PartNo });
    setPartDescription({ PartDescription: Part_table.find((x) => x.Part_internalNo === e.target.value).Part_description });

  }
  return <div>
    <h1>The hook file</h1>
    <input type="text" class="form-control form-rounded" list="codlor"
      id="operators" value={submitValue2.Selectdd1} placeholder="Enter Op" />
    <datalist id="codlor">
      <option></option>
      {Operator.map(x => {
        return <option>{x}</option>
      })}
    </datalist>

    <input type="date" defaultValue={Date1.toISOString().slice(0, 10)} />
    <input type="text" class="form-control form-rounded" list="color"
      id="operator" value={submitValue.Selectdd1} onChange={submitValue.bind(this)} placeholder="Enter Operator" />
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
      placeholder="Enter Part Description" value={PartDescription.PartDescription[0]} />


  </div>;
}


export default Hooks;


