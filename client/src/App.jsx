import { EthProvider } from "./contexts/EthContext";
//Connexion
import Login from "./components/Login";
import LoginStatus from "./components/LoginStatus"

//Admin
import AddVoter from "./components/Admin/AddVoter";
import ProposalPhase from "./components/Admin/ProposalPhase.jsx";
import VotePhase from "./components/Admin/VotePhase.jsx";
import VoteTally from "./components/Admin/VoteTally";
import VoteWinner from "./components/Admin/VoteWinner";
import StatusWatcher from "./components/Admin/StatusWatcher"

//Voter
import ListProposals from "./components/Voter/ListProposals"
import GetOneProp from "./components/Voter/GetOneProp"
import SetVote from "./components/Voter/SetVote"
import AddProposal from "./components/Voter/AddProposal"


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
          <LoginStatus/>
          <hr />

          <h1 className="title_phase"> Workflow Status </h1>
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

