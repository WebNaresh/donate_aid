import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ChangeEvent, useState } from "react";
import { uploadToS3 } from "./action";

interface CampaignUpdatesProps {
  formData: {
    updates: {
      data: string;
      image_url: string;
    }[];
  };
  handleChange: (field: string, value: any) => void;
}

export default function CampaignUpdates({
  formData,
  handleChange,
}: CampaignUpdatesProps) {
  const [uploading, setUploading] = useState(false);
  const [updateText, setUpdateText] = useState("");
  const [updateImage, setUpdateImage] = useState("");

  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploading(true);
      try {
        const url = await uploadToS3(file);
        setUpdateImage(url);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
      setUploading(false);
    }
  };

  const addUpdate = () => {
    if (updateText || updateImage) {
      handleChange("updates", [
        ...formData.updates,
        { data: updateText, image_url: updateImage },
      ]);
      setUpdateText("");
      setUpdateImage("");
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="update_text">Update Text</Label>
        <Textarea
          id="update_text"
          value={updateText}
          onChange={(e) => setUpdateText(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="update_image">Update Image Upload</Label>
        <Input
          id="update_image"
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          disabled={uploading}
        />
        {uploading && <p>Uploading...</p>}
        {updateImage && (
          <div className="mt-2 relative">
            <img
              src={updateImage}
              alt="Update"
              className="w-full h-32 object-cover"
            />
            <Button
              variant="destructive"
              size="sm"
              className="absolute top-0 right-0"
              onClick={() => setUpdateImage("")}
            >
              Remove
            </Button>
          </div>
        )}
      </div>
      <Button onClick={addUpdate}>Add Update</Button>
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Updates</h3>
        {formData.updates.map((update, index) => (
          <div key={index} className="mt-2 p-2 border rounded">
            <p>{update.data}</p>
            {update.image_url && (
              <img
                src={update.image_url}
                alt={`Update ${index + 1}`}
                className="mt-2 w-full h-32 object-cover"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
