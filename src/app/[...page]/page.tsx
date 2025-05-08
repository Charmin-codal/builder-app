// Example file structure, app/[...page]/page.tsx
// You could alternatively use src/app/[...page]/page.tsx
import { builder } from "@builder.io/sdk";
import { RenderBuilderContent } from "../../../components/builder";

// Replace with your Public API Key
builder.init("93728a2bb3a64ef7b300f7fb72593d14");

interface PageProps {
	params: Promise<{
		page?: string[];
	}>;
	searchParams?: Promise<Record<string, string | string[]>>;
}

export default async function Page(props: PageProps) {
  const model = "page";
  const content = await builder
    // Get the page content from Builder with the specified options
    .get("page", {
      userAttributes: {
        // Use the page path specified in the URL to fetch the content
        urlPath: "/" + ((await props?.params)?.page?.join("/") || ""),
      },
      // Set prerender to false to return JSON instead of HTML
      prerender: false,
    })
    // Convert the result to a promise
    .toPromise();

  return (
    <>
      {/* Render the Builder page */}
      <RenderBuilderContent content={content} model={model} />
    </>
  );
}