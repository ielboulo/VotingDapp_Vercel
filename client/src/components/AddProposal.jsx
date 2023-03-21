
 import React, { useState } from 'react';
 import useEth from "../contexts/EthContext/useEth";

function AddProposal() {
  const { state: {accounts, contract, web3}} = useEth();
  const [inputProposal,  setInputProposal] = useState("");


  const handleAddProposalChange = e => {
    console.log("Proposal destination = ", e.target.value);

/*     if(( e.target.value !== "")) {
      console.log("Proposal is not valid");
    }
    else {
      console.log("good Proposal");
    } */
    setInputProposal(e.target.value);
  };

  const _addProposal = async () => {
    console.log("addProposal(): inputProposal 1 = ", inputProposal);
    //if((inputProposal  !== "")) {
   //  alert("invalid Proposal")

   // }
    console.log("befor call : from accounts = ", accounts[0]);
    console.log("befor call : contract.methods = ", contract.methods);

    try {

        await contract.methods.addProposal(inputProposal).send({from : accounts[0]});
        
        console.log("vous avez enregistré votre proposal ", inputProposal);

      } catch (err) {
        console.error(err);
      }
  
};

  return (

    <div className="inputs">
        <br/>

      <input
          className="input_prop"
          type="text"
          size="50"
          placeholder="Add Your Own Proposal"
          value={inputProposal}
          onChange={handleAddProposalChange}
        />
<br/>
<br/>
      <button className="button_1"  onClick={_addProposal}>
        Add Proposal 
      </button>

    </div>     
 
  );
}


export default AddProposal;