"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function AboutCampaignStep() {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "about",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSectionData, setNewSectionData] = useState("");
  const [newSectionImages, setNewSectionImages] = useState<string[]>([]);

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  const quillFormats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      setNewSectionImages([...newSectionImages, ...newImages]);
    }
  };

  const handleAddSection = () => {
    append({ data: newSectionData, image_url: newSectionImages });
    setNewSectionData("");
    setNewSectionImages([]);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {fields.map((field, index) => (
        <div
          key={field.id}
          className="space-y-4 p-6 border rounded-lg shadow-sm"
        >
          <FormField
            control={control}
            name={`about.${index}.data`}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold">
                  About Section {index + 1}
                </FormLabel>
                <FormControl>
                  <ReactQuill
                    theme="snow"
                    modules={quillModules}
                    formats={quillFormats}
                    value={field.value}
                    onChange={field.onChange}
                    className="bg-white min-h-[200px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name={`about.${index}.image_url`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Images</FormLabel>
                <div className="flex flex-wrap gap-2">
                  {field.value.map((url: string, imgIndex: number) => (
                    <Image
                      key={imgIndex}
                      src={url}
                      alt={`Image ${imgIndex + 1}`}
                      width={100}
                      height={100}
                      className="object-cover rounded"
                    />
                  ))}
                </div>
              </FormItem>
            )}
          />
          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={() => remove(index)}
            className="mt-2"
          >
            Remove Section
          </Button>
        </div>
      ))}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogTrigger asChild>
          <Button className="w-full">Add About Section</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New About Section</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <FormLabel>Content</FormLabel>
              <ReactQuill
                theme="snow"
                modules={quillModules}
                formats={quillFormats}
                value={newSectionData}
                onChange={setNewSectionData}
                className="bg-white min-h-[200px]"
              />
            </div>
            <div className="grid gap-2">
              <FormLabel>Images</FormLabel>
              <Input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {newSectionImages.map((url, index) => (
                  <Image
                    key={index}
                    src={url}
                    alt={`New image ${index + 1}`}
                    width={50}
                    height={50}
                    className="object-cover rounded"
                  />
                ))}
              </div>
            </div>
          </div>
          <Button onClick={handleAddSection}>Add Section</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
