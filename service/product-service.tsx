import { prismaClient } from "@/service/database";
import { Product } from "@prisma/client";

const get = async () => {
  const result = await prismaClient.product.findMany();

  return result;
};

const getById = async (id: number) => {
  const result = await prismaClient.product.findUnique({
    where: {
      intProductID: id,
    },
  });
  return result;
};

const post = async (brand: Product) => {
  const result = await prismaClient.product.create({
    data: brand,
  });

  return result;
};

const put = async (product: Product) => {
  const result = await prismaClient.product.update({
    data: product,
    where: {
      intProductID: product.intProductID,
    },
  });

  return result;
};

const deleteById = async (id: number) => {
  const result = await prismaClient.product.delete({
    where: {
      intProductID: id,
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
