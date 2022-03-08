import React, { useState } from 'react'



const Manufacterur = ({ contract, account }) => {

    const [sellerName, setSellerName] = useState(null);
    const [sellerAddress, setSellerAddress] = useState(null);
    const [sellerList, setSellerList] = useState([]);

    const [ProductId, setProductId] = useState(0)

    const addSeller = async () => {
        console.log("Adding : ", sellerName, sellerAddress);
        let val = await contract.addNewSeller(sellerAddress, sellerName);
        console.log(val);
    }

    const getSellerList = async () => {
        let _sellerList = await contract.viewAllSeller();
        setSellerList(_sellerList)
        // console.log(_manufacturerList);
    }

    const addProduct = async () => {
        await contract.addNewProduct(ProductId, sellerAddress, account);
    }

    return (
        <>
            <h1>Manufacturer</h1>
            <form>
                <label>
                    Seller Name :
                    <input type="text" name="SellerName" onChange={(e) => setSellerName((e.target.value))} />
                </label>
                <br></br>

                <label>
                    Seller Address :
                    <input type="text" name="SellerAddress" onChange={(e) => setSellerAddress((e.target.value))} />
                </label>
                <br></br>
            </form>

            <button onClick={addSeller}> Add </button>

            <br></br>

            <button onClick={getSellerList}>view SellerList</button>

            <h2>Sellers</h2>
            {sellerList.map((Seller, index) => {
                return (
                    <li key={index}>
                        {console.log(Seller["sellerName"])}

                        {Seller["sellerName"]} : {Seller["sellerAddress"]}
                    </li>
                )
            })}

            <h2>Add Product to Sellers </h2>
            <form>
                <label>
                    Seller Address :
                    <input type="text" name="SellerAddress" onChange={(e) => setSellerAddress((e.target.value))} />
                </label>
                <label>
                    Product Id :
                    <input type="text" name="ProductId" onChange={(e) => setProductId((e.target.value))} />
                </label>
                <br></br>

                <br></br>
                <input type="submit" value="Update" />
            </form>

            <button onClick={addProduct}>Add Product</button>


            <hr></hr>

        </>
    );
}

export default Manufacterur;