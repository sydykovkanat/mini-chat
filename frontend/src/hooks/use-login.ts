import { useForm } from 'react-hook-form';
import { useAuth } from '@/context/auth-context';

export const useLogin = () => {
  const { login } = useAuth();

  const form = useForm({
    values: {
      name: '',
    },
    defaultValues: {
      name: '',
    },
  });

  const onSubmit = (data: { name: string }) => {
    login(data.name);
  };

  return { onSubmit, form };
};
