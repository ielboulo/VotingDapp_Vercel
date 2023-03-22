import { useState, useEffect } from "react";
import useEth from "../../contexts/EthContext/useEth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SetVote() {
 const { state: {accounts, contract, web3}} = useEth();
 const [inputVote,  setInputVote] = useState("");
 const [votedProposalID, setVotedProposalID] = useState(null);


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
}, [contract]); // Ilham : check 


 const handleAddVoteChange = e => {
  if (/^\d+$|^$/.test(e.target.value)) {
   setInputVote(e.target.value);
  }
 };

 const _addVote = async () => {
   try {
    if( inputVote && parseInt(currentStatus) === 4) //VotingSessionEnded
      {
        await contract.methods.setVote(inputVote).send({from : accounts[0]});
        toast.success("SUCCESS : You Voted ! ", {
          closeButton: true,
          autoClose: true,
          position: 'top-center',
        });
      }
      else
      {
        toast.error("ERROR : Vote is Not Possible!", {
          closeButton: true,
          autoClose: true,
          position: 'top-center',
        });
      }
    }
       catch (err) {
       console.error(err);
       toast.error("ERROR : Vote Failed!", {
        closeButton: true,
        autoClose: true,
        position: 'top-center',
      });
     }
 
};
//     event Voted (address voter, uint proposalId);
useEffect(() => {
    async function getPastEvent() {
        try {
            if (contract && web3 && accounts) { 
                const results = await contract.getPastEvents("Voted", { fromBlock:0 , toBlock: "latest" });
                const votedEvents = results.filter(event => event.returnValues.voter === accounts[0]);
                const proposalsVotedOn = votedEvents.map(event => event.returnValues.proposalId);
                setVotedProposalID(parseInt(proposalsVotedOn));
                }
            }
        catch (error) {
            console.error("WalletStatus : ", error);
        }
    }
    getPastEvent();
  }); // [contract]


 return (

   <div>
     <input
         className="input_prop"
         type="text"
         size="50"
         placeholder="Choose Your Favorite Proposal ID"
         value={inputVote}
         onChange={handleAddVoteChange}
       />
<br/>
<br/>
     <button className="button_1"  onClick={_addVote}>
      VOTE NOW !
     </button>
     <br/>
     {
            votedProposalID ?
            (<p className="p-conn"><strong>Congratulations ! You voted for Proposal ID: {votedProposalID} </strong></p>)
            :
            (<p className="p-conn">You didn't vote yet ... </p>)
     }

   </div>     

 );
}


export default SetVote;