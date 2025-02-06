import React from 'react';
import {
  Button,
  Card,
  CardContent,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Textarea,
} from '@/components/ui';
import { useChat } from '@/hooks/use-chat';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export const App: React.FC = () => {
  const { form, onSubmit, receiveMessage, handleKeyDown } = useChat();

  return (
    <main className={'container mx-auto px-4 my-2'}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className={'space-y-2'}>
          <FormField
            control={form.control}
            rules={{
              validate: (value) => value.trim().length > 0 || 'Message is required',
            }}
            name='message'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Message
                  <span className={'text-red-500'}>*</span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={'Type your message here'}
                    className={'w-full'}
                    onKeyDown={handleKeyDown}
                    rows={5}
                    {...field}
                  />
                </FormControl>
                <FormDescription>Type your message here and send it to the chat.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type={'submit'}>Send</Button>
        </form>
      </Form>

      <section className={'mt-4'}>
        <Card className={'shadow-none max-w-xl'}>
          <CardContent className={'p-1 flex gap-2'}>
            <UserAvatar name={'John Doe'} />

            <p>{receiveMessage || 'No messages yet. Send a message to start the conversation.'}</p>
          </CardContent>
        </Card>
      </section>
    </main>
  );
};

const UserAvatar: React.FC<{ name: string }> = ({ name }) => {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('');

  return (
    <Avatar className={'border rounded-sm'}>
      <AvatarFallback className={'rounded-sm'}>{initials}</AvatarFallback>
    </Avatar>
  );
};
