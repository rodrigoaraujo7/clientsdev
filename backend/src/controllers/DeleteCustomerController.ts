import { FastifyRequest, FastifyReply } from "fastify";
import { DeleteCustomerService } from "../services/DeleteCustomerService";
import { DeleteCustomerProps } from "../../types/Customer";

class DeleteCustomerController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.query as DeleteCustomerProps;

    const deleteCustomer = new DeleteCustomerService();

    const customer = await deleteCustomer.execute({ id });

    reply.send(customer);
  }
}

export { DeleteCustomerController };
