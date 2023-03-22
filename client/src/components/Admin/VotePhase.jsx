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

  const handleOpenVote = async () => {
    setLoading(true); 
    try {
      if( parseInt(currentStatus) === 2) //ProposalsRegistrationEnded
      {
        await contract.methods.startVotingSession().send({ from: accounts[0] });
        console.log("vote open success"); 
        toast.success("SUCCESS : Voting Session Open ", {
          closeButton: true,
          autoClose: true,
          position: 'top-center',
        }); 
      }
      else
      {
        toast.error("ERROR : Voting Session Opening not Possible!", {
          closeButton: true,
          autoClose: true,
          position: 'top-center',
        }); 
      }

    } catch (err) {
      console.error(err);
      toast.error("ERROR : Voting Session Opening Fail !", {
        closeButton: true,
        autoClose: true,
        position: 'top-center',
      });    
    }
    finally {
      setLoading(false);
    }
  };

  const handleCloseVote = async () => {
    setLoading(true);
    try {
      if( parseInt(currentStatus) === 3) //VotingSessionStarted
      {
        await contract.methods.endVotingSession().send({ from: accounts[0] });
        console.log("vote close success ");
        toast.success("SUCCESS : Voting Session Closed ", {
          closeButton: true,
          autoClose: true,
          position: 'top-center',
        }); 
      }
      else
      {
        toast.error("ERROR : Voting Session Closing not Possible!", {
          closeButton: true,
          autoClose: true,
          position: 'top-center',
        });       
      }
    } catch (err) {
      console.error(err);
      toast.error("ERROR : Voting Session Closing Fail !", {
        closeButton: true,
        autoClose: true,
        position: 'top-center',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <ToastContainer />
      <button className="bp" onClick={handleOpenVote} disabled={loading}>
        Open Vote {loading}
      </button>
      <button className="bp" onClick={handleCloseVote} disabled={loading}>
        Close Vote {loading}
      </button>
    </div>
  );
}

export default ProposalPhase;
