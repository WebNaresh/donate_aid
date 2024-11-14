import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFieldArray, useFormContext } from "react-hook-form";

export default function ProductsStep() {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "product_wants",
  });

  return (
    <div className="space-y-4">
      {fields.map((field, index) => (
        <div key={field.id} className="space-y-4 p-4 border rounded-md">
          <FormField
            control={control}
            name={`product_wants.${index}.name`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name={`product_wants.${index}.total_quantity_want`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity Needed</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name={`product_wants.${index}.price_per_unit`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price per Unit</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="button" variant="outline" size="sm" onClick={() => remove(index)}>
            Remove Product
          </Button>
        </div>
      ))}
      <Button type="button" onClick={() => append({ name: "", total_quantity_want: "", price_per_unit: "", product_image_url: [] })}>
        Add Product
      </Button>
    </div>
  );
}
