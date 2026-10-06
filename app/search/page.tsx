import SearchPageContent from "./SearchPageContent";

type SearchPageProps = {
  searchParams: Promise<{
    q?: string;
  }>;
};

export default async function SearchPage({
  searchParams,
}: SearchPageProps) {
  const params = await searchParams;
  const query = params.q || "";

  return <SearchPageContent query={query} />;
}
