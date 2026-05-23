"use client";

import {
  Button,
  Input,
  Label,
  Modal,
  TextArea,
  TextField,
  ListBox,
  useOverlayState,
} from "@heroui/react";
import { useEffect, useRef } from "react";

const CATEGORIES = [
  "Tech",
  "Health",
  "AI",
  "Education",
  "Finance",
  "Business",
  "Environment",
  "Lifestyle",
];

export default function EditIdeaModal({ idea, isOpen, onClose, onSave }) {
  const myRef = useRef(null)

  const state = useOverlayState({
    isOpen,
    onOpenChange: (open) => {
      if (!open) onClose();
    },
  });

  useEffect(() => {
    state.setOpen(isOpen);
  }, [isOpen, state]);

  if (!idea) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    onSave(idea._id, data);
  };

  return (
    <Modal state={state}>
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Heading>Update Idea</Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              <form
                id="edit-idea-form"
                onSubmit={handleSubmit}
                className="space-y-4">
                <TextField
                  name="title"
                  defaultValue={idea.title}
                  isRequired>
                  <Label>Title</Label>
                  <Input />
                </TextField>
                <div>
                  <Label
                    className="mb-1 block">
                    Category
                  </Label>
                  <select
                    name="category"
                    defaultValue={idea.category}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 bg-transparent"
                  >
                    {
                      CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))
                    }
                  </select>
                </div>
                <TextField
                  name="sortDescription"
                  defaultValue={idea.sortDescription || ""}>
                  <Label>Short Description</Label>
                  <TextArea rows={2} />
                </TextField>
                <TextField
                  name="targetAudience"
                  defaultValue={idea.targetAudience || ""}>
                  <Label>Target Audience</Label>
                  <Input />
                </TextField>
                <TextField
                  name="estimatedBudget"
                  defaultValue={String(idea.estimatedBudget ?? "")}
                >
                  <Label>Estimated Budget</Label>
                  <Input type="number" />
                </TextField>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="outline"
                onClick={onClose}>
                Cancel
              </Button>
              <Button
                type="submit"
                form="edit-idea-form"
                className="bg-indigo-600 text-white">
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
