import { prismaClient } from "@/service/database";
import { Customer } from "@prisma/client";

const get = async () => {
  const result = await prismaClient.customer.findMany();

  return result;
};

const getById = async (id: number) => {
  const result = await prismaClient.customer.findUnique({
    where: {
      intCustomerID: id,
    },
  });
  return result;
};

const post = async (customer: Customer) => {
  const result = await prismaClient.customer.create({
    data: customer,
  });

  return result;
};

const put = async (customer: Customer) => {
  const result = await prismaClient.customer.update({
    data: customer,
    where: {
      intCustomerID: customer.intCustomerID,
    },
  });

  return result;
};

const deleteById = async (id: number) => {
  const result = await prismaClient.customer.delete({
    where: {
      intCustomerID: id,
    },
  });

  return result;
};

export default {
  get,
  post,
  put,
  getById,
  deleteById,
};
