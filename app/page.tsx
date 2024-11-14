import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MapPin, Star } from "lucide-react";
import Image from "next/image";

export default function Component() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-muted/50 py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Extend a Hand to Those in Need
              </h1>
              <p className="text-muted-foreground md:text-xl">
                Make a difference today with Donate Aid Society. Your donation
                can change lives. Support those who need it most and help us
                create positive change through acts of kindness and compassion
                in the world.
              </p>
              <Button size="lg" className="mt-4">
                Donate Now
              </Button>
            </div>
            <div className="relative aspect-video">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Volunteers helping in a community"
                className="object-cover rounded-lg"
                width={600}
                height={400}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-12 bg-background">
        <div className="container px-4 md:px-6">
          <h2 className="text-2xl font-bold tracking-tight mb-4">
            Mission & Vision
          </h2>
          <p className="text-muted-foreground max-w-3xl">
            Our mission is to create positive social change by supporting those
            in need. Our vision is to build a world where everyone has access to
            basic necessities and opportunities for growth. Through our various
            programs and initiatives, we strive to make a lasting impact in
            communities across the globe.
          </p>
        </div>
      </section>

      {/* Current Campaigns */}
      <section className="py-12 bg-muted/50">
        <div className="container px-4 md:px-6">
          <h2 className="text-2xl font-bold tracking-tight mb-8">
            Current Campaigns
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>
                  Celebrate with Purpose: Birthday Joy for Orphans
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Image
                  src="/placeholder.svg?height=200&width=400"
                  alt="Birthday celebration"
                  className="rounded-lg object-cover"
                  width={400}
                  height={200}
                />
                <p className="mt-4 text-sm text-muted-foreground">
                  Help us make birthdays special for children in orphanages.
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Support Now</Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>
                  Donate Slates and Pencils for Tribal Children
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Image
                  src="/placeholder.svg?height=200&width=400"
                  alt="Education supplies"
                  className="rounded-lg object-cover"
                  width={400}
                  height={200}
                />
                <p className="mt-4 text-sm text-muted-foreground">
                  Support education by providing basic learning materials.
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Donate Now</Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>New Wings with Entertainment and Fun</CardTitle>
              </CardHeader>
              <CardContent>
                <Image
                  src="/placeholder.svg?height=200&width=400"
                  alt="Entertainment activities"
                  className="rounded-lg object-cover"
                  width={400}
                  height={200}
                />
                <p className="mt-4 text-sm text-muted-foreground">
                  Bring joy through entertainment and recreational activities.
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Join Initiative</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 bg-background">
        <div className="container px-4 md:px-6">
          <h2 className="text-2xl font-bold tracking-tight text-center mb-8">
            How It Works
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            <Card className="text-center">
              <CardHeader>
                <CardTitle>Contribute</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Donors can easily contribute to causes they care about,
                  ensuring that donations reach those in need.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <CardTitle>Track Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our platform offers transparency, ensuring donors receive
                  regular updates about their donations make a difference.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-12 bg-muted/50">
        <div className="container px-4 md:px-6">
          <h2 className="text-2xl font-bold tracking-tight text-center mb-8">
            What our community says
          </h2>
          <div className="flex items-center justify-center mb-8">
            <span className="text-4xl font-bold">4.7</span>
            <div className="flex ml-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-primary" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 bg-background">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <div className="flex items-start space-x-2 text-muted-foreground">
                <MapPin className="w-5 h-5 mt-0.5" />
                <span>123 Charity Lane, Helping City, 12345</span>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>About Us</li>
                <li>Our Programs</li>
                <li>Get Involved</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
              <p className="text-muted-foreground mb-4">
                Stay updated with our latest campaigns and initiatives.
              </p>
              <Button variant="outline" className="w-full">
                Subscribe
              </Button>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-muted-foreground">
            <p>© 2024 Charity Organization. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
