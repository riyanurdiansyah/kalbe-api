import brandService from "@/service/brand-service";
import errorValidation from "@/validation/error-validation";
import { Brand } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const result = await brandService.get();

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
    const brand: Brand = await req.json();
    brand.dtInserted = new Date();
    brand.dtUpdated = new Date();

    const result = await brandService.post(brand);

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
    const brandNew: Brand = await req.json();

    const brandOld = await brandService.getById(brandNew.intBrandID);

    if (brandOld === null) {
      return NextResponse.json(
        {
          code: 404,
          message: "Brand ID is not found",
        },
        { status: 404 }
      );
    }

    const brand: Brand = {
      intBrandID: brandNew.intBrandID,
      txtBrandName: brandNew.txtBrandName ?? brandOld.txtBrandName,
      dtInserted: brandNew.dtInserted,
      dtUpdated: new Date(),
    };

    const result = await brandService.put(brand);

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
