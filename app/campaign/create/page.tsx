"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

const campaignSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  donation_amount: z
    .string()
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Please enter a valid amount greater than 0",
    }),
  end_date: z.date().min(new Date(), "End date must be in the future"),
  characteristics: z
    .array(z.string())
    .min(1, "Add at least one characteristic"),
  about: z.array(
    z.object({
      data: z.string().min(1, "About section cannot be empty"),
      image_url: z.array(z.string().url("Please enter a valid URL")).optional(),
    })
  ),
  product_wants: z.array(
    z.object({
      name: z.string().min(1, "Product name is required"),
      total_quantity_want: z
        .string()
        .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
          message: "Please enter a valid quantity",
        }),
      price_per_unit: z
        .string()
        .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
          message: "Please enter a valid price",
        }),
      product_image_url: z
        .array(z.string().url("Please enter a valid URL"))
        .optional(),
    })
  ),
  status: z.enum(["ACTIVE", "INACTIVE"]),
});

type CampaignFormValues = z.infer<typeof campaignSchema>;

const steps = [
  {
    title: "Basic Info",
    fields: ["name", "description", "donation_amount", "end_date"],
  },
  { title: "Characteristics", fields: ["characteristics"] },
  { title: "About Campaign", fields: ["about"] },
  { title: "Products", fields: ["product_wants"] },
  { title: "Media & Status", fields: ["images_videos_url", "status"] },
];

export default function CreateCampaignForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [files, setFiles] = useState<File[]>([]);
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

  const {
    fields: aboutFields,
    append: appendAbout,
    remove: removeAbout,
  } = useFieldArray({
    control: form.control,
    name: "about",
  });

  const {
    fields: productFields,
    append: appendProduct,
    remove: removeProduct,
  } = useFieldArray({
    control: form.control,
    name: "product_wants",
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
      setFiles([]);
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const currentStepFields = steps[currentStep].fields;

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>
          Create New Campaign - Step {currentStep + 1}:{" "}
          {steps[currentStep].title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CreateCampaignForm />
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
