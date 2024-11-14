"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Calendar, PlusCircle, Users } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Campaign {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  participantsCount: number;
}

const fetchCampaigns = async (): Promise<Campaign[]> => {
  const response = await axios.get("/api/campaign");
  return response.data;
};

export default function CampaignPage() {
  const router = useRouter();
  const {
    data: campaigns,
    isLoading,
    isError,
  } = useQuery<Campaign[], Error>({
    queryKey: ["campaigns"],
    queryFn: fetchCampaigns,
  });

  const handleCreateCampaign = () => {
    router.push("/campaign/create");
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Campaigns</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, index) => (
            <Card key={index}>
              <CardHeader>
                <Skeleton className="h-6 w-2/3 mb-2" />
                <Skeleton className="h-4 w-full" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-20 w-full" />
              </CardContent>
              <CardFooter>
                <Skeleton className="h-4 w-1/2" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Failed to load campaigns. Please try again later.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Campaigns</h1>
        <Button onClick={handleCreateCampaign}>
          <PlusCircle className="mr-2 h-4 w-4" /> Create Campaign
        </Button>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {campaigns?.map((campaign) => (
          <Card key={campaign.id}>
            <CardHeader>
              <CardTitle>{campaign.title}</CardTitle>
              <CardDescription>{campaign.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center mb-2">
                <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {new Date(campaign.startDate).toLocaleDateString()} -{" "}
                  {new Date(campaign.endDate).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center">
                <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {campaign.participantsCount} participants
                </span>
              </div>
            </CardContent>
            <CardFooter>
              <Link href={`/campaign/${campaign.id}`} passHref>
                <Button variant="outline">View Details</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
      {campaigns?.length === 0 && (
        <p className="text-center text-muted-foreground mt-8">
          No campaigns found. Create a new campaign to get started!
        </p>
      )}
    </div>
  );
}
