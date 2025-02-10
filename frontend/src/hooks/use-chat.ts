import { useForm } from 'react-hook-form';
import io from 'socket.io-client';
import { KeyboardEvent, useEffect, useState } from 'react';
import { useAuth } from '@/context/auth-context';
import { toast } from 'sonner';
import axios from 'axios';

interface Message {
  id: string;
  createdAt: string;
  message: string;
  name: string;
}

const socket = io.connect('http://149.102.129.56:8001');

export const useChat = () => {
  const { name } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const getInitialMessages = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get<Message[]>('http://149.102.129.56:8000/chat/messages');

        setMessages(data.reverse());
      } catch (err) {
        console.error(err);
        toast?.error('Произошла ошибка при загрузке сообщений', {
          description: 'Страница будет перезагружена через 5 секунд',
        });
        setTimeout(() => {
          window.location.reload();
        }, 5000);
      } finally {
        setIsLoading(false);
      }
    };

    void getInitialMessages();
  }, []);

  useEffect(() => {
    socket.on('messages', (message: { message: Message }) => {
      const newMessage = message.message;
      setMessages((prevMessages) => [newMessage, ...prevMessages]);
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
      createdAt: new Date().toISOString(),
    });
    form.reset();
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      form.handleSubmit(onSubmit)();
    }
  };

  return { form, onSubmit, messages, handleKeyDown, isLoading };
};
