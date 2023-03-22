import { useState, useEffect } from "react";
import useEth from "../contexts/EthContext/useEth";

function LoginStatus() {
  const { state: { contract,accounts, web3 } } = useEth();
  const [isRegistered, setIsRegistered] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkIsAdmin = async () => {
      try {
        if (contract && web3 && accounts) { 
          const ownerAddress = await contract.methods.owner().call();
          const isAdmin = (ownerAddress.toLowerCase() === accounts[0].toLowerCase() );
          setIsAdmin(isAdmin);
        }
      }
      catch (error)
      {
        console.log(error);
      }
    };
    checkIsAdmin();
  }); //, [contract, web3]

  //     event VoterRegistered(address voterAddress); 
  useEffect(() => {
    async function getPastEvent() {
        try {
            if (contract && web3 && accounts) { 
                const results = await contract.getPastEvents("VoterRegistered", { fromBlock:0 , toBlock: "latest" });
                const _VoterRegistered = results.map((voterReg) => {
                    let PastE = {voterAddress:null};
                    PastE.voterAddress = voterReg.returnValues.voterAddress;
                    return PastE;
                  });

                const isRegistered = _VoterRegistered.some(event => (event.voterAddress.toLowerCase() === accounts[0].toLowerCase()));
                console.log("LoginStatus isRegistered = " , isRegistered);
                setIsRegistered(isRegistered);            }
        }
        catch (error) {
            console.error("WalletStatus : ", error);
        }
    }
    getPastEvent();
  });

  return (
    <div>
        {
            isAdmin ?
            (<p className="p-conn"><strong>Welcome, You're the Admin!</strong></p>)
            :
            (
            isRegistered ?
                (<p className="p-conn">Welcome: You're a Registered Voter!</p>)
                :
                (<p className="p-conn">Welcome : You're Not Registered Yet!</p>)
            )
        }
    </div>
  );
}

export default LoginStatus;
