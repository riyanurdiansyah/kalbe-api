import { prismaClient } from "@/service/database";
import { Pembelian } from "@prisma/client";

const get = async () => {
  const result = await prismaClient.pembelian.findMany({
    include: {
      customer: true,
      product: true,
    },
  });

  return result;
};

const getById = async (id: number) => {
  const result = await prismaClient.pembelian.findUnique({
    where: {
      intSalesOrderID: id,
    },
  });
  return result;
};

const post = async (pembelian: Pembelian) => {
  const result = await prismaClient.pembelian.create({
    data: pembelian,
  });

  return result;
};

const put = async (pembelian: Pembelian) => {
  const result = await prismaClient.pembelian.update({
    data: pembelian,
    where: {
      intSalesOrderID: pembelian.intProductID,
    },
  });

  return result;
};

const deleteById = async (id: number) => {
  const result = await prismaClient.pembelian.delete({
    where: {
      intSalesOrderID: id,
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
