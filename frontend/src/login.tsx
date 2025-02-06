import React from 'react';
import {
  Button,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@/components/ui';
import { useLogin } from '@/hooks/use-login';

export const Login: React.FC = () => {
  const { form, onSubmit } = useLogin();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={'absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-full max-w-sm space-y-2'}
      >
        <FormField
          control={form.control}
          name='name'
          rules={{
            validate: (value) => value.trim().length > 0 || 'Name is required',
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Name
                <span className={'text-red-500'}>*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder={'Enter your name'} {...field} />
              </FormControl>
              <FormDescription>Enter your name to join the chat. You can use any name you want.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button size={'sm'} type={'submit'}>
          Login
        </Button>
      </form>
    </Form>
  );
};
