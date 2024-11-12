'use client';
import { useForm } from '@mantine/form';
import { TextInput, Select, Button, Container, Group, Text, Title, Stack } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { Footer } from '@/components/Footer/Footer';

export default function HomePage() {
  const router = useRouter();
  // Initialize the form using Mantine's useForm hook
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      name: '',
      email: '',
      mobile: '',
      domainName: '',
      domain: '',
    },

    // Validation schema (optional but recommended for validation)
    validate: {
      name: (value) => (value ? null : 'Name is required'),
      domainName: (value) => (value ? null : 'Domain Name is required'),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      mobile: (value) => (/^\d{10}$/.test(value) ? null : 'Invalid mobile number'),
      domain: (value) => (value ? null : 'Domain is required'),
    },
  });

  // Handle form submission
  const handleSubmit = (values: typeof form.values) => {
    const query = new URLSearchParams(values).toString();
    router.push(`/cover-letter?${query}`);
  };

  return (
    <>
      <Container size="xs" py={30}>
        <Stack mb='md'>
          <Title size='lg' fw={'800'}>Efficient .np Domain Registration Cover Letter Generator</Title>
          <Text size='md'>
            Create a professional and tailored cover letter for your Nepal (.np) domain registration with ease. This tool guides you step by step, ensuring accuracy and the right tone for a smooth, error-free application.        </Text>
        </Stack>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label="Name"
            placeholder="Enter your name"
            required
            {...form.getInputProps('name')}
            mt='md'
          />
          <TextInput
            label="Email"
            placeholder="Enter your email"
            required
            type="email"
            {...form.getInputProps('email')}
            mt='md'
          />
          <TextInput
            label="Mobile Number"
            placeholder="Enter your mobile number"
            required
            type="tel"
            {...form.getInputProps('mobile')}
            mt='md'
          />
          <TextInput
            label="Domain Name"
            placeholder="Enter your domain name"
            required
            type="tel"
            {...form.getInputProps('domainName')}
            mt='md'
          />
          <Select
            label="Domain Name Extension"
            placeholder="Select your domain name extension"
            required
            data={[
              { value: 'com.np', label: 'com.np' },
              { value: 'name.np', label: 'name.np' },
              { value: 'info.np', label: 'info.np' },
              { value: 'biz.np', label: 'biz.np' },
              { value: 'pro.np', label: 'pro.np' },
            ]}
            {...form.getInputProps('domain')}
            mt='md'
          />
          <Group variant="center" mt="md">
            <Button type="submit">Submit</Button>
          </Group>
        </form>
      </Container>
      <Footer />
    </>
  );
}
