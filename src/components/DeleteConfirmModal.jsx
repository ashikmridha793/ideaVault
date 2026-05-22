"use client";

import { Button, Modal, useOverlayState } from "@heroui/react";
import { useEffect } from "react";

export default function DeleteConfirmModal({ isOpen, title, onClose, onConfirm }) {
  const state = useOverlayState({
    isOpen,
    onOpenChange: (open) => {
      if (!open) onClose();
    },
  });

  useEffect(() => {
    state.setOpen(isOpen);
  }, [isOpen, state]);

  return (
    <Modal state={state}>
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Heading>Delete Idea</Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              <p className="text-gray-600">
                Are you sure you want to delete <strong>{title}</strong>? This cannot be undone.
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="outline" onPress={onClose}>
                Cancel
              </Button>
              <Button variant="danger" onPress={onConfirm}>
                Delete
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
