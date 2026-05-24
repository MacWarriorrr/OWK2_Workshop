import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { getSubmissions, createSubmission, deleteSubmission, type Submission } from "../data/submissions";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { toast } from "sonner";
import { Loader2, Trash2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const Route = createFileRoute("/uitwerkingen")({
  loader: async () => {
    const submissions = await getSubmissions();
    return { submissions };
  },
  component: UitwerkingenPage,
});

const formSchema = z.object({
  description: z.string().min(10, {
    message: "Beschrijving moet minimaal 10 karakters lang zijn.",
  }),
  image: z
    .instanceof(File, { message: "Een afbeelding is verplicht." })
    .refine((file) => file.size <= 5000000, "Maximale bestandsgrootte is 5MB.")
    .refine(
      (file) =>
        ["image/jpeg", "image/png", "image/webp"].includes(file.type),
      "Alleen .jpg, .png en .webp formaten zijn toegestaan."
    ),
});

function UitwerkingenPage() {
  const { language } = useLanguage();
  const { submissions } = Route.useLoaderData();
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      image: undefined as unknown as File,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("description", values.description);
      formData.append("image", values.image);

      await createSubmission({ data: formData });

      toast.success(language === 'nl' ? "Uitwerking succesvol geüpload!" : "Result successfully uploaded!");
      form.reset();

      // Refresh the page data
      await router.invalidate();
    } catch (error) {
      console.error(error);
      toast.error(language === 'nl' ? "Er is iets misgegaan bij het uploaden." : "Something went wrong during upload.");
    } finally {
      setIsUploading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!window.confirm(language === 'nl' ? "Weet je zeker dat je deze uitwerking wilt verwijderen?" : "Are you sure you want to delete this result?")) return;

    try {
      await deleteSubmission({ data: id });
      toast.success(language === 'nl' ? "Uitwerking succesvol verwijderd!" : "Result successfully deleted!");
      await router.invalidate();
    } catch (error) {
      console.error(error);
      toast.error(language === 'nl' ? "Er is iets misgegaan bij het verwijderen." : "Something went wrong during deletion.");
    }
  }

  return (
    <div className="container mx-auto py-10 px-4 md:px-8 max-w-6xl">
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">
            {language === 'nl' ? 'Galerij van Uitwerkingen' : 'Gallery of Results'}
          </h1>
          <p className="text-muted-foreground text-lg">
            {language === 'nl' ? 'Bekijk de creaties van anderen en deel jouw eigen fysieke workshop-uitwerking.' : 'View the creations of others and share your own physical workshop result.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <Card className="sticky top-24 shadow-sm border-border/50">
              <CardHeader>
                <CardTitle>{language === 'nl' ? 'Deel jouw creatie' : 'Share your creation'}</CardTitle>
                <CardDescription>
                  {language === 'nl' ? 'Upload een foto van je uitwerking en vertel ons kort hoe je het hebt gemaakt of wat je hebt geleerd.' : 'Upload a photo of your result and tell us briefly how you made it or what you learned.'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <FormField
                      control={form.control}
                      name="image"
                      render={({ field: { value, onChange, ...fieldProps } }) => (
                        <FormItem>
                          <FormLabel>{language === 'nl' ? 'Foto (Max 5MB)' : 'Photo (Max 5MB)'}</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                type="file"
                                id="image-upload"
                                accept="image/jpeg, image/png, image/webp"
                                className="hidden"
                                onChange={(e) =>
                                  onChange(e.target.files && e.target.files[0])
                                }
                                {...fieldProps}
                              />
                              <label
                                htmlFor="image-upload"
                                className="flex h-10 w-full cursor-pointer items-center justify-start rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground"
                              >
                                {value ? (value as any).name : (language === 'nl' ? "Bestand kiezen..." : "Choose file...")}
                              </label>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{language === 'nl' ? 'Beschrijving' : 'Description'}</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder={language === 'nl' ? "Tijdens de workshop heb ik geleerd dat..." : "During the workshop I learned that..."}
                              className="resize-none h-32"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            {language === 'nl' ? 'Minimaal 10 karakters.' : 'Minimum 10 characters.'}
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full" disabled={isUploading}>
                      {isUploading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          {language === 'nl' ? 'Uploaden...' : 'Uploading...'}
                        </>
                      ) : (
                        language === 'nl' ? "Upload Uitwerking" : "Upload Result"
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            {submissions.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-12 text-center border rounded-xl border-dashed bg-muted/20">
                <p className="text-muted-foreground text-lg mb-2">
                  {language === 'nl' ? 'Er zijn nog geen uitwerkingen gedeeld.' : 'No results have been shared yet.'}
                </p>
                <p className="text-sm text-muted-foreground">
                  {language === 'nl' ? 'Wees de eerste die een creatie uploadt!' : 'Be the first to upload a creation!'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {submissions.map((sub: Submission) => (
                  <Card key={sub.id} className="overflow-hidden group hover:shadow-md transition-all duration-300 border-border/50 bg-card relative">
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleDelete(sub.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <div className="aspect-[4/3] overflow-hidden bg-muted relative">
                      <img
                        src={sub.image_url}
                        alt={sub.description}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                    <CardContent className="p-4">
                      <p className="text-sm line-clamp-3 text-card-foreground">
                        {sub.description}
                      </p>
                      <p className="text-xs text-muted-foreground mt-3 font-medium">
                        {new Date(sub.created_at).toLocaleDateString("nl-NL", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
