import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { createSkill, type CreateSkillPayload } from '../../../skillsApi';

export function useCreateSkill() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateSkillPayload) => createSkill(data),
        onSuccess: () => {
            // Refresh every cached skills list (keyed ["skills", search]) so the
            // new skill shows up in the mention picker immediately.
            queryClient.invalidateQueries({ queryKey: ['skills'] });
            toast('Skill added', { type: 'success' });
        },
        onError: (error: any) => {
            const detail = error.response?.data?.detail;
            toast(typeof detail === 'string' ? detail : 'Could not add skill', { type: 'error' });
        },
    });
}
