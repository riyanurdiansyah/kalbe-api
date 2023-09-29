import { prismaClient } from "@/service/database";
import { Brand } from "@prisma/client";

const get = async () => {
  const result = await prismaClient.brand.findMany();

  return result;
};

const getById = async (id: number) => {
  const result = await prismaClient.brand.findUnique({
    where: {
      intBrandID: id,
    },
  });
  return result;
};

const post = async (brand: Brand) => {
  const result = await prismaClient.brand.create({
    data: brand,
  });

  return result;
};

const put = async (brand: Brand) => {
  const result = await prismaClient.brand.update({
    data: brand,
    where: {
      intBrandID: brand.intBrandID,
    },
  });

  return result;
};

const deleteById = async (id: number) => {
  const result = await prismaClient.brand.delete({
    where: {
      intBrandID: id,
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
