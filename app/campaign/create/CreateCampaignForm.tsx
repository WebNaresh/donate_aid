"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { CampaignFormValues, campaignSchema } from "./campaignSchema";
import AboutCampaignStep from "./steps/AboutCampaignStep";
import BasicInfoStep from "./steps/BasicInfoStep";
import CharacteristicsStep from "./steps/CharacteristicsStep";
import ProductsStep from "./steps/ProductsStep";

const steps = [
  {
    title: "Basic Info",
    component: BasicInfoStep,
    fields: ["name", "description"],
  },
  {
    title: "Characteristics",
    component: CharacteristicsStep,
    fields: ["characteristics"],
  },
  { title: "About Campaign", component: AboutCampaignStep, fields: ["about"] },
  { title: "Products", component: ProductsStep, fields: ["product_wants"] },
];

export default function CreateCampaignForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const queryClient = useQueryClient();

  const form = useForm<CampaignFormValues>({
    resolver: zodResolver(campaignSchema),
    defaultValues: {
      name: "",
      description: "",
      donation_amount: "",
      characteristics: [],
      about: [{ data: "", image_url: [] }],
      product_wants: [
        {
          name: "",
          total_quantity_want: "",
          price_per_unit: "",
          product_image_url: [],
        },
      ],
      status: "ACTIVE",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: CampaignFormValues) => {
      // Here you would typically send the data to your API
      console.log(data);
      // Simulating an API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["campaigns"] });
      toast({
        title: "Success",
        description: "Campaign created successfully",
      });
      form.reset();
      setCurrentStep(0);
    },
    onError: (error) => {
      console.error("Mutation error:", error);
      toast({
        title: "Error",
        description: "Failed to create campaign. Please try again.",
        variant: "destructive",
      });
    },
  });

  function onSubmit(data: CampaignFormValues) {
    mutation.mutate(data);
  }

  const StepComponent = steps[currentStep].component;

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>
          Create New Campaign - Step {currentStep + 1}:{" "}
          {steps[currentStep].title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <StepComponent />
          </form>
        </FormProvider>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          type="button"
          onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
          disabled={currentStep === 0}
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>
        <Button
          type="button"
          onClick={() => {
            const fields = steps[currentStep].fields;
            const isValid = fields.every((field) => {
              return form.getFieldState(field as any).invalid === false;
            });
            if (isValid) {
              if (currentStep === steps.length - 1) {
                form.handleSubmit(onSubmit)();
              } else {
                setCurrentStep((prev) => Math.min(steps.length - 1, prev + 1));
              }
            } else {
              form.trigger(fields as any);
            }
          }}
        >
          {currentStep === steps.length - 1 ? (
            mutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              "Create Campaign"
            )
          ) : (
            <>
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
