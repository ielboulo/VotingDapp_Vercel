
import { useEffect, useState } from "react";
import useEth from "../../contexts/EthContext/useEth";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddProposal() {
  const { state: {accounts, contract, web3}} = useEth();
  const [inputProposal,  setInputProposal] = useState("");
 
  const [currentStatus, setCurrentStatus] = useState(0);

  useEffect(() => {
    const getStatus = async () => {
      if (!contract) {
        return;
      }
      const status = await contract.methods.workflowStatus().call();
      setCurrentStatus(status);
    };
    getStatus();
  }); //, [contract]

  const handleAddProposalChange = e => {
    setInputProposal(e.target.value);
  };

  const _addProposal = async () => {
    try {
        if( inputProposal && parseInt(currentStatus) === 1) //ProposalsRegistrationStarted,
      {
        await contract.methods.addProposal(inputProposal).send({from : accounts[0]});
        toast.success("SUCCESS : Add Proposal Done ! ", {
          closeButton: true,
          autoClose: true,
          position: 'top-center',
        });
      }
      else
      {
        toast.error("ERROR : Add Proposal Not Possible!", {
          closeButton: true,
          autoClose: true,
          position: 'top-center',
        });
      }
      } catch (err) {
        console.error(err);
        toast.error("ERROR : Add Proposal Fail!", {
          closeButton: true,
          autoClose: true,
          position: 'top-center',
        });
      }
  
};

  return (

    <div className="inputs">
        <ToastContainer />
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