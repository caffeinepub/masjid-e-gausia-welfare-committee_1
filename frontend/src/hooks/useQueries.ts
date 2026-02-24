import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Announcement } from '../backend';

export function useGetAnnouncements() {
    const { actor, isFetching } = useActor();

    return useQuery<Announcement[]>({
        queryKey: ['announcements'],
        queryFn: async () => {
            if (!actor) return [];
            const results = await actor.getAnnouncements();
            // Sort by date descending (most recent first)
            return [...results].sort((a, b) => {
                const dateA = Number(a.date);
                const dateB = Number(b.date);
                return dateB - dateA;
            });
        },
        enabled: !!actor && !isFetching,
    });
}

export function useSubmitInquiry() {
    const { actor } = useActor();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ name, email, message }: { name: string; email: string; message: string }) => {
            if (!actor) throw new Error('Actor not initialized');
            await actor.submitInquiry(name, email, message);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['contactInquiries'] });
        },
    });
}
