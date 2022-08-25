import {Select, Button, Modal, Input} from 'antd'
import {ShoppingCartOutlined} from "@ant-design/icons";
import { useState } from 'react';
import { useMoralis } from 'react-moralis';

const {Option} = Select;
function Purchase({book,setdDenomination,denomination,isgift}) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [delivery, setDelivery] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [error, setError] = useState("");
  const [qty, setQty] = useState(1);
  const [denominationReal,setDenominationReal]=useState(book.denomination[0])

  const {Moralis, account, chainId} = useMoralis();

  const handleOk = async () => {

    // Get The Price of MATIC

    const options = {
      address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
      chain: "eth",
      exchange: "uniswap-v2",

    };
    // let priceMatic=''
    // try{
    const price = await Moralis.Web3API.token.getTokenPrice(options);
    const cprice = denomination / price.usdPrice;
    const priceMatic = cprice * 1;
  
    // }catch(error){
    //   console.log('error',error)
    // }
    
    // Send eth to book store owenr address
    // if(priceMatic){
      const options1 = {
        type: "native", 
        amount: Moralis.Units.ETH(priceMatic), 
        receiver: "0x8f3C85eee77a193e1D57261f46ED48B80996482B"
      }
      // try{
        let result = await Moralis.transfer(options1)
      // }catch(error){
      //   console.log('error',error)
      // }
    // }
    if(email===''){
      setError('Email is required!')
      return
    }

    if(phoneNum===''){
      setError('Phone number is required!')
      return
    }

    //Save Transaction Details to DB
    const Transaction = Moralis.Object.extend("Transaction");
    const transaction = new Transaction();

    transaction.set("Customer", account);
    transaction.set("Delivery", delivery);
    transaction.set("Email", email);
    transaction.set("PhoneNo", phoneNum);
    transaction.set("Product", book.name);
    transaction.set("Denomination", denomination);
    transaction.set("Quantity", qty);

    transaction.save()
    setIsModalVisible(false);
  }

  const handelQtyChange=(data,demo)=>{
    //
      let single = (demo-(demo*2/100).toFixed(2))
      setDenominationReal(demo)
      setdDenomination(single*data)
    // }
    setQty(data)
  }

  const handelOnchange=(data)=>{
      let single = (data-(data*2/100).toFixed(2))
      setdDenomination(single*qty)
      setDenominationReal(data)
      setQty(qty)
  }

  return (
    <>
      <div>
        <span className="price"> ${isgift ? denomination > 0 ? denomination :book.price:book.price}</span>
        {!isgift?<p>No Import Fees & Free Shipping Included</p>:''}
        <h2 style={{ color: "green" }}> In Stock </h2>
          <h4>Quantity</h4>
          <Select onChange={(e)=>handelQtyChange(e,denominationReal)} defaultValue={qty} style={{ width: "100%" }}>
            <Option value={1}>1</Option>
            <Option value={2}>2</Option>
            <Option value={3}>3</Option>
            <Option value={4}>4</Option>
            <Option value={5}>5</Option>
          </Select>
      </div>
      {isgift ?
      <div>
        <h4>Denomination</h4>
        <Select onChange={(e)=>handelOnchange(e)} defaultValue={book?.denomination[0]} style={{ width: "100%" }}>
          {book && book.denomination.map((value,key)=>(
            <Option key={value} value={value}>{value}</Option>
          ))}
          
        </Select>
      </div>  :''}
      {/* <h4>Variant</h4>
      <Select defaultValue={1} style={{ width: "100%" }}>
        <Option value={1}>1</Option>
        <Option value={2}>2</Option>
        <Option value={3}>3</Option>
      </Select>
      <h4>Color</h4>
      <Select defaultValue={"Gray"} style={{ width: "100%" }}>
        <Option value={"gray"}>Gray</Option>
        <Option value={"white"}>White</Option>
        <Option value={"silver"}>Silver</Option>
      </Select> */}


      {chainId === "0x1" &&
      <Button
      className="login"
      style={{ width: "100%", marginTop: "20px" }}
      onClick={()=>setIsModalVisible(true)}
    >
      <ShoppingCartOutlined /> Buy Now
    </Button>
      }
      
      <Modal
        title="Purchase Product"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={()=>setIsModalVisible(false)}
      >
        <div style={{ display: "flex" }}>
          <img src={book.image} alt="product" style={{ width: "200px" }}></img>
          <div>
            <h3>{book.name}</h3>
            <h2>${denomination > 0 ? denomination :book.price}</h2>
           {!isgift?
              <>
                <h4>Delivery Address</h4>
                <Input onChange={(value) => setDelivery(value.target.value)}></Input>
              </>:''
           }
            <h4>Email</h4>
            <Input onChange={(value) => setEmail(value.target.value)}></Input>
            <h4>Phone Num</h4>
            <Input onChange={(value) => setPhoneNum(value.target.value)}></Input>
            <div>{error}</div>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default Purchase
