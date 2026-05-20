'use client'
import { Input, TextArea, Select, Button, FieldError, Label, TextField, ListBox, } from "@heroui/react";


const AddIdeaPage = () => {

    const onSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget)
        const idea = Object.fromEntries(formData.entries())
        console.log(idea)
    }

    const categories = [
        "Teach",
        "Health",
        "AI",
        "Education",
        "Finance",
        "Business",
        "Environment",
        "Lifestyle",
    ];

    return (
        <div className="min-h-screen flex items-center justify-center py-6 px-3 sm:p-6">
            <div className="w-full max-w-4xl backdrop-blur-xl border border-white/20 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden p-6">
                <div className="p-5 sm:p-7 bg-white/10 rounded-2xl">
                    <h1 className="text-2xl sm:text-4xl font-bold mb-2 leading-tight">
                        Add New Idea
                    </h1>
                    <p className="text-sm sm:text-lg opacity-90">
                        Share your innovative concepts and bring them to life.
                    </p>
                </div>
                <form
                    onSubmit={onSubmit}
                    className="md:p-10 md:space-y-8 md:w-3xl"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                        <div className="md:col-span-2">
                            <TextField name="title" isRequired>
                                <Label>Idea title</Label>
                                <Input
                                    placeholder="Ai study assistant"
                                    className="rounded-2xlrounded-2xl border border-slate-500 bg-white/10 placeholder:text-gray-400" />
                                <FieldError />
                            </TextField>
                        </div>

                        <div>
                            <Select

                                name="category"
                                isRequired
                                className="w-full"
                                placeholder="Select category"
                            >
                                <Label>Category</Label>
                                <Select.Trigger className="rounded-2xl min-h-12 rounded-2xl border border-slate-500 bg-white/10 placeholder:text-gray-400">
                                    <Select.Value />
                                    <Select.Indicator />
                                </Select.Trigger>

                                <Select.Popover>
                                    <ListBox >
                                        {categories.map((cat) => (
                                            <ListBox.Item
                                                key={cat}
                                                textValue={cat}>
                                                {cat}
                                                <ListBox.ItemIndicator />
                                            </ListBox.Item>
                                        ))}
                                    </ListBox>
                                </Select.Popover>
                            </Select>
                        </div>

                        <div>
                            <TextField name="tags" isRequired>
                                <Label>Tags</Label>
                                <Input
                                    placeholder="Ai, Education, etc..."
                                    className="rounded-2xl border border-slate-500 bg-white/10 placeholder:text-gray-400" />
                                <FieldError />
                            </TextField>
                        </div>

                        <div className="md:col-span-2">
                            <TextField name="imgUrl" isRequired>
                                <Label>Img URL</Label>
                                <Input
                                    placeholder="https://example.com/image.jpg"
                                    className="rounded-2xl border border-slate-500 bg-white/10 placeholder:text-gray-400" />
                                <FieldError />
                            </TextField>
                        </div>

                        <div>
                            <TextField name="price" type="number" isRequired>
                                <Label>Sort Description</Label>
                                <TextArea placeholder="Describe the estimated budget for your startup..."
                                    className='rounded-2xl min-h-32 rounded-2xl border border-slate-500 bg-white/10 placeholder:text-gray-400' />
                                <FieldError />
                            </TextField>
                        </div>

                        <div>
                            <TextField name="price" type="number" isRequired>
                                <Label>Description</Label>
                                <TextArea placeholder="Describe your startup idea..."
                                    className='rounded-2xl min-h-32 rounded-2xl border border-slate-500 bg-white/10 placeholder:text-gray-400' />
                                <FieldError />
                            </TextField>
                        </div>
                        <div>
                            <TextField name="title" isRequired>
                                <Label>Estimated Budget</Label>
                                <Input
                                    placeholder="Students, Freelancers, etc..."
                                    className="rounded-2xl border border-slate-500 bg-white/10 placeholder:text-gray-400" />
                                <FieldError />
                            </TextField>
                        </div>
                        <div>
                            <TextField name="title" isRequired>
                                <Label>Target Audience</Label>
                                <Input
                                    placeholder="Students, Freelancers, etc..."
                                    className="rounded-2xl border border-slate-500 bg-white/10 placeholder:text-gray-400" />
                                <FieldError />
                            </TextField>
                        </div>
                        <div className="md:col-span-2">
                            <TextField name="title" isRequired>
                                <Label>Problem Statement</Label>
                                <Input
                                    placeholder="Discibe the problem your startup aims to solve..."
                                    className="rounded-2xl border border-slate-500 bg-white/10 placeholder:text-gray-400" />
                                <FieldError />
                            </TextField>
                        </div>

                        <div className="md:col-span-2">
                            <TextField name="title" isRequired>
                                <Label>Proposed Solution</Label>
                                <Input
                                    placeholder="Explain how your startup solves the problem..."
                                    className="rounded-2xl border border-slate-500 bg-white/10 placeholder:text-gray-400" />
                                <FieldError />
                            </TextField>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="mt-5">
                        <Button
                            type="submit"
                            variant="outline"
                            className=" rounded-none w-full bg-cyan-500 text-white"
                        >Add Destination
                        </Button>
                    </div>
                </form>
            </div >
        </div >
    );
};

export default AddIdeaPage;