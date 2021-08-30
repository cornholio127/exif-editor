import React from 'react';
import styled from 'styled-components';
import { groupBy, toPairs } from 'lodash';
import Accordion from './Accordion';
import AccordionItem from './AccordionItem';

export interface MetadataEntry {
  group: string;
  id: number | undefined;
  tag: string;
  value: string;
}

interface Props {
  className?: string;
  properties: MetadataEntry[];
}

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const Hr = styled.hr`
  display: flex;
  flex-shrink: 1;
  flex-grow: 1;
  height: 1px;
  border: 0;
  margin: 8px 0;
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.12) 3%,
    rgba(0, 0, 0, 0.12) 97%,
    rgba(0, 0, 0, 0) 100%
  );
`;

const Label = styled.span`
  font-size: 14px;
  font-weight: 300;
  width: 400px;
`;

const Value = styled.span`
  font-size: 14px;
  font-weight: 400;
`;

const PropertyEditor: React.FC<Props> = ({ className, properties }) => {
  const groups = toPairs(groupBy(properties, p => p.group));
  return (
    <Accordion className={className}>
      {groups.map(([group, items], i) => (
        <AccordionItem key={i} title={group}>
          {items.map((item, j) => (
            <React.Fragment key={j}>
              {j > 0 && <Hr />}
              <Row>
                <Label>{item.tag}</Label>
                <Value>{item.value}</Value>
              </Row>
            </React.Fragment>
          ))}
        </AccordionItem>
      ))}
    </Accordion>
  );
};

PropertyEditor.displayName = 'PropertyEditor';

export default PropertyEditor;
