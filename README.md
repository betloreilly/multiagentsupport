# Vendra Agent - Multi-Agent Support Interface

This project provides a simple, modern user interface for Langflow's multi-agent support solution, offering a seamless way for users to interact with Vendra's intelligent support system.

## About Vendra Agent

Vendra Agent is an intelligent support assistant that autonomously selects the most appropriate action based on user inquiries. The agent has access to three specialized tools and makes independent decisions on when and how to use them.

### Agent Capabilities

The agent is designed to solve user issues efficiently without requiring the user to specify which method to use. Instead, it reasons through the problem and selects the most appropriate tool.

### Available Tools

1. **FAQ_Answer_Tool**
   - Searches Vendra's official FAQ and help documentation
   - Used first for common questions, troubleshooting, or product usage information

2. **Email_Support_Tool**
   - Sends an email to support@vendra.com
   - Used when issues aren't found in the FAQ, require account-specific help, or need human assistance
   - The agent doesn't write the email itself but forwards relevant user input directly to support

3. **Voice_AI_Tool**
   - Initiates a voice call to Vendra's AI support line
   - Used when users request to talk, need urgent or interactive help, or when FAQs and email are insufficient
   - Contact details and context are pre-defined in the voice_outreach_agent

### Agent Behavior

- Reasons step-by-step to determine the best tool for each situation
- Uses only one tool per query, unless escalation is clearly required
- Makes autonomous decisions without asking users how they want to be helped
- Shares tool responses directly with users
- Escalates gracefully when no helpful information is found

## Technical Implementation

This project consists of:

- A Node.js backend (Express.js) that communicates with the Langflow API
- A simple, modern frontend interface for user interaction
- Streaming support capability (depending on Langflow configuration)

## Setup and Usage

1. Install dependencies: `npm install`
2. Start the server: `npm start`
3. Access the interface at: `http://localhost:3001`

The application will connect to the configured Langflow API endpoint to process user queries and display responses from the multi-agent system. 