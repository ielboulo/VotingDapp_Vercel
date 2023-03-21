import { EthProvider } from "./contexts/EthContext";

import { useState, useEffect } from 'react';
import useEth from "./contexts/EthContext/useEth";

import App from "./App_Route";
import VoteApp from "./VoteApp";


function CommonApp() {
  const { state: {accounts, contract, web3}} = useEth();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkIsAdmin = async () => {

      const ownerAddress = await contract.methods.owner().call();
      const isAdmin = (ownerAddress.toLowerCase() === accounts[0].toLowerCase());
      console.log("checkIsAdmin(): isAdmin ", isAdmin, " account = ", accounts[0]);
      setIsAdmin(isAdmin);
    };
    checkIsAdmin();
  }, [contract, web3]);

  if(isAdmin){
    return(
      <EthProvider>
      <App />
      </EthProvider>

  ); 

  }
  else {
    return (
      <EthProvider>
      <VoteApp />
      </EthProvider>

          );

  }

  // return (
  //     <App />
  // );
}

export default CommonApp;

