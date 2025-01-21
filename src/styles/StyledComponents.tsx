import styled from "styled-components";
import { Priority } from "../types";

export const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: #2d3748;
`;

export const Button = styled.button<{
  variant?: "primary" | "secondary" | "danger";
}>`
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  border: none;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  ${(props) => {
    switch (props.variant) {
      case "primary":
        return `
          background-color: #0681e5;
          color: white;
          &:hover { background-color: #3182ce; }
        `;
      case "secondary":
        return `
          background-color: #a0aec0;
          color: white;
          &:hover { background-color: #718096; }
        `;
      case "danger":
        return `
          background-color: #f56565;
          color: white;
          &:hover { background-color: #e53e3e; }
        `;
      default:
        return `
          background-color: #0681e5;
          color: white;
          &:hover { background-color: #3182ce; }
        `;
    }
  }}
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  margin-bottom: 1rem;

  &:focus {
    outline: none;
    border-color: #4299e1;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
  }
`;

export const Select = styled.select`
  padding: 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  background-color: white;

  &:focus {
    outline: none;
    border-color: #4299e1;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
  }
`;

export const TaskCard = styled.div`
  background: white;
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  &:hover {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

export const BoardContainer = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem;
  min-height: 70vh;
`;

export const ColumnContainer = styled.div`
  flex: 1;
  min-width: 300px;
  background: #f7fafc;
  border-radius: 0.375rem;
  padding: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

export const ColumnTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e2e8f0;
`;

export const ColumnContent = styled.div`
  min-height: 100px;
`;

export const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s;
  color: #4299e1;

  &:hover {
    color: #4299e1;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
  }
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
`;

export const TaskDescription = styled.p`
  color: #82868c;
  margin: 0;
  padding: 1rem 0;
`;

export const PriorityBadge = styled.span<{
  priority: Priority;
}>`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
  font-size: 0.775rem;
  font-weight: 300;
  color: white;

  ${(props) => {
    switch (props.priority) {
      case "Low":
        return `
                    background-color: #48bb78;
                `;
      case "Medium":
        return `
                    background-color: #ed8936;
                `;
      case "High":
        return `
                    background-color: #e53e3e;
                `;
      default:
        return `
                    background-color: #a0aec0;
                `;
    }
  }}
`;
