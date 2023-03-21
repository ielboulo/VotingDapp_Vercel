import { useEffect, useState } from "react";
import useEth from "../contexts/EthContext/useEth";

function VoteWinner() {
  const { state: {contract, web3, accounts} } = useEth();
  const [winner, setWinner] = useState('');


  const getWinner = async () => {
    if (!contract) {
      return;
    }
  
    const winningProposalID = await contract.methods.winningProposalID().call();
    const proposal = await contract.methods.getOneProposal(winningProposalID).call( { from : accounts[0]});
    const desc = proposal.description;
    const votes =  proposal.voteCount;

    setWinner(`The winner is : "${winningProposalID}" for the Proposal : "${desc}" with "${votes}" votes`);
  };


  return (
    <div>
      <button className="button_1" onClick={getWinner}>
        Who is the winner ?  
      </button>
      
      <p className="winn" >
      {winner}
      </p>
    </div>
  );
}

export default VoteWinner;
