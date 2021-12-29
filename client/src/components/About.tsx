import { Anchor, Box, Heading, Paragraph } from 'grommet';
import React from 'react';
const About: React.FC = () => (
  <Box tag="section" align="center" pad={{ horizontal: 'medium' }}>
    <Box>
      <Heading level={2}>Can you surf?</Heading>
      <Paragraph>
        Can i surf is an application designed to answer a simple question many
        desk jockeys ask themselves daily, "Can I surf today?". Another problem
        one runs into these days is being in a new surf rich location but not
        knowing the best spot to go for the conditions. Select where you are and
        your available time window for that day and receive a few best bets.
        Along with those best bets, you will see a more detailed time based
        forecast for thee chosen location. Ideally this takes most of the guess
        work out of deciding when and where to surf for those poor souls who
        only have a few minutes to get in the water. For the best experience
        visit this site on your phone. The forecasting data is from{' '}
        <Anchor
          href="https://magicseaweed.com/docs/developers/59/api/9905/"
          label="Magic Seaweed's public api"
          target="_blank"
          rel="noopener noreferrer"
        />
        .
      </Paragraph>
    </Box>

    <Box>
      <Heading level={2}>About the author</Heading>
      <Paragraph>
        I am an{' '}
        <Anchor
          label="engineering manager"
          href="https://github.com/phantomphildius/manager-readme"
          target="_blank"
          rel="noopener noreferrer"
        />
        at{' '}
        <Anchor
          label="Betterment"
          href="https://betterment.com"
          target="_blank"
          rel="noopener noreferrer"
        />
        . I miss coding daily, writing typescript, and surfing everyday. This
        project is intended to help me scratch at least one of these itches at a
        time.
      </Paragraph>
    </Box>
  </Box>
);

export default About;
