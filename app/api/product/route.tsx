import productService from "@/service/product-service";
import errorValidation from "@/validation/error-validation";
import { Product } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const result = await productService.get();

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
    const product: Product = await req.json();
    product.dtInserted = new Date();
    product.dtUpdated = new Date();

    const result = await productService.post(product);

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
    const dproductNew: Product = await req.json();

    const productOld = await productService.getById(dproductNew.intProductID);

    if (productOld === null) {
      return NextResponse.json(
        {
          code: 404,
          message: "Customer ID is not found",
        },
        { status: 404 }
      );
    }

    const pembelian: Product = {
      intProductID: dproductNew.intProductID,
      intBrandID: dproductNew.intBrandID,
      txtProductCode: dproductNew.txtProductCode,
      txtProductName: dproductNew.txtProductName,
      dtInserted: productOld.dtInserted,
      dtUpdated: new Date(),
    };

    const result = await productService.put(pembelian);

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
