import { EthProvider } from "./contexts/EthContext";
import Login from "./components/Login";
import AddVoter from "./components/AddVoter";
import ProposalPhase from "./components/ProposalPhase.jsx";
import VotePhase from "./components/VotePhase.jsx";
import VoteTally from "./components/VoteTally";
import VoteWinner from "./components/VoteWinner";
import StatusWatcher from "./components/StatusWatcher"
import ListProposals from "./components/ListProposals"
import GetOneProp from "./components/GetOneProp"
import SetVote from "./components/SetVote"
import AddProposal from "./components/AddProposal"
import WalletStatus from "./components/WalletStatus"


function App() {
  return (
    <EthProvider>
      <div id="App">
        <div className="container">
        <br />
        <br />
          <h1 className="title_dapp"> Voting DApp </h1>
          <br/>
          <h2 className="title_dapp_2"> -- Admin Space -- </h2>
          <br/>

          <Login />
          <br />
          <WalletStatus/>
          <hr />

          <h1 className="title_phase"> Status Watcher  </h1>
          <br />
          <StatusWatcher />
          <hr />

          <h1 className="title_phase"> Add Voters </h1>
          <br />
          <AddVoter />
          <hr />

          <h1 className="title_phase"> Proposal Phase </h1>
          <br />
          <ProposalPhase />
          <hr />

          <h1 className="title_phase"> Vote Phase </h1>
          <br />
          <VotePhase />
          <hr />

          <h1 className="title_phase"> Tally Votes </h1>
          <br />
          <VoteTally />
          <hr />

          <h1 className="title_phase"> VoteWinner </h1>
          <br />
          <VoteWinner />
          <br/>
          <hr />


          <h1 className="title_dapp"> Voting DApp </h1>
          <br/>
          <h2 className="title_dapp_2"> -- Voter Space -- </h2>
          <br/>
          <hr />

          <h1 className="title_phase"> Add Proposals </h1>
          <br />
          <AddProposal />
          <hr />

          <h1 className="title_phase"> List of Proposals </h1>
          <ListProposals />
          <hr />

          <h1 className="title_phase"> Get One Proposal </h1>
          <br />
          <GetOneProp />
          <hr />

          <h1 className="title_phase"> Make Your Own Choice ! </h1>
          <br />
          <SetVote />
          <br/>
          <hr />

          

        </div>
      </div>
    </EthProvider>
  );
}

export default App;

