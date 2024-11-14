"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import AboutCampaign from "./steps/about-campaign";
import { createCampaign } from "./steps/action";
import BasicInfo from "./steps/basic-info";
import CampaignDetails from "./steps/campaign-details";
import CampaignUpdates from "./steps/campaign-updates";
import ProductDetails from "./steps/product-details";
import Summary from "./steps/summary";

export default function CampaignForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "ACTIVE",
    images_videos_url: [],
    characteristics: "",
    donation_amount: 0,
    start_date: new Date().toISOString().split("T")[0],
    end_date: "",
    data: "",
    image_url: "",
    product: {
      name: "",
      total_quantity_want: 0,
      price_per_unit: 0,
      product_image_url: "",
    },
    updates: [],
  });

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      const result = await createCampaign(formData);
      console.log("Campaign created:", result);
      // Handle success (e.g., show a success message, redirect)
    } catch (error) {
      console.error("Error creating campaign:", error);
      // Handle error (e.g., show an error message)
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <BasicInfo formData={formData} handleChange={handleChange} />;
      case 2:
        return (
          <CampaignDetails formData={formData} handleChange={handleChange} />
        );
      case 3:
        return (
          <AboutCampaign formData={formData} handleChange={handleChange} />
        );
      case 4:
        return (
          <ProductDetails formData={formData} handleChange={handleChange} />
        );
      case 5:
        return (
          <CampaignUpdates formData={formData} handleChange={handleChange} />
        );
      case 6:
        return <Summary formData={formData} />;
      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Create Campaign - Step {step} of 6</CardTitle>
      </CardHeader>
      <CardContent>{renderStep()}</CardContent>
      <CardFooter className="flex justify-between">
        {step > 1 && (
          <Button onClick={() => setStep((prev) => prev - 1)}>Back</Button>
        )}
        {step < 6 && (
          <Button onClick={() => setStep((prev) => prev + 1)}>Next</Button>
        )}
        {step === 6 && <Button onClick={handleSubmit}>Submit Campaign</Button>}
      </CardFooter>
    </Card>
  );
}
