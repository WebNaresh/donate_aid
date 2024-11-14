import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { uploadToS3 } from "./action";

interface FormData {
  images_videos_url: string[];
  characteristics: string;
  donation_amount: number;
  start_date: string;
  end_date: string;
}

interface CampaignDetailsProps {
  formData: FormData;
  handleChange: (
    field: keyof FormData,
    value: string | number | string[]
  ) => void;
}

export default function CampaignDetails({
  formData,
  handleChange,
}: CampaignDetailsProps) {
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setUploading(true);
      const uploadedUrls = [];
      for (const file of files) {
        try {
          const url = await uploadToS3(file);
          uploadedUrls.push(url);
        } catch (error) {
          console.error("Error uploading file:", error);
        }
      }
      handleChange("images_videos_url", [
        ...formData.images_videos_url,
        ...uploadedUrls,
      ]);
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="media">Media Upload</Label>
        <Input
          id="media"
          type="file"
          multiple
          accept="image/*,video/*"
          onChange={handleFileUpload}
          disabled={uploading}
        />
        {uploading && <p>Uploading...</p>}
        <div className="grid grid-cols-3 gap-2 mt-2">
          {formData.images_videos_url.map((url, index) => (
            <div key={index} className="relative">
              {url.includes("image") ? (
                <Image
                  src={url}
                  alt={`Uploaded ${index}`}
                  className="w-full h-32 object-cover"
                />
              ) : (
                <video
                  src={url}
                  className="w-full h-32 object-cover"
                  controls
                />
              )}
              <Button
                variant="destructive"
                size="sm"
                className="absolute top-0 right-0"
                onClick={() =>
                  handleChange(
                    "images_videos_url",
                    formData.images_videos_url.filter((_, i) => i !== index)
                  )
                }
              >
                Remove
              </Button>
            </div>
          ))}
        </div>
      </div>
      <div>
        <Label htmlFor="characteristics">Characteristics</Label>
        <Textarea
          id="characteristics"
          value={formData.characteristics}
          onChange={(e) => handleChange("characteristics", e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="donation_amount">Donation Amount</Label>
        <Input
          id="donation_amount"
          type="number"
          value={formData.donation_amount}
          onChange={(e) =>
            handleChange("donation_amount", parseFloat(e.target.value))
          }
        />
      </div>
      <div>
        <Label htmlFor="start_date">Start Date</Label>
        <Input
          id="start_date"
          type="date"
          value={formData.start_date}
          onChange={(e) => handleChange("start_date", e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="end_date">End Date</Label>
        <Input
          id="end_date"
          type="date"
          value={formData.end_date}
          onChange={(e) => handleChange("end_date", e.target.value)}
        />
      </div>
    </div>
  );
}
