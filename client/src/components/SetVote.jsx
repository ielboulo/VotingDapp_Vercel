import { useState, useEffect } from "react";
import useEth from "../contexts/EthContext/useEth";

function SetVote() {
 const { state: {accounts, contract, web3}} = useEth();
 const [inputVote,  setInputVote] = useState("");

 const [votedProposalID, setVotedProposalID] = useState("");

 const handleAddVoteChange = e => {
   console.log("Proposal id voted = ", e.target.value);

   setInputVote(e.target.value);
 };

 const _addVote = async () => {
   try {
    await contract.methods.setVote(inputVote).send({from : accounts[0]});
} catch (err) {
       console.error(err);
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
  });


 return (

   <div>
     <input
         className="input_prop"
         type="text"
         size="50"
         placeholder="Proposal ID"
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