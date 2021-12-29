import { Anchor, Box, Heading, List, Paragraph } from 'grommet';
import React from 'react';

import Header from './Header';

const About: React.FC = () => (
  <>
    <Header />
    <Box tag="section" align="center" pad={{ horizontal: 'medium' }}>
      <Box>
        <Heading level={2} color="aqua">
          Can you surf?
        </Heading>
        <Paragraph>
          Can i surf is a free application designed to answer two simple
          questions asked daily by coastal desk jockeys. We aim to keep things
          simple for you to answer two of life's most important questions.
        </Paragraph>
        <List
          data={[
            'When can I go surfing today?',
            'Where should I go surfing today?',
          ]}
        />
        <Paragraph>
          Select where you are and your available time window for that day and
          receive a few best bets. Along with those best bets, you will see a
          more detailed time window list for the chosen location. This takes
          most of the guess work out of deciding when and where to surf for
          those poor souls who only have a few minutes to get in the water.
        </Paragraph>
        <Paragraph>
          For the best experience visit this site on your phone. The forecasting
          data is from{' '}
          <Anchor
            href="https://magicseaweed.com/docs/developers/59/api/9905/"
            label="Magic Seaweed's public api"
            target="_blank"
            rel="noopener noreferrer"
            color="salmon"
          />
          .
        </Paragraph>
      </Box>

      <Box>
        <Heading level={2} color="aqua">
          About the author
        </Heading>
        <Paragraph>
          I am an{' '}
          <Anchor
            label="engineering manager"
            href="https://github.com/phantomphildius/manager-readme"
            target="_blank"
            rel="noopener noreferrer"
            color="salmon"
          />{' '}
          at{' '}
          <Anchor
            label="Betterment"
            href="https://betterment.com"
            target="_blank"
            rel="noopener noreferrer"
            color="salmon"
          />
          . I miss coding daily, writing typescript, and surfing everyday. This
          project is intended to help me scratch at least one of these itches at
          a time.
        </Paragraph>
      </Box>
    </Box>
  </>
);

export default About;
