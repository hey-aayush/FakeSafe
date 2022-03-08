const Customer = () => {
    return (
        <>
            <h1>Customer</h1>
            <form>
                <label>
                    Seller Address :
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
                <input type="submit" value="Request" />
            </form>
            <hr></hr>

        </>
    );
}

export default Customer;