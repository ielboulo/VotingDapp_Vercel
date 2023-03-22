import { useEffect, useState } from "react";
import useEth from "../../contexts/EthContext/useEth";

function VoteWinner() {
  const { state: {contract, web3, accounts} } = useEth();
  const [winner, setWinner] = useState(null);


  const getWinner = async () => {
    if (!contract) {
      return;
    }
  
    const winningProposalID = await contract.methods.winningProposalID().call();
    const proposal = await contract.methods.getOneProposal(winningProposalID).call( { from : accounts[0]});
    const desc = proposal.description;
    const votes =  proposal.voteCount;

    if(parseInt(winningProposalID) !== 0) { 
      setWinner(`The winner is : "${winningProposalID}" for the Proposal : "${desc}" with "${votes}" votes`);
    }
};


  return (
    <div>
      <button className="button_1" onClick={getWinner}>
        Who is the winner ?  
      </button>
      {
        winner ?
        <p className="winn" > {winner} </p>
        :
        <p className="winn" > No Proposal Available Or No Vote Yet </p>
      }
    </div>
  );
}

export default VoteWinner;
