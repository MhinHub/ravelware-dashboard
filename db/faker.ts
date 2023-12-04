import { fakerID_ID as faker } from "@faker-js/faker";
import { useStore as store } from "@/store/useStore";

export const createFuelTransactions = ({
  from,
  to,
}: {
  from: any;
  to: any;
}) => {
  console.table(from, to);
  let data = () => {
    return {
      id: faker.number.int({ max: 100, min: 1 }),
      date: faker.date.between({ from, to }),
      station: faker.string.fromCharacters([
        "Station 1",
        "Station 2",
        "Station 3",
        "Station 4",
        "Station 5",
        "Station 6",
        "Station 7",
      ]),
      driver: faker.person.firstName(),
      license: faker.vehicle.vrm(),
      code: faker.vehicle.vin(),
      fuel: faker.string.fromCharacters([
        "Pertalite",
        "Pertamax",
        "Solar",
        "PertaMax Turbo",
        "Pertamina Dex",
      ]),
      usage: faker.number.int({ max: 100, min: 1 }),
      left: faker.number.int({ max: 150, min: 1 }),
    };
  };

  return faker.helpers.multiple(data, { count: 10 });
};
