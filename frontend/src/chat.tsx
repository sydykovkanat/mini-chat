import React from 'react';
import {
  Avatar,
  AvatarFallback,
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
import { useAuth } from '@/context/auth-context';
import { AnimatePresence, motion } from 'framer-motion';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Loader } from 'lucide-react';

export const Chat: React.FC = () => {
  const { form, onSubmit, messages, handleKeyDown, isLoading } = useChat();
  const { name } = useAuth();

  if (isLoading) {
    return (
      <div className={'absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-center'}>
        <Loader className={'size-5 text-muted-foreground animate-spin mx-auto'} />
        <small className={'text-muted-foreground text-center block leading-[1.3] mt-2'}>
          Загрузка сообщений 🚀
          <br />
          Спасибо за ожидание 😄
        </small>
      </div>
    );
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className={'space-y-2 border-b p-4'}>
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
                    className={'w-full resize-none'}
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

          <Button type={'submit'} size={'sm'}>
            Send
          </Button>
        </form>
      </Form>

      <section className={'mt-4 p-4 pt-0'}>
        <small className={'mb-2 block'}>
          Your name: <strong className={'font-medium'}>{name} 🪽</strong>
        </small>

        <div className={'space-y-2'}>
          <AnimatePresence>
            {messages.length > 0 ? (
              messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10, scaleY: 0 }}
                  animate={{ opacity: 1, y: 0, scaleY: 1 }}
                  exit={{ opacity: 0, scaleY: 0 }}
                >
                  <Card className={'shadow-none max-w-xl bg-secondary/50'}>
                    <CardContent className={'p-1 flex gap-2 items-center'}>
                      <UserAvatar name={message.name} />
                      <div className={'w-full'}>
                        <p className={'text-sm'}>{message.message}</p>
                        <small className={'block ml-auto text-right pr-1 text-xs text-muted-foreground'}>
                          {format(message.createdAt, 'PPP hh:mm', {
                            locale: ru,
                          })}
                        </small>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            ) : (
              <small className={'text-muted-foreground absolute left-1/2 mt-20 w-60 text-center -translate-x-1/2'}>
                No messages yet. Send a message to start the conversation.
              </small>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  );
};

const UserAvatar: React.FC<{ name: string }> = ({ name }) => {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 3);

  return (
    <Avatar className={'border rounded-sm size-9'}>
      <AvatarFallback className={'rounded-sm bg-gradient-to-r uppercase from-zinc-900 to-zinc-800 text-muted text-sm'}>
        {initials}
      </AvatarFallback>
    </Avatar>
  );
};
