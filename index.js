import { carMarket } from "./carData.js";
console.log("carMarket: ", carMarket);
/** Agency Operations *********************************************/

//Search for a car agency by its name or ID.
function getAgencyByName(name) {
  const agency = carMarket.sellers.find((a) => a.agencyName === name);
  return agency;
}
console.log('getAgencyByName("CarMax"): ', getAgencyByName("CarMax"));
function getAgencyById(id) {
  return carMarket.sellers.find((a) => a.agencyId === id);
}
console.log('getAgencyById("Plyq5M5AZ"): ', getAgencyById("Plyq5M5AZ"));
// Retrieve all agencies' names.
function getAgenciesNames() {
  return carMarket.sellers.map((a) => a.agencyName);
}
// Add a new car to an agency's inventory.
function addCar(agencyName, car, brand) {
  let agency = getAgencyByName(agencyName);
  if (!agency) {
    console.error("Agency not found.");
    return;
  }
  car.ownerId = agency.agencyId;
  let brandFound = false;
  agency.cars.forEach((brandObj) => {
    // brand exits
    if (brandObj.brand === brand) {
      brandObj.models.push(car);
      brandFound = true;
    }
  });
  // add brand if does not exists
  if (!brandFound) {
    agency.cars.push({
      brand: brand,
      models: [car],
    });
  }
}

console.log(
  "addCar(agencyName, car, brand): ",
  addCar(
    "CarMax",
    {
      name: "3",
      year: 2014,
      price: 43000,
      carNumber: "vd6s46",
    },
    "Mazda"
  )
);
console.log(getAgencyByName("CarMax"));
//Remove a car from an agency's inventory.
function removeCar(agencyName, carNumber) {
  let agency = getAgencyByName(agencyName);
  if (!agency) {
    console.error("Agency not found.");
    return;
  }

  let carRemoved = false;

  agency.cars.forEach((brandObj) => {
    const carIndex = brandObj.models.findIndex(
      (car) => car.carNumber === carNumber
    );
    if (carIndex !== -1) {
      // Remove car from the brand
      brandObj.models.splice(carIndex, 1);
      carRemoved = true;
      console.log(
        `Car with ID ${carNumber} removed from ${brandObj.brand} brand.`
      );
    }
  });

  if (!carRemoved) {
    console.error(`Car with ID ${carNumber} not found in the agency.`);
  }
}

// Change the cash or credit of an agency.
/**@param newCash: [+/-] cash if adding or withdrowing from funds
 * @param newCredit: [+/-] credit to increase or decrease credit
 */
function updateAgencyFinances(agencyName, newCash, newCredit) {
  let agency = getAgencyByName(agencyName);
  if (!agency) {
    console.error("Agency not found.");
    return;
  }
  agency.cash += newCash;
  agency.credit += newCredit;
}
//Update the price of a specific car in an agency
function updateCarPrice(agencyName, carNumber, newPrice) {
  let agency = getAgencyByName(agencyName);
  if (!agency) {
    console.error("Agency not found.");
    return;
  }
  let carFound = false;
  agency.cars.forEach((brandObj) => {
    brandObj.models = brandObj.models.filter((car) => {
      if (car.carNumber === carNumber) {
        carFound = true;
        car.price = newPrice;
        return car; // return updated car
      }
      return true; // Keep other cars in the models array
    });
  });
  if (!carFound) {
    console.error(`Car with ID ${carNumber} not found in the agency.`);
  }
}
updateCarPrice("CarMax", "vd6s46", 40000);
console.log(getAgencyByName("CarMax"));
// Calculate and return the total revenue for a specific agency
function getTotalAgencyRevenue(agencyName) {
  let agency = getAgencyByName(agencyName);
  if (!agency) {
    console.error("Agency not found.");
    return;
  }
  return agency.cash - agency.credit;
}
console.log("getTotalAgencyRevenue(CarMax): ", getTotalAgencyRevenue("CarMax"));
// Transfer a car from one agency to another
function transferCarBetweenAgencies() {
  // todo
}

/** Customer Operations ********************************************/
// Search for a customer by their name or ID.
function getCustomerByName(name) {
  const customer = carMarket.customers.find((c) => c.name === name);
  return customer;
}
console.log(
  'getCustomerByName("Lilah Goulding"): ',
  getCustomerByName("Lilah Goulding")
);
function getCustomerById(id) {
  const customer = carMarket.customers.find((c) => c.id === id);
  return customer;
}
console.log('getCustomerById("cnTobUDy6"): ', getCustomerById("cnTobUDy6"));

// Retrieve all customers' names.
function getCustomersNames() {
  return carMarket.customers.map((c) => c.name);
}
console.log("getCustomersNames(): ", getCustomersNames());
// Change the cash of a customer.
function updateCustomerCash(customerName, newCash) {
  let customer = getCustomerByName(customerName);
  if (!customer) {
    // null
    console.error(`Customer ${customerName} not found.`);
    return;
  }
  customer.cash = newCash;
  console.log(`Customer ${customerName}'s cash is updated to ${newCash}.`);
}
updateCustomerCash("Nikita Philip", 50000);
console.log(getCustomerByName("Nikita Philip"));
// Calculate the total value of all cars owned by a specific customer
function getCustomerTotalCarValue(customerName) {
  let customer = getCustomerByName(customerName);
  if (!customer) {
    // null
    console.error(`Customer ${customerName} not found.`);
    return;
  }
  let total = 0;
  customer.cars.forEach((car) => {
    total += car.price;
  });
  return total;
}
console.log(
  'getCustomerTotalCarValue("Lana Edge"): ',
  getCustomerTotalCarValue("Lana Edge")
);

/** Car Operations ************************************************/

// Retrieve all cars available for purchase.
function getCarsPurchasable() {
  let carsAvailable = [];
  // iterate through sellers> brands> models
  carMarket.sellers.forEach((seller) => {
    seller.cars.forEach((brandObj) => {
      brandObj.models.forEach((model) => {
        carsAvailable.push(model);
      });
    });
  });
  return carsAvailable;
}
console.log("getCarsPurchasable: ", getCarsPurchasable());
//Search for cars based on certain criteria. The search parameters should include the production year, price, and optionally, the brand of the car.
// todo: search function(s)

// Return the most expensive car available for sale
function getMostExpensiveCar() {
  let priciest = {
    price: Number.MIN_VALUE,
  };
  // iterate through sellers> brands> models
  carMarket.sellers.forEach((seller) => {
    seller.cars.forEach((brandObj) => {
      brandObj.models.forEach((model) => {
        // compare all prices
        if (model.price > priciest.price) {
          priciest = model;
        }
      });
    });
  });
  return priciest;
}
console.log("getMostExpensiveCar(): ", getMostExpensiveCar());
function getCheapestCar() {
  let cheapest = {
    price: Number.MAX_VALUE,
  };
  // iterate through sellers> brands> models
  carMarket.sellers.forEach((seller) => {
    seller.cars.forEach((brandObj) => {
      brandObj.models.forEach((model) => {
        // compare all prices
        if (model.price < cheapest.price) {
          cheapest = model;
        }
      });
    });
  });
  return cheapest;
}
console.log("getCheapestCar(): ", getCheapestCar());

/** Car Purchase Operations ********************************************/

/**a sellCar function that sells a car to a specific customer. This function should:
    1. Check the availability of the car at the agency.
    2. Verify if the customer has enough cash to purchase the car.
    3. Update the cash and credit for both the agency and the customer accordingly.
    4. Update the tax authority's records. 
    */
function sellCar(customerId, car, agencyName) {
  // checking customer and agency's existence
  let agency = getAgencyByName(agencyName),
    customer = getCustomerById(customerId);
  if (!agency) {
    console.error(`Agency(${agencyName}) not found.`);
    return;
  }
  if (!customer) {
    console.error(`Customer with ID:(${customerId}) not found.`);
    return;
  }
  let carFound = false;
  // checking car availability
  agency.cars.forEach((brandObj) => {
    brandObj.models.forEach((model) => {
      if (model.carNumber === car.carNumber) {
        carFound = true;
        // fill all other details e.g. price
        car = model;
        // checking customer funds
        const price = car.price;
        if (customer.cash < price) {
          console.error(
            `Customer ${customer.name} has insufficient funds for this car`
          );
          return;
        }
        // todo: move car ownership from agency to customer
        customer.cash -= price;
        agency.cash += price;
        agency.credit -= price;
        const taxAuth = carMarket.taxesAuthority;
        taxAuth.numberOfTransactions++;
        taxAuth.sumOfAllTransactions += price;
        taxAuth.totalTaxesPaid += price * 0.17;
      }
    });
  });
}
function getTotalMarketRevenue() {}
