// SPDX-License-Identifier: Apache-2.0

/*
  Sample Chaincode based on Demonstrated Scenario

 This code is based on code written by the Hyperledger Fabric community.
  Original code can be found here: https://github.com/hyperledger/fabric-samples/blob/release/chaincode/fabcar/fabcar.go
*/

package main

/* Imports
* 4 utility libraries for handling bytes, reading and writing JSON,
formatting, and string manipulation
* 2 specific Hyperledger Fabric specific libraries for Smart Contracts
*/
import (
	"bytes"
	"encoding/json"
	"fmt"
	"strings"

	"github.com/hyperledger/fabric/core/chaincode/shim"
	sc "github.com/hyperledger/fabric/protos/peer"
)

// Define the Smart Contract structure
type SmartContract struct {
}

/* Define Tuna structure, with 4 properties.
Structure tags are used by encoding/json library
*/
type Tuna struct {
	Vessel    string `json:"vessel"`
	Timestamp string `json:"timestamp"`
	Location  string `json:"location"`
	Holder    string `json:"holder"`
}

type Supplier struct {
	Id         string   `json:"id"`
	Name       string   `json:"name"`
	Location   string   `json:"location"`
	ProductIds []string `json:"products"`
}

type Product struct {
	Id   string `json:"id"`
	Name string `json:"name"`
}

type ProductInList struct {
	Id   string `json:"id"`
	Name string `json:"name"`
	Qtd  int    `json:"qtd"`
}

type Client struct {
	Id       string   `json:"id"`
	Name     string   `json:"name"`
	Location string   `json:"location"`
	History  []string `json:"history"`
}

type Vehicle struct {
	Id        string `json:"id"`
	Location  string `json:"location"`
	CarrierId string `json:"carrierid"`
}

type Carrier struct {
	Id   string `json:"id"`
	Name string `json:"name"`
}

type ProductVO struct {
	ProductId string `json:"productid"`
	Qtd       int    `json:"qtd"`
}
type Shipment struct {
	Id       string      `json:"id"`
	Status   string      `json:"status"`
	Arrival  string      `json:"arrival"`
	ClientId string      `json:"clientid"`
	Products []ProductVO `json:"products"`
	TripId   string      `json:"tripid"`
}

type ShipmentVO struct {
	Id       string          `json:"id"`
	Status   string          `json:"status"`
	Arrival  string          `json:"arrival"`
	ClientId string          `json:"clientid"`
	Products []ProductInList `json:"products"`
	TripId   string          `json:"tripid"`
}

type Trip struct {
	Id         string   `json:"id"`
	VehicleId  string   `json:"vehicleid"`
	SupplierId string   `json:"supplierid"`
	Shipments  []string `json:"shipments"`
	Departure  string   `json:"departure"`
}

/*
 * The Init method *
 called when the Smart Contract "tuna-chaincode" is instantiated by the network
 * Best practice is to have any Ledger initialization in separate function
 -- see initLedger()
*/
func (s *SmartContract) Init(APIstub shim.ChaincodeStubInterface) sc.Response {
	return shim.Success(nil)
}

/*
 * The Invoke method *
 called when an application requests to run the Smart Contract "tuna-chaincode"
 The app also specifies the specific smart contract function to call with args
*/
func (s *SmartContract) Invoke(APIstub shim.ChaincodeStubInterface) sc.Response {

	// Retrieve the requested Smart Contract function and arguments
	function, args := APIstub.GetFunctionAndParameters()
	// Route to the appropriate handler function to interact with the ledger
	if function == "queryTuna" {
		return s.queryTuna(APIstub, args)
	} else if function == "initLedger" {
		return s.initLedger(APIstub)
	} else if function == "getHistory" {
		return s.getHistory(APIstub, args)
	} else if function == "getShipment" {
		return s.getShipment(APIstub, args)
	} else if function == "recordTuna" {
		return s.recordTuna(APIstub, args)
	} else if function == "queryAllTuna" {
		return s.queryAllTuna(APIstub)
	} else if function == "changeTunaHolder" {
		return s.changeTunaHolder(APIstub, args)
	} else if function == "getAddresses" {
		return s.getAddresses(APIstub, args)
	}

	return shim.Error("Invalid Smart Contract function name.")
}

/*
 * The queryTuna method *
Used to view the records of one particular tuna
It takes one argument -- the key for the tuna in question
*/
func (s *SmartContract) getHistory(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {

	if len(args) != 1 {
		return shim.Error("Incorrect number of arguments. Expecting 1")
	}

	clientAsBytes, _ := APIstub.GetState(args[0])
	if clientAsBytes == nil {
		return shim.Error("Could not locate tuna")
	}
	client := Client{}
	json.Unmarshal(clientAsBytes, &client)
	history := client.History
	i := 0
	shipmentHistory := []Shipment{}
	for i < len(history) {
		deliverId := history[i]
		shipmentAsBytes, _ := APIstub.GetState(deliverId)
		shipment := Shipment{}
		json.Unmarshal(shipmentAsBytes, &shipment)
		shipmentHistory = append(shipmentHistory, shipment)
		i = i + 1
	}
	shipmentHistoryAsBytes, _ := json.Marshal(shipmentHistory)
	return shim.Success(shipmentHistoryAsBytes)
}

/*
 * The queryTuna method *
Used to view the records of one particular tuna
It takes one argument -- the key for the tuna in question
*/
func (s *SmartContract) getShipment(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {

	if len(args) != 1 {
		return shim.Error("Incorrect number of arguments. Expecting 1")
	}

	shipmentAsBytes, _ := APIstub.GetState(args[0])
	if shipmentAsBytes == nil {
		return shim.Error("Could not locate tuna")
	}
	shipment := Shipment{}
	json.Unmarshal(shipmentAsBytes, &shipment)
	productList := shipment.Products
	newProductList := []ProductInList{}
	i := 0
	for i < len(productList) {
		productId := productList[i].ProductId
		productQtd := productList[i].Qtd
		productAsBytes, _ := APIstub.GetState(productId)
		product := Product{}
		json.Unmarshal(productAsBytes, &product)
		productName := product.Name
		newProductList = append(newProductList,
			ProductInList{Id: productId, Name: productName, Qtd: productQtd})
		i = i + 1
	}

	shipmentVO := ShipmentVO{}
	shipmentVO.Id = shipment.Id
	shipmentVO.Arrival = shipment.Arrival
	shipmentVO.ClientId = shipment.ClientId
	shipmentVO.Status = shipment.Status
	shipmentVO.TripId = shipment.TripId
	shipmentVO.Products = newProductList
	shipmentVOAsBytes, _ := json.Marshal(shipmentVO)
	return shim.Success(shipmentVOAsBytes)
}

/*
 * The queryTuna method *
Used to view the records of one particular tuna
It takes one argument -- the key for the tuna in question
*/
func (s *SmartContract) queryTuna(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {

	if len(args) != 1 {
		return shim.Error("Incorrect number of arguments. Expecting 1")
	}

	tunaAsBytes, _ := APIstub.GetState(args[0])
	if tunaAsBytes == nil {
		return shim.Error("Could not locate tuna")
	}
	return shim.Success(tunaAsBytes)
}

func (s *SmartContract) getAddresses(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {

	if len(args) != 1 {
		return shim.Error("Incorrect number of arguments. Expecting 1")
	}

	shipmentAsBytes, _ := APIstub.GetState(args[0])
	if shipmentAsBytes == nil {
		return shim.Error("Could not locate shipment")
	}

	shipment := Shipment{}

	json.Unmarshal(shipmentAsBytes, &shipment)

	myClient := shipment.ClientId

	tripAsBytes, _ := APIstub.GetState(shipment.TripId)
	if tripAsBytes == nil {
		return shim.Error("Could not locate trip")
	}

	trip := Trip{}

	json.Unmarshal(tripAsBytes, &trip)

	vehicleAsBytes, _ := APIstub.GetState(trip.VehicleId)
	if vehicleAsBytes == nil {
		return shim.Error("Could not locate vehicle")
	}
	vehicle := Vehicle{}

	json.Unmarshal(vehicleAsBytes, &vehicle)

	addresses := []string{vehicle.Location}

	i := 0
	for i < len(trip.Shipments) {
		shipAsBytes, _ := APIstub.GetState(trip.Shipments[i])
		if shipAsBytes == nil {
			return shim.Error("Could not locate ship")
		}
		ship := Shipment{}
		json.Unmarshal(shipAsBytes, &ship)

		if strings.Compare(ship.Status, "In Transit") == 0 {
			continue
		}

		clientAsBytes, _ := APIstub.GetState(ship.ClientId)
		if clientAsBytes == nil {
			return shim.Error("Could not locate client")
		}
		client := Client{}
		json.Unmarshal(clientAsBytes, &client)

		addresses = append(addresses, client.Location)
		if strings.Compare(client.Id, myClient) == 0 {
			break
		}

		i = i + 1
	}

	addressesAsBytes, _ := json.Marshal(addresses)
	return shim.Success(addressesAsBytes)
}

/*
 * The initLedger method *
Will add test data (10 tuna catches)to our network
*/
func (s *SmartContract) initLedger(APIstub shim.ChaincodeStubInterface) sc.Response {

	products := []Product{
		Product{Id: "10001", Name: "Chocolate Frog"},
	}

	suppliers := []Supplier{
		Supplier{Id: "1", Name: "Hogwarts Magic Foods", Location: "67.0006, -70.5476", ProductIds: []string{products[0].Id}},
	}

	clients := []Client{
		Client{Id: "20001", Name: "Honeydukes", Location: "91.2395, -49.4594", History: []string{"50001"}},
	}

	carriers := []Carrier{
		Carrier{Id: "30001", Name: "Nimbus"},
	}

	vehicles := []Vehicle{
		Vehicle{Id: "40001", Location: "51.9435, 8.2735", CarrierId: carriers[0].Id},
	}

	productsVO := []ProductVO{
		ProductVO{ProductId: "10001", Qtd: 10},
	}

	shipments := []Shipment{
		Shipment{Id: "50001", Status: "Delivered", Arrival: "00:00:00T00:00:00",
			ClientId: "20001", Products: productsVO, TripId: "60001"},
	}

	trips := []Trip{
		Trip{Id: "60001", VehicleId: "40001", SupplierId: carriers[0].Id,
			Shipments: []string{"50001"}, Departure: "00:00:00T00:00:00"},
	}

	i := 0
	for i < len(products) {
		fmt.Println("i is ", i)
		productsAsBytes, _ := json.Marshal(products[i])
		APIstub.PutState(products[i].Id, productsAsBytes)
		fmt.Println("Added", products[i])
		i = i + 1
	}

	i = 0
	for i < len(suppliers) {
		fmt.Println("i is ", i)
		suppliersAsBytes, _ := json.Marshal(suppliers[i])
		APIstub.PutState(suppliers[i].Id, suppliersAsBytes)
		fmt.Println("Added", suppliers[i])
		i = i + 1
	}

	i = 0
	for i < len(clients) {
		fmt.Println("i is ", i)
		clientsAsBytes, _ := json.Marshal(clients[i])
		APIstub.PutState(clients[i].Id, clientsAsBytes)
		fmt.Println("Added", clients[i])
		i = i + 1
	}

	i = 0
	for i < len(carriers) {
		fmt.Println("i is ", i)
		carriersAsBytes, _ := json.Marshal(carriers[i])
		APIstub.PutState(carriers[i].Id, carriersAsBytes)
		fmt.Println("Added", carriers[i])
		i = i + 1
	}

	i = 0
	for i < len(vehicles) {
		fmt.Println("i is ", i)
		vehiclesAsBytes, _ := json.Marshal(vehicles[i])
		APIstub.PutState(vehicles[i].Id, vehiclesAsBytes)
		fmt.Println("Added", vehicles[i])
		i = i + 1
	}

	i = 0
	for i < len(shipments) {
		fmt.Println("i is ", i)
		shipmentsAsBytes, _ := json.Marshal(shipments[i])
		APIstub.PutState(shipments[i].Id, shipmentsAsBytes)
		fmt.Println("Added", shipments[i])
		i = i + 1
	}

	i = 0
	for i < len(trips) {
		fmt.Println("i is ", i)
		tripsAsBytes, _ := json.Marshal(trips[i])
		APIstub.PutState(trips[i].Id, tripsAsBytes)
		fmt.Println("Added", trips[i])
		i = i + 1
	}

	return shim.Success(nil)
}

/*
 * The recordTuna method *
Fisherman like Sarah would use to record each of her tuna catches.
This method takes in five arguments (attributes to be saved in the ledger).
*/
func (s *SmartContract) recordTuna(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {

	if len(args) != 5 {
		return shim.Error("Incorrect number of arguments. Expecting 5")
	}

	var tuna = Tuna{Vessel: args[1], Location: args[2], Timestamp: args[3], Holder: args[4]}

	tunaAsBytes, _ := json.Marshal(tuna)
	err := APIstub.PutState(args[0], tunaAsBytes)
	if err != nil {
		return shim.Error(fmt.Sprintf("Failed to record tuna catch: %s", args[0]))
	}

	return shim.Success(nil)
}

/*
 * The queryAllTuna method *
allows for assessing all the records added to the ledger(all tuna catches)
This method does not take any arguments. Returns JSON string containing results.
*/
func (s *SmartContract) queryAllTuna(APIstub shim.ChaincodeStubInterface) sc.Response {

	startKey := "0"
	endKey := "999"

	resultsIterator, err := APIstub.GetStateByRange(startKey, endKey)
	if err != nil {
		return shim.Error(err.Error())
	}
	defer resultsIterator.Close()

	// buffer is a JSON array containing QueryResults
	var buffer bytes.Buffer
	buffer.WriteString("[")

	bArrayMemberAlreadyWritten := false
	for resultsIterator.HasNext() {
		queryResponse, err := resultsIterator.Next()
		if err != nil {
			return shim.Error(err.Error())
		}
		// Add comma before array members,suppress it for the first array member
		if bArrayMemberAlreadyWritten == true {
			buffer.WriteString(",")
		}
		buffer.WriteString("{\"Key\":")
		buffer.WriteString("\"")
		buffer.WriteString(queryResponse.Key)
		buffer.WriteString("\"")

		buffer.WriteString(", \"Record\":")
		// Record is a JSON object, so we write as-is
		buffer.WriteString(string(queryResponse.Value))
		buffer.WriteString("}")
		bArrayMemberAlreadyWritten = true
	}
	buffer.WriteString("]")

	fmt.Printf("- queryAllTuna:\n%s\n", buffer.String())

	return shim.Success(buffer.Bytes())
}

/*
 * The changeTunaHolder method *
The data in the world state can be updated with who has possession.
This function takes in 2 arguments, tuna id and new holder name.
*/
func (s *SmartContract) changeTunaHolder(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {

	if len(args) != 2 {
		return shim.Error("Incorrect number of arguments. Expecting 2")
	}

	tunaAsBytes, _ := APIstub.GetState(args[0])
	if tunaAsBytes == nil {
		return shim.Error("Could not locate tuna")
	}
	tuna := Tuna{}

	json.Unmarshal(tunaAsBytes, &tuna)
	// Normally check that the specified argument is a valid holder of tuna
	// we are skipping this check for this example
	tuna.Holder = args[1]

	tunaAsBytes, _ = json.Marshal(tuna)
	err := APIstub.PutState(args[0], tunaAsBytes)
	if err != nil {
		return shim.Error(fmt.Sprintf("Failed to change tuna holder: %s", args[0]))
	}

	return shim.Success(nil)
}

/*
 * main function *
calls the Start function
The main function starts the chaincode in the container during instantiation.
*/
func main() {

	// Create a new Smart Contract
	err := shim.Start(new(SmartContract))
	if err != nil {
		fmt.Printf("Error creating new Smart Contract: %s", err)
	}
}
