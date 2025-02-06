import { useForm } from 'react-hook-form';
import io from 'socket.io-client';
import { KeyboardEvent, useEffect, useState } from 'react';
import { useAuth } from '@/context/auth-context';

const socket = io.connect('http://localhost:8001');

export const useChat = () => {
  const { name } = useAuth();
  const [messages, setMessages] = useState<{ message: string; name: string }[]>([]);

  useEffect(() => {
    socket.on('messages', (message: { message: { message: string; name: string } }) => {
      const newMessage = message.message;
      setMessages((prevMessages) => [...prevMessages, newMessage]); // Append new message
    });

    return () => {
      socket.off('messages');
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
