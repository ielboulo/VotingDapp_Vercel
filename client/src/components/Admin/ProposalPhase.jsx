import { useEffect, useState } from "react";
import useEth from "../../contexts/EthContext/useEth";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ProposalPhase() {
  const { state: {contract, accounts} } = useEth();
  const [loading, setLoading] = useState(false);
  
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
  });

  const handleOpenProposal = async () => {
    setLoading(true); 
    try {
      if( parseInt(currentStatus) === 0) //RegisteringVoters
      {
        await contract.methods.startProposalsRegistering().send({ from: accounts[0] }); // Marc: a supprimer
        console.log("proposal open success");
        toast.success("SUCCESS : Proposal Registration Open ", {
          closeButton: true,
          autoClose: true,
          position: 'top-center',
        });
      }
      else
      {
        toast.error("ERROR : Proposal Opening Already Done!", {
          closeButton: true,
          autoClose: true,
          position: 'top-center',
        });
      }
    } catch (err) {
      console.error(err);
      console.log("proposal open fail");
      toast.error("ERROR : Proposal Registration Opening Fail !", {
        closeButton: true,
        autoClose: true,
        position: 'top-center',
      });
    }
    finally
    {
      setLoading(false);
    }  };

  const handleCloseProposal = async () => {
    setLoading(true);
    try {
      if( parseInt(currentStatus) === 1) //started ProposalsRegistering
      {
        await contract.methods.endProposalsRegistering().send({ from: accounts[0] });
        toast.success("SUCCESS : Proposal Registration Closed ", {
          closeButton: true,
          autoClose: true,
          position: 'top-center',
        });
      }
      else{
        toast.error("ERROR : Proposal Closing Not Possible !", {
          closeButton: true,
          autoClose: true,
          position: 'top-center',
        }); 
      }

    } catch (err) {
      console.error(err);
      toast.error("ERROR : Proposal Closing Fail !", {
        closeButton: true,
        autoClose: true,
        position: 'top-center',
      });    
    }
    finally
    {
      setLoading(false);
    }
  };

  return (
    <div>
      <ToastContainer />
      <button className="bp" onClick={handleOpenProposal} disabled={loading}>
        Open Proposal {loading}
      </button>
      <button className="bp" onClick={handleCloseProposal} disabled={loading}>
        Close Proposal {loading}
      </button>
    </div>
  );
}

export default ProposalPhase;
