# Server monitor.

This is a simple and effective application designed to monitor server uptime. It leverages webhooks and serverless functions to send real-time notifications to maintainers whenever the server experiences downtime. The application uses Cronitor for monitoring and Twilio for sending notifications. The serverless functions are hosted on Netlify.

## Getting started.

Follow these steps to set up and run the application locally:

**Installation**

1. Clone this repository to your local machine:

   ```bash
   git@github.com:PivotForge/server-monitor.git
   ```

2. Install the necessary dependencies:

   ```bash
   npm install
   ```

   This project uses the following dependencies:

   - `twilio`: For sending SMS notifications.
   - `dotenv`: For managing environment variables.

**Local Development**

1. Start the local development server using the following command:

   ```javascript
   netlify dev
   ```

   This command initializes the server on port `8080`. Once running, navigate to the following endpoint to confirm it's working:

   ```javascript
   http://localhost:8080/.netlify/functions/webhook-handler
   ```

   Yous should be able to see a screen with this message:

   ```javascript
   { "message": "Listening" }
   ```

2. Expose your local server using Ngrok:

    ```javascript
    ngrok http http://localhost:8080
    ```

    Ngrok will generate a temporary public URL `(e.g., https://example.ngrok.io)`. Copy this URL for use in the next steps.


__Configuring Cronitor__

1. Log in to [Cronitor](https://cronitor.io/app/) and configure a monitoring job.
2. Set the webhook URL for alerts to your Ngrok public URL `(e.g., https://example.ngrok.io/.netlify/functions/webhook-handler)`.
3. Save the configuration. Cronitor will now send server downtime alerts to your webhook.

__Testing the Webhooks__

1. Use Cronitor to trigger a test alert.
2. Monitor the logs from `netlify dev` to confirm the webhook was received.
3. Verify that notification was sent successfully.

__Deployment__

To deploy the serverless function to Netlify:

1. Commit your changes and push to the repository linked to your Netlify project.
2. Deploy the updated project via the Netlify dashboard or CLI:
    ``` javascript
    netlify deploy
    ```
Netlify will assign a unique URL to your deployed function. Update your Cronitor webhook URL to point to the deployed endpoint.

__Resources__

- [Netlify Functions Documentation](https://www.netlify.com/platform/core/functions/)
- [Ngrok](https://ngrok.com/)
- [Twilio API Documentation](https://console.twilio.com/)