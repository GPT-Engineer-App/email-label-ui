import React, { useState } from "react";
import { Box, VStack, Heading, Text, Button, IconButton, Tag, Stack, Input, InputGroup, InputRightElement, useToast } from "@chakra-ui/react";
import { FaEnvelope, FaExclamationCircle, FaInbox, FaSearch, FaSpinner, FaTag, FaTrash } from "react-icons/fa";

const Index = () => {
  const [emails, setEmails] = useState([
    // Example emails; replace with API call to fetch emails
    { id: 1, subject: "Welcome to our platform!", sender: "noreply@platform.com", label: null },
    { id: 2, subject: "Your subscription has been updated", sender: "updates@newsletter.com", label: null },
    { id: 3, subject: "Unbelievable deals just for you", sender: "deals@store.com", label: "Spam" },
    // ... more emails
  ]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const classifyEmail = (id, label) => {
    setEmails(emails.map((email) => (email.id === id ? { ...email, label } : email)));
    // Replace with API call to classify the email
    toast({
      title: `Email labeled as ${label}`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <VStack spacing={4} align="stretch">
      <Box p={5} shadow="md">
        <Heading fontSize="xl">My Gmail</Heading>
      </Box>
      <InputGroup>
        <Input placeholder="Search emails" />
        <InputRightElement children={<IconButton aria-label="Search emails" icon={<FaSearch />} />} />
      </InputGroup>
      <Box p={5}>
        {loading ? (
          <Button isLoading loadingText="Fetching Emails" variant="outline" leftIcon={<FaSpinner />} />
        ) : (
          <Stack spacing={3}>
            {emails.map((email) => (
              <Box p={5} shadow="md" borderWidth="1px" key={email.id} borderRadius="md">
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Box>
                    <Text fontWeight="bold">{email.subject}</Text>
                    <Text fontSize="sm">{email.sender}</Text>
                  </Box>
                  <Stack direction="row">
                    <Tag colorScheme={email.label === "Spam" ? "red" : "gray"}>{email.label || "No Label"}</Tag>
                    <IconButton aria-label="Mark as spam" icon={<FaExclamationCircle />} onClick={() => classifyEmail(email.id, "Spam")} />
                    <IconButton aria-label="Delete email" icon={<FaTrash />} />
                  </Stack>
                </Stack>
              </Box>
            ))}
          </Stack>
        )}
      </Box>
    </VStack>
  );
};

export default Index;
