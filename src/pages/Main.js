import React, { Component } from 'react'
import './WalletCard.css'
import ERC20_ABI from "./ERC20_ABI.json";
import { Link } from 'react-router-dom';
import BookStore from "../images/logoblocke.png";
import TopLogo from "../images/logoblocke.png";
import { ethers } from "ethers";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  async connectToMetamask() {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const accounts = await provider.send("eth_requestAccounts", []);
    const balance = await provider.getBalance(accounts[0]);
    const balanceInEther = ethers.utils.formatEther(balance);
    const block = await provider.getBlockNumber();

    provider.on("block", (block) => {
      this.setState({ block })
    })

    const daiContract = new ethers.Contract('0xa9f9aCB92E4E2f16410511D56839A5Bd1d630a60', ERC20_ABI, provider);
    const tokenName = await daiContract.name();
    const tokenBalance = await daiContract.balanceOf(accounts[0]);
    const tokenUnits = await daiContract.decimals();
    const tokenBalanceInEther = ethers.utils.formatUnits(tokenBalance, tokenUnits);

    this.setState({ selectedAddress: accounts[0], balance: balanceInEther, block, tokenName, tokenBalanceInEther })
  }

  renderMetamask() {
    if (!this.state.selectedAddress) {
      return (
        <div className='walletCards'>
          <button onClick={() => this.connectToMetamask()} className='walletBtn'>Connect to Metamask</button>
        </div>
      )
    }
    else {
      return (
        <div>
          <p className='purchases'>Address {this.state.selectedAddress}</p>
          <p className='purchase'>Balance of {this.state.tokenName} is: {this.state.tokenBalanceInEther}</p>
        </div>
      );
    }
  }

  renderMetamasks() {
    if (!this.state.selectedAddress) {
      return (
        <div className='walletCards'>
          <button onClick={() => this.connectToMetamask()} className='walletBtn'>Connect to Metamask</button>
        </div>
      )
    }
    
    else {
      return (
        <div>
          <button className='walletBtn'>Its Connected</button>
        </div>
      );
    }
  }

  balanceCheker() {
    if (this.state.tokenBalanceInEther == 0) {
      return (
        <div className='walletCardss'>
          <div className='mainBtn'>
            <div className='walletCardss'>
              <div className='newCard'>
                <Link to="/home" className='walletBtn'> Go To The Dapp </Link>
              </div>
            </div>
          </div>
        </div>
      )
    }
    else if (this.state.tokenBalanceInEther >= 0) {
      return (
        <div className='balanceDisplay'>
          <span className='purchase'> You need to purchase Block-e to accees the wallet </span>
          <div className='walletCardsss'>
            <a href='https://block-e.app/' target="_blank" > <button className='walletBtn'>Back To Home Page</button> </a>
            <div className='walletCardss'>
              <a href='https://app.uniswap.org/#/swap?&chain=mainnet&use=v2&outputCurrency=0xa9f9aCB92E4E2f16410511D56839A5Bd1d630a60' target="_blank" > <button className='walletBtn'>Purchase Block-E</button>
              </a>
            </div>
          </div>
        </div>
      );
    }
    else {

    }
  }

  render() {
    return (
      <div className='walletCard'>
        <div className='main1'>
          <img src={TopLogo} className="topLogo"></img>
          <div className='mainBoxTop newBox'>
            {this.renderMetamasks()}
          </div>
        </div>
        <div>
          <div className='logoDiv'>
            <img src={BookStore} className="logos"></img>
            <h4 className='headingC'> Connect MetaMask Wallet </h4>
            <div className='mainBox'>
              {this.renderMetamask()}
              {this.balanceCheker()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Main;
