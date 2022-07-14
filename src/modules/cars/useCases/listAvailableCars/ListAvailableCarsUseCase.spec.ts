import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase"

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory

describe("List Cars", () => {

    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory
        listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
    })


    it("Should be able to list all available cars", async () => {

    });

    it("Should be able to list all available cars by name", async () => {
        
        const car = await carsRepositoryInMemory.create({
            name: "Car2",
            description: "Car description",
            daily_rate: 160.00,
            license_plate: "GDB-1236",
            fine_amount: 70,
            brand: "Car_brand_test",
            category_id: "Category_id"
        });

        const cars = await listAvailableCarsUseCase.execute({
            brand: "Car_brand_test"
        });


        expect(cars).toEqual([car])
    });

    it("Should be able to list all available cars by brand", async () => {
        
        const car = await carsRepositoryInMemory.create({
            name: "Car3",
            description: "Car description",
            daily_rate: 160.00,
            license_plate: "GDB-1267",
            fine_amount: 70,
            brand: "Car_brand_test",
            category_id: "Category_id"
        });

        const cars = await listAvailableCarsUseCase.execute({
            name: "Car3"
        });


        expect(cars).toEqual([car])
    });

    
    it("Should be able to list all available cars by category", async () => {
        
        const car = await carsRepositoryInMemory.create({
            name: "Car3",
            description: "Car description",
            daily_rate: 160.00,
            license_plate: "GDB-1267",
            fine_amount: 70,
            brand: "Car_brand_test",
            category_id: "12345"
        });

        const cars = await listAvailableCarsUseCase.execute({
            category_id: "12345"
        });


        expect(cars).toEqual([car])
    });
});