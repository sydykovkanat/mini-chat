import { useForm } from 'react-hook-form';
import io from 'socket.io-client';
import { KeyboardEvent, useEffect, useState } from 'react';
import { useAuth } from '@/context/auth-context';
import { toast } from 'sonner';

const socket = io.connect('http://149.102.129.56:8001');

export const useChat = () => {
  const { name } = useAuth();
  const [messages, setMessages] = useState<{ message: string; name: string }[]>([]);

  useEffect(() => {
    socket.on('messages', (message: { message: { message: string; name: string } }) => {
      const newMessage = message.message;
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    socket.on('user-connected', (username: { username: string }) => {
      toast.info(`${username.username} has connected to the chat`, {
        position: 'top-center',
        className: 'border',
      });
    });

    return () => {
      socket.off('messages');
      socket.off('user-connected');
    };
  }, []);

  const form = useForm({
    values: {
      message: '',
    },
    defaultValues: {
      message: '',
    },
  });

  const onSubmit = async (data: { message: string }) => {
    socket.emit('messages', {
      message: data.message,
      name,
    });
    console.log('Message sent:', data.message);
    form.reset();
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      form.handleSubmit(onSubmit)();
    }
  };

  return { form, onSubmit, messages, handleKeyDown };
};
