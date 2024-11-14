import { z } from "zod";

export const campaignSchema = z.object({
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

export type CampaignFormValues = z.infer<typeof campaignSchema>;
