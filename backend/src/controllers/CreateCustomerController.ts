import { FastifyRequest, FastifyReply } from "fastify";
import { CreateCustomerService } from "../services/CreateCustomerService";

type CustomerProps = {
  name: string;
  email: string;
};

class CreateCustomerController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { name, email } = request.body as CustomerProps;

    const customerService = new CreateCustomerService();
    const customer = await customerService.execute({ name, email });

    reply.send(customer);
  }
}

export { CreateCustomerController };
