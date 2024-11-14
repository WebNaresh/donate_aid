"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CampaignForm from "./_components/campaign-form";

export default function CreateCampaignForm() {
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Create New Campaign - Step</CardTitle>
      </CardHeader>
      <CardContent>
        <CampaignForm />
      </CardContent>
    </Card>
  );
}
