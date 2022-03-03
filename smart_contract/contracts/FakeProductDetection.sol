// SPDX-License-Identifier: MIT

pragma solidity >=0.8.0;

contract FakeProductDetection {
    struct Product {
        string produtId;
        address manufacturerAddress;
        address Seller;
    }

    struct Seller {
        address sellerAddress;
        string sellerName;
    }

    struct Manufacturer {
        address manufacturerAddress;
        string manufacturerName;
    }

    struct Consumer {
        address consumerAddress;
        string consumerName;
    }

    address governmentAuthoryAddress;

    Manufacturer[] public manufacturerList;

    Seller[] public sellersList;

    mapping(string => Product) public ProductIdToProduct;
    mapping(address => bool) public ManufacturerExists;
    mapping(address => bool) public SellerExists;

    mapping(address => Product[]) public ManufacturerProductList;
    mapping(address => Product[]) public SellerProductList;

    constructor() {
        governmentAuthoryAddress = msg.sender;
    }

    modifier onlyGovernment() {
        //is the message sender governmentAuthory
        require(msg.sender == governmentAuthoryAddress);
        _;
    }

    modifier onlyManufacturer() {
        //is the message sender manufacturer
        require(ManufacturerExists[msg.sender]);
        _;
    }

    modifier onlySeller() {
        //is the message sender manufacturer
        require(SellerExists[msg.sender]);
        _;
    }

    function addNewManufacturer(
        address _manufacturerAddress,
        string memory _manufacturerName
    ) public onlyGovernment {
        if (!ManufacturerExists[_manufacturerAddress]) {
            manufacturerList.push(
                Manufacturer(_manufacturerAddress, _manufacturerName)
            );
            ManufacturerExists[_manufacturerAddress] = true;
        }
    }

    function addNewSeller(address _SellerAddress, string memory _sellerName)
        public
        onlyManufacturer
    {
        sellersList.push(Seller(_SellerAddress, _sellerName));
        SellerExists[_SellerAddress] = true;
    }

    function addNewProduct(
        string memory _produtId,
        address _manufacturerAddress,
        address _Seller
    ) public onlyManufacturer {
        ProductIdToProduct[_produtId] = Product(
            _produtId,
            _manufacturerAddress,
            _Seller
        );
        ManufacturerProductList[_manufacturerAddress].push(
            ProductIdToProduct[_produtId]
        );
        SellerProductList[_Seller].push(ProductIdToProduct[_produtId]);
    }

    function viewAllManufacturer() public view returns (Manufacturer[] memory) {
        return manufacturerList;
    }

    function viewAllSeller() public view returns (Seller[] memory) {
        return sellersList;
    }
}
