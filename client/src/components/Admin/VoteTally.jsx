import { useEffect, useState } from "react";
import useEth from "../../contexts/EthContext/useEth";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function VoteTally() {
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

  useEffect(() => {
    if (!contract) {
      return;
    }
    const event = contract.events.WorkflowStatusChange();
    event.on('data', (eventData) => {
      const { newStatus } = eventData.returnValues;
      setCurrentStatus(newStatus);
    });

    return () => {
      event.removeAllListeners();
    }
  });

  const handleTallyVote = async () => {
    setLoading(true); 
    try {
      if( parseInt(currentStatus) === 4) //VotingSessionEnded
      {
        await contract.methods.tallyVotes().send({ from: accounts[0] });
        toast.success("SUCCESS : Tally Vote Done ! ", {
          closeButton: true,
          autoClose: true,
          position: 'top-center',
        });
      }
      else
      {
        toast.error("ERROR : Voting Session is Not Ended YET or Votes Tallied !", {
          closeButton: true,
          autoClose: true,
          position: 'top-center',
        });
      }

    } catch (err) {
      console.error(err);
      toast.error("Vote Tally failed", {
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
      <button className="button_1" onClick={handleTallyVote} disabled={loading}>
        Tally Vote  {loading}
      </button>
    </div>
  );
}

export default VoteTally;
