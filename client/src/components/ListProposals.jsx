import { useState, useEffect } from "react";
import useEth from "../contexts/EthContext/useEth";

function ListProposals() {
  const { state: { contract,txhash, web3 } } = useEth();
  const [pastEvents, setPastEvents] = useState([]);

  useEffect(() => {
    async function getPastEvent() {
        if (contract) {
            const results = await contract.getPastEvents("ProposalRegistered", { fromBlock:0 , toBlock: "latest" });
            const ProposalRegistered = results.map((proposalReg) => {
                let PastE = {proposalId:null};
                PastE.proposalId = proposalReg.returnValues.proposalId;
                return PastE;
              });
            setPastEvents(ProposalRegistered);
        }
    }
    getPastEvent();
  });

  return (
    <div className="past">
        Voici les ProposalIds disponibles : <br /> <br />
    <table>
        <thead>
            <tr>
                <th>ProposalId</th>
            </tr>
        </thead>
        <tbody>
        {pastEvents.map((event, index) => {
                return (
                <tr key={index}>
                    <td>{event.proposalId}</td>
                </tr>
                )
            })}
        </tbody>
    </table>
    <br />

    </div>
  );
}

export default ListProposals;