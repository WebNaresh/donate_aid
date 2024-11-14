import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const {
    name,
    description,
    about,
    product_wants,
    images_videos_url,
    characteristics,
    donation_amount,
    end_date,
    user_id,
  } = await req.json();

  try {
    const newCampaign = await prisma.campaign.create({
      data: {
        name,
        description,
        about: {
          create: about,
        },
        product_wants: {
          create: product_wants,
        },
        images_videos_url,
        characteristics,
        donation_amount,
        end_date: new Date(end_date),
        user_id,
        status: "ACTIVE", // Add default status
        start_date: new Date(), // Add default start date
      },
    });

    return NextResponse.json(newCampaign, { status: 201 });
  } catch (error) {
    console.error("Error creating campaign:", error);
    return NextResponse.json(
      {
        error: "Failed to create campaign",
        details: (error as Error).message,
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const campaigns = await prisma.campaign.findMany({
      include: {
        about: true,
        product_wants: true,
        creator: true,
        Donation: true,
        Updates: true,
      },
    });
    return NextResponse.json(campaigns, { status: 200 });
  } catch (error) {
    console.error("Error fetching campaigns:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch campaigns",
        details: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
