import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { useFormContext } from "react-hook-form";

export default function CharacteristicsStep() {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name="characteristics"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Characteristics</FormLabel>
          <FormControl>
            <div className="space-y-2">
              <div className="flex flex-wrap gap-2">
                {field.value.map((characteristic: string, index: number) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="text-sm py-1 pl-2 pr-1"
                  >
                    {characteristic}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 pl-1"
                      onClick={() => {
                        const newCharacteristics = field.value.filter(
                          (_: any, i: number) => i !== index
                        );
                        field.onChange(newCharacteristics);
                      }}
                    >
                      <X className="h-3 w-3" />
                      <span className="sr-only">Remove characteristic</span>
                    </Button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="e.g., Eco-friendly"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      const input = e.currentTarget;
                      if (input.value.trim()) {
                        field.onChange([...field.value, input.value.trim()]);
                        input.value = "";
                      }
                    }
                  }}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    const input = e.currentTarget
                      .previousElementSibling as HTMLInputElement;
                    if (input.value.trim()) {
                      field.onChange([...field.value, input.value.trim()]);
                      input.value = "";
                    }
                  }}
                >
                  Add
                </Button>
              </div>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
