import { useState, useEffect } from "react";
import useEth from "../contexts/EthContext/useEth";

function WalletStatus() {
  const { state: { contract,accounts, web3 } } = useEth();
  const [isRegistered, setIsRegistered] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);

  const [isAdmin, setIsAdmin] = useState(false);


  useEffect(() => {
    const checkIsAdmin = async () => {

      const ownerAddress = await contract.methods.owner().call();
      const isAdmin = (ownerAddress.toLowerCase() === accounts[0].toLowerCase() );
      console.log("isAdmin ", isAdmin);

      setIsAdmin(isAdmin);
    };
    checkIsAdmin();
  }, [contract, web3]);

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
    //console.log("WalletStatus accounts[0], ", accounts[0]);
                const isRegistered = _VoterRegistered.some(event => (event.voterAddress.toLowerCase() === accounts[0].toLowerCase()));
                setIsRegistered(isRegistered);
                setPastEvents(_VoterRegistered);
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
        {
            isAdmin ?
            (<p className="p-conn"><strong>Welcome, You're the Admin!</strong></p>)
            :
            (
            isRegistered ?
                (<p className="p-conn">Address Status: You're a Registered Voter!</p>)
                :
                (<p className="p-conn">Address Status: You're Not Registered Yet!</p>)
            )
        }
    </div>
  );
}

export default WalletStatus;
