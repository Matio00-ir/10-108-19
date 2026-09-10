import { Container } from "@/components/ui/Container";
import { ProductGridSkeleton, Skeleton } from "@/components/ui/Skeleton";

export default function CategoryLoading() {
  return (
    <Container className="py-6">
      <Skeleton className="h-4 w-56" />
      <Skeleton className="mt-4 h-7 w-48" />
      <Skeleton className="mt-2 h-4 w-full max-w-xl" />
      <div className="mt-6 flex gap-6">
        <Skeleton className="hidden h-[520px] w-64 shrink-0 rounded-xl lg:block" />
        <div className="min-w-0 flex-1">
          <Skeleton className="h-10 w-full max-w-xs" />
          <div className="mt-4">
            <ProductGridSkeleton count={9} />
          </div>
        </div>
      </div>
    </Container>
  );
}
