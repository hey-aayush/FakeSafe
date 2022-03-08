const Seller = () => {
    return (
        <>
            <h1>Seller</h1>
            <form>
                <label>
                    Customer Address :
                    <input type="text" name="name" />
                </label>
                <br></br>

                <label>
                    Product Id :
                    <input type="text" name="name" />
                </label>
                <br></br>

                <label>
                    Quantity :
                    <input type="number" name="name" />
                </label>
                <br></br>
                <input type="submit" value="Sell" />
            </form>
            <hr></hr>

        </>
    );
}

export default Seller;