import { CampaignFormData } from "../campaign-form";

interface FormData {
  name: string;
  description: string;
  status: string;
  characteristics: string[];
  donation_amount: number;
  start_date: string;
  end_date: string;
  images_videos_url: string[];
  about: { data: string; image_url?: string }[];
  product_wants: {
    name: string;
    total_quantity_want: number;
    price_per_unit: number;
    product_image_url?: string;
  }[];
  updates: any[];
}

export default function Summary({ formData }: { formData: CampaignFormData }) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Campaign Summary</h2>
      <div>
        <h3 className="text-lg font-semibold">Basic Information</h3>
        <p>Name: {formData.name}</p>
        <p>Description: {formData.description}</p>
        <p>Status: {formData.status}</p>
      </div>
      <div>
        <h3 className="text-lg font-semibold">Campaign Details</h3>
        <p>Characteristics: {formData.characteristics.join(", ")}</p>
        <p>Donation Amount: ${formData.donation_amount}</p>
        <p>Start Date: {formData.start_date}</p>
        <p>End Date: {formData.end_date}</p>
        <p>Media: {formData.images_videos_url.length} files uploaded</p>
      </div>
      <div>
        <h3 className="text-lg font-semibold">About the Campaign</h3>
        <p>Details: {formData.about[0]?.data}</p>
        {formData.about[0]?.image_url && <p>Image uploaded</p>}
      </div>
      <div>
        <h3 className="text-lg font-semibold">Product Details</h3>
        <p>Name: {formData.product_wants[0]?.name}</p>
        <p>Quantity: {formData.product_wants[0]?.total_quantity_want}</p>
        <p>Price per Unit: ${formData.product_wants[0]?.price_per_unit}</p>
        {formData.product_wants[0]?.product_image_url && (
          <p>Product image uploaded</p>
        )}
      </div>
      <div>
        <h3 className="text-lg font-semibold">Campaign Updates</h3>
        <p>{formData.updates.length} updates added</p>
      </div>
    </div>
  );
}
