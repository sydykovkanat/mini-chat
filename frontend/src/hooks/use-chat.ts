import { useForm } from 'react-hook-form';
import io from 'socket.io-client';
import { KeyboardEvent, useEffect, useState } from 'react';

const socket = io.connect('http://localhost:3002');

export const useChat = () => {
  const [receiveMessage, setReceiveMessage] = useState('');

  useEffect(() => {
    socket.on('messages', (message: { message: { message: string } }) => {
      console.log(message.message.message);
      setReceiveMessage(message.message.message);
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

  return { form, onSubmit, receiveMessage, handleKeyDown };
};
