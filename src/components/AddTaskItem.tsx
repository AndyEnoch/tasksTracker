import React, { useState } from "react";
import styled from "styled-components";
import { useTaskContext } from "../context/TasksContext";
import { Task } from "../types";
import { TaskForm } from "./TaskAddForm";

interface ModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  max-width: 100%;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const ModalTitle = styled.h2`
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

const AddTaskItem: React.FC<ModalProps> = ({ title, isOpen, onClose }) => {
  const { editTask } = useTaskContext();
  const [editData, setEditData] = useState({} as Task);

  const handleSave = () => {
    editTask(editData);
  };
  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>
        <TaskForm onClose={onClose} />
      </ModalContent>
    </ModalOverlay>
  );
};

export default AddTaskItem;
