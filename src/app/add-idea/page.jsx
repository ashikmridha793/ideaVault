import { FieldError, Input, Label, TextField } from "@heroui/react";


const AddIdeaPage = () => {
    return (
        <form className="p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="md:col-span-2">
                    <TextField name="IdeaName" isRequired>
                        <Label>Idea Name</Label>
                        <Input placeholder="Enter Your idea" className='rounded-2xl' />
                        <FieldError message="Please enter a valid idea name" />
                    </TextField>
                </div>
            </div>
        </form>
    );
};

export default AddIdeaPage;