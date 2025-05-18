import prismaClient from "../prisma";
import { DeleteCustomerProps } from "../../types/Customer";

class DeleteCustomerService {
  async execute({ id }: DeleteCustomerProps) {
    if (!id) {
      throw new Error("Solicitação inválida");
    }

    const findCustomer = await prismaClient.customer.findFirst({
      where: {
        id,
      },
    });

    if (!findCustomer) {
      throw new Error("Cliente não encontrado");
    }

    await prismaClient.customer.delete({
      where: {
        id: findCustomer.id,
      },
    });

    return { message: "Deletado com sucesso" };
  }
}

export { DeleteCustomerService };
