import React from 'react';
import { Container, Typography, Box, Paper, Link } from '@mui/material';

function PrivacyPolicy() {
  return (
    <Container maxWidth="md" sx={{ marginTop: '2rem', marginBottom: '2rem' }}>
      <Paper elevation={3} sx={{ padding: '2rem' }}>
        <Typography variant="h4" gutterBottom align="center">Privacy Policy</Typography>

        <Typography variant="h6" gutterBottom>Introduction</Typography>
        <Typography paragraph>
          Welcome to Fresh Market Hub. We value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, use our services, or interact with us in any other way.
        </Typography>

        <Typography variant="h6" gutterBottom>Information We Collect</Typography>
        <Typography paragraph>
          We may collect the following types of information:
        </Typography>
        <ul>
          <li>
            <Typography paragraph>
              <strong>Personal Identification Information</strong>: Name, email address, phone number, address, etc.
            </Typography>
          </li>
          <li>
            <Typography paragraph>
              <strong>Payment Information</strong>: Credit card details, billing address, etc.
            </Typography>
          </li>
          <li>
            <Typography paragraph>
              <strong>Technical Data</strong>: IP address, browser type, operating system, referring website, pages visited, and other similar information.
            </Typography>
          </li>
          <li>
            <Typography paragraph>
              <strong>Usage Data</strong>: Information about how you use our website and services.
            </Typography>
          </li>
        </ul>

        <Typography variant="h6" gutterBottom>How We Use Your Information</Typography>
        <Typography paragraph>
          We use the collected information for various purposes, including but not limited to:
        </Typography>
        <ul>
          <li>
            <Typography paragraph>
              <strong>Providing and Improving Our Services</strong>: To deliver the products and services you request and enhance your experience.
            </Typography>
          </li>
          <li>
            <Typography paragraph>
              <strong>Communication</strong>: To send you updates, marketing communications, and other information that may be of interest to you.
            </Typography>
          </li>
          <li>
            <Typography paragraph>
              <strong>Transaction Processing</strong>: To process payments and manage transactions.
            </Typography>
          </li>
          <li>
            <Typography paragraph>
              <strong>Security</strong>: To detect and prevent fraudulent activities and ensure the security of our website and services.
            </Typography>
          </li>
          <li>
            <Typography paragraph>
              <strong>Compliance</strong>: To comply with legal obligations.
            </Typography>
          </li>
        </ul>

        <Typography variant="h6" gutterBottom>Sharing Your Information</Typography>
        <Typography paragraph>
          We may share your information with third parties under the following circumstances:
        </Typography>
        <ul>
          <li>
            <Typography paragraph>
              <strong>Service Providers</strong>: We may share your information with third-party service providers who perform services on our behalf.
            </Typography>
          </li>
          <li>
            <Typography paragraph>
              <strong>Business Transfers</strong>: In connection with a merger, acquisition, or sale of all or a portion of our assets.
            </Typography>
          </li>
          <li>
            <Typography paragraph>
              <strong>Legal Requirements</strong>: If required to do so by law or in response to valid requests by public authorities.
            </Typography>
          </li>
          <li>
            <Typography paragraph>
              <strong>Protection of Our Rights</strong>: To protect and defend our rights and property.
            </Typography>
          </li>
        </ul>

        <Typography variant="h6" gutterBottom>Security of Your Information</Typography>
        <Typography paragraph>
          We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable.
        </Typography>

        <Typography variant="h6" gutterBottom>Retention of Your Information</Typography>
        <Typography paragraph>
          We will retain your personal information only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your information to the extent necessary to comply with our legal obligations, resolve disputes, and enforce our policies.
        </Typography>

        <Typography variant="h6" gutterBottom>Your Data Protection Rights</Typography>
        <Typography paragraph>
          Depending on your location, you may have the following rights regarding your personal data:
        </Typography>
        <ul>
          <li>
            <Typography paragraph>
              <strong>The right to access</strong> – You have the right to request copies of your personal data.
            </Typography>
          </li>
          <li>
            <Typography paragraph>
              <strong>The right to rectification</strong> – You have the right to request that we correct any information you believe is inaccurate or complete information you believe is incomplete.
            </Typography>
          </li>
          <li>
            <Typography paragraph>
              <strong>The right to erasure</strong> – You have the right to request that we erase your personal data, under certain conditions.
            </Typography>
          </li>
          <li>
            <Typography paragraph>
              <strong>The right to restrict processing</strong> – You have the right to request that we restrict the processing of your personal data, under certain conditions.
            </Typography>
          </li>
          <li>
            <Typography paragraph>
              <strong>The right to object to processing</strong> – You have the right to object to our processing of your personal data, under certain conditions.
            </Typography>
          </li>
          <li>
            <Typography paragraph>
              <strong>The right to data portability</strong> – You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.
            </Typography>
          </li>
        </ul>

        <Typography variant="h6" gutterBottom>Changes to This Privacy Policy</Typography>
        <Typography paragraph>
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
        </Typography>

        <Typography variant="h6" gutterBottom>Contact Us</Typography>
        <Typography paragraph>
          If you have any questions about this Privacy Policy, please contact us:
        </Typography>
        <ul>
          <li>
            <Typography paragraph>
              By email: support@freshmarkethub.com
            </Typography>
          </li>
          <li>
            <Typography paragraph>
              By visiting this page on our website: <Link href="https://www.freshmarkethub.com/contact">www.freshmarkethub.com/contact</Link>
            </Typography>
          </li>
          <li>
            <Typography paragraph>
              By phone number: (123) 456-7890
            </Typography>
          </li>
          <li>
            <Typography paragraph>
              By mail: 123 Market St, Chicago, IL 60601
            </Typography>
          </li>
        </ul>
      </Paper>
    </Container>
  );
}

export default PrivacyPolicy;
