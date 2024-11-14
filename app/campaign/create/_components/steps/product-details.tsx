import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChangeEvent, useState } from "react";
import { uploadToS3 } from "./action";

interface ProductDetailsProps {
  formData: any;
  handleChange: (field: string, value: any) => void;
}

export default function ProductDetails({
  formData,
  handleChange,
}: ProductDetailsProps) {
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploading(true);
      try {
        const url = await uploadToS3(file);
        handleChange("product", {
          ...formData.product,
          product_image_url: url,
        });
      } catch (error) {
        console.error("Error uploading file:", error);
      }
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="product_name">Product Name</Label>
        <Input
          id="product_name"
          value={formData.product.name}
          onChange={(e) =>
            handleChange("product", {
              ...formData.product,
              name: e.target.value,
            })
          }
        />
      </div>
      <div>
        <Label htmlFor="total_quantity_want">Quantity</Label>
        <Input
          id="total_quantity_want"
          type="number"
          value={formData.product.total_quantity_want}
          onChange={(e) =>
            handleChange("product", {
              ...formData.product,
              total_quantity_want: parseInt(e.target.value),
            })
          }
        />
      </div>
      <div>
        <Label htmlFor="price_per_unit">Price per Unit</Label>
        <Input
          id="price_per_unit"
          type="number"
          value={formData.product.price_per_unit}
          onChange={(e) =>
            handleChange("product", {
              ...formData.product,
              price_per_unit: parseFloat(e.target.value),
            })
          }
        />
      </div>
      <div>
        <Label htmlFor="product_image">Product Image Upload</Label>
        <Input
          id="product_image"
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          disabled={uploading}
        />
        {uploading && <p>Uploading...</p>}
        {formData.product_wants[0]?.product_image_url && (
          <div className="mt-2 relative">
            <img
              src={formData.product_wants[0]?.product_image_url}
              alt="Product"
              className="w-full h-32 object-cover"
            />
            <Button
              variant="destructive"
              size="sm"
              className="absolute top-0 right-0"
              onClick={() =>
                handleChange("product_wants", {
                  ...formData.product_wants,
                  product_image_url: "",
                })
              }
            >
              Remove
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
