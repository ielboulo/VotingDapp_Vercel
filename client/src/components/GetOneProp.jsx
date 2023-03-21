import { useState } from 'react';
import useEth from "../contexts/EthContext/useEth";

function GetOneProp() {
 const { state: {accounts, contract, web3 }} = useEth();
 const [inputPropId,  setPropId] = useState("");
 const [ oneProposal_desc,  setOneProposal_desc] = useState("");
 const [ oneProposal_votes,  setOneProposal_votes] = useState("");


 const handlePropIdChange = e => {
   console.log("handlePropIdChange inputPropId = ", e.target.value);
   setPropId(e.target.value);
 };

 const _getOneProposal = async () => {

   try {
     console.log("_getOneProposal inputPropId = ", inputPropId);
  
     if(!contract)
     {
        console.log("_getOneProposal no contract ");
        return;
     }
    const _prop = await contract.methods.getOneProposal(inputPropId).call({from : accounts[0]});
    const desc = _prop.description;
    const votes =  _prop.voteCount;
    
    setOneProposal_desc(desc);
    setOneProposal_votes(votes);
    //setOneProposal(`ID : "${inputPropId}" : Proposal content :  "${desc}", VoteCount : "${votes}"`);

     } 
     catch (err) {
       console.log(err);
     }
 };


 return (

   <div >
     <input
         className="input_prop"
         type="text"
         size="50"
         placeholder="Proposal ID"
         value={inputPropId}
         onChange={handlePropIdChange}
       />
<br/>
<br/>
     <button className="button_1"  onClick={_getOneProposal}>
       Get A Proposal  
     </button>
<br/>
<br/>
    <table className="table_Prop">
        <thead>
            <tr>
                <th>ProposalId</th>
                <th>Description </th>
                <th>Votes</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>{inputPropId}</td>
                <td>{oneProposal_desc}</td>
                <td>{oneProposal_votes}</td>
            </tr>
        </tbody>
    </table>
   </div>     

 );
}


export default GetOneProp;
