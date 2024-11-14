import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { uploadToS3 } from "./action";

interface CampaignFormData {
  data: string;
  image_url: string;
}

interface AboutCampaignProps {
  formData: CampaignFormData;
  handleChange: (field: keyof CampaignFormData, value: string) => void;
}

export default function AboutCampaign({
  formData,
  handleChange,
}: AboutCampaignProps) {
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploading(true);
      try {
        const url = await uploadToS3(file);
        handleChange("image_url", url);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="data">Campaign Details</Label>
        <Textarea
          id="data"
          value={formData.data}
          onChange={(e) => handleChange("data", e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="image">Image Upload</Label>
        <Input
          id="image"
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          disabled={uploading}
        />
        {uploading && <p>Uploading...</p>}
        {formData.image_url && (
          <div className="mt-2 relative">
            <Image
              src={formData.image_url}
              alt="Uploaded"
              className="w-full h-32 object-cover"
            />
            <Button
              variant="destructive"
              size="sm"
              className="absolute top-0 right-0"
              onClick={() => handleChange("image_url", "")}
            >
              Remove
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
