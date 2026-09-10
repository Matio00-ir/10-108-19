import { Container } from "@/components/ui/Container";
import { ProductGridSkeleton, Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <Container className="py-6">
      <Skeleton className="h-44 w-full rounded-2xl sm:h-64" />
      <div className="mt-8 grid grid-cols-3 gap-3 sm:grid-cols-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-24 rounded-xl" />
        ))}
      </div>
      <div className="mt-10">
        <Skeleton className="mb-4 h-6 w-40" />
        <ProductGridSkeleton count={5} />
      </div>
    </Container>
  );
}
