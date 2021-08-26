import React from 'react';
import styled from 'styled-components';

export interface Property {
  id: string;
  label: string;
  value: string;
}

interface Props {
  className?: string;
  properties: Property[];
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1000px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const Hr = styled.hr`
  display: flex;
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
  width: 400px;
`;

const Value = styled.span`
  font-size: 18px;
  font-weight: 500;
`;

const PropertyEditor: React.FC<Props> = ({ className, properties }) => {
  return (
    <Container className={className}>
      {properties.map((p, i) => (
        <React.Fragment key={p.id}>
          {i > 0 && <Hr />}
          <Row>
            <Label>{p.label}</Label>
            <Value>{p.value}</Value>
          </Row>
        </React.Fragment>
      ))}
    </Container>
  );
};

PropertyEditor.displayName = 'PropertyEditor';

export default PropertyEditor;
