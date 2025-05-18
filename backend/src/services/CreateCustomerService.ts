import prismaClient from "../prisma";
import { CreateCustomerProps } from "../../types/Customer";

class CreateCustomerService {
  async execute({ name, email }: CreateCustomerProps) {
    if (!name || !email) {
      throw new Error("Preencha todos os campos");
    }

    const customer = await prismaClient.customer.create({
      data: {
        name,
        email,
        status: false,
      },
    });

    return customer;
  }
}

export { CreateCustomerService };
