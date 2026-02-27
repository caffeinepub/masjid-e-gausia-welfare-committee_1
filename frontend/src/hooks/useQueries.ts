import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Announcement, JamaCollection, ContactInquiry } from '../backend';

export function useGetAnnouncements() {
  const { actor, isFetching } = useActor();

  return useQuery<Announcement[]>({
    queryKey: ['announcements'],
    queryFn: async () => {
      if (!actor) return [];
      const results = await actor.getAnnouncements();
      return [...results].sort((a, b) => Number(b.date - a.date));
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddAnnouncement() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ title, body }: { title: string; body: string }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addAnnouncement(title, body);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['announcements'] });
    },
  });
}

export function useDeleteAnnouncement() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (announcementId: bigint) => {
      if (!actor) throw new Error('Actor not available');
      return actor.deleteAnnouncement(announcementId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['announcements'] });
    },
  });
}

export function useSubmitInquiry() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      name,
      email,
      message,
    }: {
      name: string;
      email: string;
      message: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.submitInquiry(name, email, message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contactInquiries'] });
    },
  });
}

export function useGetJamaCollections() {
  const { actor, isFetching } = useActor();

  return useQuery<JamaCollection[]>({
    queryKey: ['jamaCollections'],
    queryFn: async () => {
      if (!actor) return [];
      const results = await actor.getJamaCollections();
      return [...results].sort((a, b) => Number(b.date - a.date));
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddJamaCollection() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      amount,
      description,
      date,
    }: {
      amount: bigint;
      description: string;
      date: bigint;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addJamaCollection(amount, description, date);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jamaCollections'] });
    },
  });
}

export function useDeleteJamaCollection() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (collectionId: bigint) => {
      if (!actor) throw new Error('Actor not available');
      return actor.deleteJamaCollection(collectionId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jamaCollections'] });
    },
  });
}

export function useGetContactInquiries() {
  const { actor, isFetching } = useActor();

  return useQuery<ContactInquiry[]>({
    queryKey: ['contactInquiries'],
    queryFn: async () => {
      if (!actor) return [];
      const results = await actor.getContactInquiries();
      return [...results].sort((a, b) => Number(b.submittedAt - a.submittedAt));
    },
    enabled: !!actor && !isFetching,
  });
}
