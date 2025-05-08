// Example file structure, app/[...page]/page.tsx
// You could alternatively use src/app/[...page]/page.tsx
import { builder } from "@builder.io/sdk";
import { RenderBuilderContent } from "../../components/builder";

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
    .get("page", {
      userAttributes: {
        urlPath: "/" + ((await props?.params).page?.join("/") || ""),
      },
      prerender: false,
    })
    .toPromise();

  return <RenderBuilderContent content={content} model={model} />;
}
