import React, { useState } from 'react'

const GOI = ({ contract }) => {
    const [manufacturerName, setManufacturerName] = useState(null);
    const [manufacturerAddress, setManufacturerAddress] = useState(null);
    const [manufacturerList, setManufacturerList] = useState([]);


    const setManufacturer = async () => {
        console.log("Adding : ", manufacturerAddress, manufacturerName);

        let val = await contract.addNewManufacturer(manufacturerAddress, manufacturerName);
        console.log(val);
    }

    const getManufacturer = async () => {
        let _manufacturerList = await contract.viewAllManufacturer();
        setManufacturerList(_manufacturerList)
        // console.log(_manufacturerList);
    }

    return (
        <>
            <hr></hr>
            <h1>GOI</h1>
            <form>
                <label>
                    Manufacturer name :
                    <input type="text" name="manufacturerName" onChange={(e) => setManufacturerName(e.target.value)} />
                </label>
                <br></br>

                <label>
                    Manufacturer Address :
                    <input type="text" name="manufacturerAddress" onChange={(e) => setManufacturerAddress(e.target.value)} />
                </label>

                <br></br>
            </form>
            <button onClick={setManufacturer}>Approve</button>
            <br></br>
            <button onClick={getManufacturer}>view Manufacturer</button>
            <h2>Manufacturers</h2>
            {manufacturerList.map((Manufacturer, index) => {
                return (
                    <>
                        {console.log(Manufacturer["manufacturerAddress"])}
                        <li key={index}>
                            {Manufacturer["manufacturerName"]} : {Manufacturer["manufacturerAddress"]}
                        </li>
                    </>
                )

            })}
            <hr></hr>

        </>
    );
}

export default GOI;