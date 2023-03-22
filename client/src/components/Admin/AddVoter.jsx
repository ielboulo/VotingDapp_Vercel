import { useState, useEffect } from "react";
import useEth from "../../contexts/EthContext/useEth";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddVoter() {
  const { state: {accounts, contract, web3}} = useEth();
  const [inputAddress,  setInputAddress] = useState("");
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
  }, [contract]);


  const handleAddressChange = e => {

    if(!web3.utils.isAddress( e.target.value)) {
      console.log("address not valid");
    }
    setInputAddress(e.target.value);
  };

  const _addVoter = async () => {
    if(!web3.utils.isAddress(inputAddress)) {
      alert("invalid address")
    }

    try {
      if( parseInt(currentStatus) === 0) //RegisteringVoters
      {
        await contract.methods.addVoter(inputAddress).send({from : accounts[0]});
        toast.success("SUCCESS : Address Registered  "+inputAddress, {
          closeButton: true,
          autoClose: true,
          position: 'top-center',
        });
      }
      else {
        toast.error("ERROR : RegisteringVoters Session is closed !", {
          closeButton: true,
          autoClose: true,
          position: 'top-center',
        });

      }
    } catch (err) {
        console.error(err);
        if (err.message.includes("Already registered")) {
          toast.error("ERROR : Address is already registered !", {
            closeButton: true,
            autoClose: false,
            position: 'top-center',
          });
      }
      else {
        toast.error("ERROR : An unknown error occurred !", {
          closeButton: true,
          autoClose: true,
          position: 'top-center',
        });       
      }
  }
};

  return (

    <div className="inputs">
      <ToastContainer />
      <input
          type="text"
          size="50"
          placeholder="address"
          value={inputAddress}
          onChange={handleAddressChange}
        />
<br/>
<br/>
      <button className="bp"  onClick={_addVoter}>
        Add Voter 
      </button>

    </div>     
 
  );
}


export default AddVoter;
