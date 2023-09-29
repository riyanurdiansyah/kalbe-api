import customerService from "@/service/customer-service";
import errorValidation from "@/validation/error-validation";
import { Customer } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const result = await customerService.get();

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
    const customer: Customer = await req.json();
    customer.dtInserted = new Date();
    customer.dtUpdated = new Date();

    const result = await customerService.post(customer);

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
    const customerNew: Customer = await req.json();

    const customerOld = await customerService.getById(
      customerNew.intCustomerID
    );

    if (customerOld === null) {
      return NextResponse.json(
        {
          code: 404,
          message: "Customer ID is not found",
        },
        { status: 404 }
      );
    }

    const customer: Customer = {
      intCustomerID: customerNew.intCustomerID,
      bitGender: customerNew.bitGender ?? customerOld.bitGender,
      txtCustomerAddress:
        customerNew.txtCustomerAddress ?? customerOld.txtCustomerAddress,
      txtCustomerName:
        customerNew.txtCustomerName ?? customerOld.txtCustomerName,
      dtInserted: customerNew.dtInserted,
      dtUpdated: new Date(),
    };

    const result = await customerService.put(customer);

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
