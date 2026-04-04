"use client";

import { trpc } from "@/trpc/client";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import { FilterCarousel } from "@/components/filter-carousel";

interface CategoriesSectionProps {
    categoryId?: string;
};

export const CategoriesSection = ({ categoryId }: CategoriesSectionProps) => {
    return (
        <Suspense fallback={<FilterCarousel isLoading value={categoryId} data={[]} />}>
            <ErrorBoundary fallback={<p>Error...</p>}>
                <CategoriesSectionSuspense categoryId={categoryId}/>
            </ErrorBoundary>
        </Suspense>
    )
}

const CategoriesSectionSuspense = ({ categoryId }: CategoriesSectionProps) => {
    const [categories] = trpc.categories.getMany.useSuspenseQuery();

    const data = categories.map(({ name, id }) => ({
        value: id,
        label: name,
    }));

    // console.log({ data })

    return <FilterCarousel onSelect={(x) => console.log(x)} value={categoryId} data={data}/>
};
