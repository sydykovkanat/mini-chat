import { useForm } from 'react-hook-form';

export const useChat = () => {
  const form = useForm({
    values: {
      message: '',
    },
    defaultValues: {
      message: '',
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
    form.reset();
  };

  return { form, onSubmit };
};
