import pembelianService from "@/service/pembelian-service";
import errorValidation from "@/validation/error-validation";
import { Pembelian } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const result = await pembelianService.get();

    return NextResponse.json(
      {
        code: 200,
        message: "Data has been listed",
        data: result,
      },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage = errorValidation.errorMessage(error);
    return NextResponse.json(errorMessage, {
      status: errorMessage["code"],
    });
  }
}

export async function POST(req: Request) {
  try {
    const pembelian: Pembelian = await req.json();
    pembelian.dtSalesOrder = new Date();
    pembelian.dtUpdated = new Date();

    const result = await pembelianService.post(pembelian);

    return NextResponse.json(
      {
        code: 201,
        message: "Data has been created",
        data: result,
      },
      { status: 201 }
    );
  } catch (error) {
    const errorMessage = errorValidation.errorMessage(error);
    return NextResponse.json(errorMessage, {
      status: errorMessage["code"],
    });
  }
}

export async function PUT(req: Request) {
  try {
    const pembelianNew: Pembelian = await req.json();

    const pembelianOld = await pembelianService.getById(
      pembelianNew.intSalesOrderID
    );

    if (pembelianOld === null) {
      return NextResponse.json(
        {
          code: 404,
          message: "Customer ID is not found",
        },
        { status: 404 }
      );
    }

    const pembelian: Pembelian = {
      intSalesOrderID: pembelianNew.intSalesOrderID,
      intProductID: pembelianNew.intProductID,
      intCustomerID: pembelianNew.intCustomerID,
      intQty: pembelianNew.intQty ?? pembelianOld.intQty,
      dtSalesOrder: pembelianOld.dtSalesOrder,
      dtUpdated: new Date(),
    };

    const result = await pembelianService.put(pembelian);

    return NextResponse.json(
      {
        code: 200,
        message: "Data has been updated",
        data: result,
      },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage = errorValidation.errorMessage(error);
    return NextResponse.json(errorMessage, {
      status: errorMessage["code"],
    });
  }
}
