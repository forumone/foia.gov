import React from 'react';
import Constrain from '../components/wizard_layout_constrain';
import BodyText from '../components/wizard_component_body_text';
import Heading from '../components/wizard_component_heading';
import Page from '../components/wizard_template_page';

export default {
  title: 'Pages/Page',
  component: Page,
};

function Template(args) {
  return <Page {...args} />;
}

const content = (
  <Constrain>
    <Heading weight="normal">Hello,</Heading>
    <BodyText>The government hosts a vast amount of information, with records spread across many different agencies, and even different offices within agencies.</BodyText>
    <BodyText>To help you figure out which federal agency might have the information you seek, we’ve developed this tool. If you are looking for non-federal records, such as records from your local police department, we suggest contacting the appropriate state or local authorities</BodyText>
    <BodyText>We recommend giving yourself at least 5 minutes to explore this tool.</BodyText>
  </Constrain>
);

export const Default = Template.bind({});
Default.args = {
  children: content,
};

export const Purple = Template.bind({});
Purple.args = {
  color: 'purple',
  children: content,
};

export const White = Template.bind({});
White.args = {
  color: 'white',
  children: content,
};

export const Gray = Template.bind({});
Gray.args = {
  color: 'gray',
  children: content,
};