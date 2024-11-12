'use client'
import { useRef, Suspense } from 'react';
import { Container, Text, Title, Group, Divider, Space, Button } from '@mantine/core';
import { useSearchParams } from 'next/navigation';
import exportAsImage from '@/utils/exportAsImage';
import { Footer } from '@/components/Footer/Footer';

const formatDate = (date: any) => {
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
};

function HomePageContent() {
  const printRef = useRef(null);

  const searchParams = useSearchParams();
  const name = searchParams.get('name');
  const domainName = searchParams.get('domainName');
  const email = searchParams.get('email');
  const mobile = searchParams.get('mobile');
  const domain = searchParams.get('domain');

  const handleDownload = async () => {
    if (printRef.current) {
      exportAsImage(printRef.current, "image-test");
    } else {
      console.error("Element to export as image not found");
    }
  };

  return (
    <Container size="sm" py="xl">
      <Group justify="center" mb="md">
        <Button onClick={handleDownload}>Download as JPEG</Button>
      </Group>
      <div ref={printRef}>
        <Group justify="flex-end" mb="md">
          <div>
            <Title order={3}>{name}</Title>
            <Text>Email: {email}</Text>
            <Text>Mobile: {mobile}</Text>
          </div>
        </Group>

        <Text>The HostMaster</Text>
        <Text>NP ccTLD Registration Services</Text>
        <Text>Mercantile Communications Pvt. Ltd.</Text>
        <Text>Email: hostmaster@mercantile.com.np</Text>

        <Space h="md" />
        <Group justify="flex-end">
          <Text>{formatDate(new Date())}</Text>
        </Group>
        <Divider my="xs" />

        <Text fw={700} size="lg">
          Subject: Application for {domainName ? `${domainName}.${domain}` : '-'} domain registration
        </Text>

        <Space h="md" />
        <Text>Dear Sir/Madam,</Text>
        <Space h="sm" />

        <Text>
          I am writing to request the registration of a domain under my name {name} with domain {domainName ? `${domainName}.${domain}` : '-'}.
        </Text>
        <Space h="sm" />

        <Text>
          Applying for registration of the domain {domainName ? `${domainName}.${domain}` : '-'} follows all the terms and conditions of Domain registration residing at{' '}
          <a href="https://register.com.np/terms-and-conditions">
            https://register.com.np/terms-and-conditions
          </a>.
        </Text>
        <Space h="sm" />

        <Text>
          Thank you for “helping the industry and civil society to make them online”.
          Entry area for .com.np is "commercial" and Notes is "open ccTLD, any
          person or entity is permitted to register" as mentioned on{' '}
          <a href="https://register.com.np/np-ccTLDs">
            https://register.com.np/np-ccTLDs
          </a>.
        </Text>
        <Space h="sm" />

        <Text>
          I would be very grateful indeed for your help. Needless to say, I will be
          glad to supply you with any further information you may need. I look forward
          to hearing from you soon.
        </Text>
        <Space h="md" />

        <Text>Yours Sincerely,</Text>
        <Text>{name || "-"}</Text>

        <Space h="lg" />
      </div>
    </Container>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomePageContent />
      <Footer />
    </Suspense>
  );
}
